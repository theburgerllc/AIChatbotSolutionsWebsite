import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import sgMail from '@sendgrid/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM = process.env.SENDGRID_FROM_EMAIL;
  const TO = process.env.LEADS_NOTIFICATION_EMAIL || FROM;
  if (!SENDGRID_API_KEY || !FROM || !TO) {
    return NextResponse.json({ error: 'Email not configured' }, { status: 500 });
  }

  let body: unknown = {};
  try { body = await req.json(); } catch { /* noop */ }
  const { name = '', email = '', message = '', utm = {} as Record<string, unknown> } = (body as Record<string, unknown>) || {};

  let cookieUtm: Record<string, unknown> = {};
  const cookieStore = await cookies();
  const c = cookieStore.get('utm_params')?.value;
  if (c) {
    try { cookieUtm = JSON.parse(Buffer.from(c, 'base64').toString('utf8')); } catch { /* noop */ }
  }
  const mergedUtm = { ...(cookieUtm || {}), ...(utm || {}) };

  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    await sgMail.send({
      to: TO,
      from: FROM,
      subject: 'New Lead — AI Chatbot Solutions',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nUTM: ${JSON.stringify(mergedUtm)}`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}

