interface TavusResponse {
  conversation_url?: string;
  error?: string;
  status?: string;
}

interface TavusConfig {
  retryAttempts?: number;
  retryDelay?: number;
  timeout?: number;
}

export class TavusError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'TavusError';
  }
}

export async function startConversation(config: TavusConfig = {}): Promise<string> {
  const { retryAttempts = 3, retryDelay = 1000, timeout = 30000 } = config;
  
  for (let attempt = 1; attempt <= retryAttempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const res = await fetch('/api/tavus/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        
        if (res.status === 500 && attempt < retryAttempts) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          continue;
        }
        
        throw new TavusError(
          errorData.error || `Failed to start conversation (${res.status})`,
          res.status.toString()
        );
      }

      const data: TavusResponse = await res.json();
      
      if (!data.conversation_url) {
        throw new TavusError('No conversation URL received');
      }
      
      // Track successful start
      if (typeof window !== 'undefined') {
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        gtag?.('event', 'tavus_conversation_started', {
          event_category: 'engagement',
          event_label: 'demo',
        } as unknown as Record<string, unknown>);
      }
      
      return data.conversation_url;
    } catch (error: unknown) {
      if ((error as { name?: string })?.name === 'AbortError') {
        throw new TavusError('Request timeout - please try again', 'TIMEOUT');
      }
      
      if (attempt === retryAttempts) {
        if (error instanceof TavusError) {
          throw error;
        }
        throw new TavusError(
          'Failed to connect to Tavus service. Please try again later.',
          'CONNECTION_ERROR'
        );
      }
      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
    }
  }
  
  throw new TavusError('Max retry attempts reached');
}

export async function openTavus(): Promise<string> {
  const url = await startConversation();
  const ev = new CustomEvent('tavus:open', { detail: { url } });
  window.dispatchEvent(ev);
  return url;
}

export function isTavusConfigured(): boolean {
  // This will be checked server-side, but we can provide a client hint
  return true;
}

export async function checkTavusStatus(): Promise<boolean> {
  try {
    const res = await fetch('/api/tavus/status');
    return res.ok;
  } catch {
    return false;
  }
}
