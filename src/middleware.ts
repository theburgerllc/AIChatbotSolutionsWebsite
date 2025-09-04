import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = {
  // Exclude static assets, webhooks, health check, and SEO files from middleware
  matcher: [
    '/((?!_next/|favicon.ico|robots.txt|sitemap.xml|api/health|api/stripe/webhook|api/tavus/webhook|assets/).*)',
  ],
};

function base64Encode(json: string): string {
  try {
    // @ts-ignore - btoa available in Edge runtime
    if (typeof btoa !== 'undefined') return btoa(unescape(encodeURIComponent(json)));
  } catch { /* noop */ }
  try {
    // Fallback if Node Buffer is available (local dev)
    // @ts-ignore
    if (typeof Buffer !== 'undefined') return Buffer.from(json).toString('base64');
  } catch { /* noop */ }
  return json;
}

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const res = NextResponse.next();

  // Persist UTM parameters
  const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'] as const;
  const utm: Record<string, string> = {};
  for (const k of utmKeys) {
    const v = url.searchParams.get(k);
    if (v) utm[k] = v;
  }
  if (Object.keys(utm).length > 0) {
    const payload = base64Encode(JSON.stringify(utm));
    res.cookies.set('utm_params', payload, { path: '/', maxAge: 60 * 60 * 24 * 90 });
  }

  // Seed hero experiment cookie if absent
  const hasExp = req.cookies.get('exp_hero')?.value;
  if (!hasExp) {
    let variant = 'A';
    try {
      const v = await get<string>('exp_hero');
      if (v === 'A' || v === 'B') variant = v;
    } catch { /* noop */ }
    res.cookies.set('exp_hero', variant, { path: '/', maxAge: 60 * 60 * 24 * 30 });
  }

  return res;
}

