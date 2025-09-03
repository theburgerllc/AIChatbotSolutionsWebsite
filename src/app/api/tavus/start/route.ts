import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(_req: NextRequest) {
  const { TAVUS_API_KEY, TAVUS_PERSONA_ID, TAVUS_REPLICA_ID } = process.env;
  if (!TAVUS_API_KEY || !TAVUS_PERSONA_ID || !TAVUS_REPLICA_ID) {
    return NextResponse.json({ error: 'Tavus not configured' }, { status: 500 });
  }
  try {
    const resp = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify({
        persona_id: TAVUS_PERSONA_ID,
        replica_id: TAVUS_REPLICA_ID,
      }),
      cache: 'no-store',
    });
    if (!resp.ok) {
      return NextResponse.json({ error: 'Unable to start conversation' }, { status: resp.status });
    }
    const data = await resp.json();
    const conversation_url: string | undefined = data?.conversation_url || data?.url;
    return NextResponse.json({ conversation_url: conversation_url ?? null });
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

