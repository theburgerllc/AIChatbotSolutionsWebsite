"use client";
import { useLayoutEffect } from 'react';

export default function BookPage() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL;

  useLayoutEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const last: Record<string, string> = {};
      params.forEach((v, k) => {
        if (k.startsWith('utm_') || k === 'gclid' || k === 'fbclid') last[k] = v;
      });
      if (Object.keys(last).length) localStorage.setItem('last_utm', JSON.stringify(last));
    } catch { /* noop */ }
  }, []);

  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold">Book a Strategy Call</h1>
      {!url ? (
        <p className="mt-4 text-white/70">Set NEXT_PUBLIC_CALENDLY_URL to render the scheduler embed.</p>
      ) : (
        <div className="mt-6 aspect-video w-full overflow-hidden rounded-[var(--radius)] border border-white/10">
          <iframe src={url} className="w-full h-full" loading="lazy" title="Calendly Scheduler" />
        </div>
      )}
    </main>
  );
}

