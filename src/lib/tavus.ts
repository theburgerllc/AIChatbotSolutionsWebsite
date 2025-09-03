export async function startConversation(): Promise<string> {
  const res = await fetch('/api/tavus/start', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to start');
  const data = await res.json().catch(() => ({}));
  const url: string | undefined = data?.conversation_url;
  if (!url) throw new Error('No conversation URL');
  return url;
}

export async function openTavus() {
  const url = await startConversation();
  const ev = new CustomEvent('tavus:open', { detail: { url } });
  window.dispatchEvent(ev);
  return url;
}

