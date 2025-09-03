import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const token = process.env.CALENDLY_WEBHOOK_TOKEN;
  if (!token) return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });

  const auth = req.headers.get('authorization') || '';
  const presented = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (presented !== token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await req.json().catch(() => ({}));

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM = process.env.SENDGRID_FROM_EMAIL;
  const TO = process.env.LEADS_NOTIFICATION_EMAIL || FROM;

  if (SENDGRID_API_KEY && FROM && TO) {
    try {
      sgMail.setApiKey(SENDGRID_API_KEY);
      await sgMail.send({
        to: TO,
        from: FROM,
        subject: 'Calendly webhook event',
        text: JSON.stringify({ event: payload?.event, payload }, null, 2),
      });
    } catch { /* noop */ }
  }

  return NextResponse.json({ ok: true });
}

