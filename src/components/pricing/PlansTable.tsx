"use client";
import { useState } from 'react';

async function checkout(plan: 'starter' | 'growth', setLoading: (b: boolean) => void, setErr: (s: string) => void) {
  setErr('');
  setLoading(true);
  try {
    const discount_code = typeof window !== 'undefined' ? localStorage.getItem('discount_code') ?? undefined : undefined;
    const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ plan, discount_code }) });
    const data = await res.json();
    if (!res.ok || !data?.url) throw new Error('Failed');
    window.location.href = data.url as string;
  } catch {
    setErr('Unable to start checkout. Please try again later.');
  } finally {
    setLoading(false);
  }
}

export default function PlansTable() {
  const [loading, setLoading] = useState<'starter' | 'growth' | ''>('');
  const [err, setErr] = useState('');
  return (
    <div className="mt-8 grid md:grid-cols-3 gap-6">
      <div className="card">
        <h2 className="text-2xl font-bold">Starter</h2>
        <p className="text-white/70">Best for early validation</p>
        <div className="mt-4 text-4xl font-extrabold">$199<span className="text-base font-normal text-white/60">/mo</span></div>
        <ul className="mt-4 list-disc pl-5 text-white/80">
          <li>1 persona</li>
          <li>2,000 monthly visitors</li>
          <li>Email support</li>
        </ul>
        <button className="btn-primary mt-6" disabled={loading==='starter'} onClick={() => checkout('starter', (b)=>setLoading(b? 'starter':''), setErr)}>{loading==='starter' ? 'Processing…' : 'Buy Starter'}</button>
      </div>

      <div className="card border-[var(--color-primary)] border-2">
        <h2 className="text-2xl font-bold">Growth</h2>
        <p className="text-white/70">Scale your conversions</p>
        <div className="mt-4 text-4xl font-extrabold">$699<span className="text-base font-normal text-white/60">/mo</span></div>
        <ul className="mt-4 list-disc pl-5 text-white/80">
          <li>3 personas</li>
          <li>50,000 monthly visitors</li>
          <li>Priority support</li>
        </ul>
        <button className="btn-primary mt-6" disabled={loading==='growth'} onClick={() => checkout('growth', (b)=>setLoading(b? 'growth':''), setErr)}>{loading==='growth' ? 'Processing…' : 'Buy Growth'}</button>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold">Enterprise</h2>
        <p className="text-white/70">Custom deployment & security</p>
        <div className="mt-4 text-4xl font-extrabold">Talk to Sales</div>
        <ul className="mt-4 list-disc pl-5 text-white/80">
          <li>SSO, SAML</li>
          <li>DPA, SOC2</li>
          <li>Dedicated CSM</li>
        </ul>
        <a className="btn-secondary mt-6 inline-flex" href="/book">Book a call</a>
      </div>

      {err && <div className="md:col-span-3 text-red-400 text-sm">{err}</div>}
    </div>
  );
}

