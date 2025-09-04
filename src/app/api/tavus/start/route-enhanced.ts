import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface TavusStartRequest {
  timestamp?: number;
  userAgent?: string;
  referrer?: string;
}

interface TavusAPIResponse {
  conversation_url?: string;
  url?: string;
  conversation_id?: string;
  status?: string;
  error?: string;
}

export async function POST(req: NextRequest) {
  // Validate environment variables
  const { TAVUS_API_KEY, TAVUS_PERSONA_ID, TAVUS_REPLICA_ID } = process.env;
  
  if (!TAVUS_API_KEY || !TAVUS_PERSONA_ID || !TAVUS_REPLICA_ID) {
    console.error('Tavus configuration missing:', {
      hasApiKey: !!TAVUS_API_KEY,
      hasPersonaId: !!TAVUS_PERSONA_ID,
      hasReplicaId: !!TAVUS_REPLICA_ID
    });
    return NextResponse.json(
      { error: 'Tavus service not configured. Please contact support.' },
      { status: 503 }
    );
  }
  
  try {
    // Parse request body
    const body: TavusStartRequest = await req.json().catch(() => ({}));
    
    // Log request for debugging (without sensitive data)
    console.log('Starting Tavus conversation:', {
      timestamp: body.timestamp,
      hasUserAgent: !!body.userAgent,
      hasReferrer: !!body.referrer
    });
    
    // Call Tavus API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
    
    const resp = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify({
        persona_id: TAVUS_PERSONA_ID,
        replica_id: TAVUS_REPLICA_ID,
        // Optional metadata
        metadata: {
          source: 'website',
          timestamp: body.timestamp || Date.now(),
          referrer: body.referrer || 'direct',
        }
      }),
      signal: controller.signal,
      cache: 'no-store',
    });
    
    clearTimeout(timeoutId);
    
    // Handle non-OK responses
    if (!resp.ok) {
      const errorData = await resp.text().catch(() => 'Unknown error');
      console.error('Tavus API error:', resp.status, errorData);
      
      // Provide user-friendly error messages
      const errorMessage = resp.status === 429 
        ? 'Service is busy, please try again in a moment'
        : resp.status === 401
        ? 'Authentication failed - please contact support'
        : resp.status >= 500
        ? 'Tavus service temporarily unavailable'
        : 'Unable to start conversation';
      
      return NextResponse.json(
        { error: errorMessage },
        { status: resp.status }
      );
    }
    
    // Parse successful response
    const data: TavusAPIResponse = await resp.json();
    const conversation_url = data?.conversation_url || data?.url;
    
    if (!conversation_url) {
      console.error('No conversation URL in response:', data);
      return NextResponse.json(
        { error: 'Invalid response from Tavus service' },
        { status: 502 }
      );
    }
    
    // Success - return the conversation URL
    console.log('Tavus conversation started successfully');
    return NextResponse.json({
      conversation_url,
      conversation_id: data.conversation_id,
    });
    
  } catch (error: unknown) {
    console.error('Tavus start error:', error);
    
    // Handle specific error types
    if ((error as { name?: string })?.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - Tavus service is not responding' },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  const isConfigured = !!process.env.TAVUS_API_KEY &&
    !!process.env.TAVUS_PERSONA_ID &&
    !!process.env.TAVUS_REPLICA_ID;
  
  return NextResponse.json({
    status: isConfigured ? 'configured' : 'not_configured',
    timestamp: Date.now(),
  });
}
