"use client";
import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';
import { ANALYTICS_LABELS } from '@/lib/constants';

export default function ScheduleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      try { track(ANALYTICS_LABELS.scheduler_open); } catch { /* noop */ }
      window.addEventListener('keydown', onKey);
      setTimeout(() => closeRef.current?.focus(), 0);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Close scheduler" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-[92vw] max-w-3xl h-[70vh] bg-black/70 border border-white/10 rounded-[var(--radius)] overflow-hidden backdrop-blur">
        <div className="absolute top-2 right-2 z-10">
          <button ref={closeRef} className="btn-secondary" onClick={onClose} aria-label="Close scheduler">Close</button>
        </div>
        {url ? (
          <iframe src={url} title="Schedule with Calendly" className="w-full h-full" />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/80 p-6">Set NEXT_PUBLIC_CALENDLY_URL to render the scheduler.</div>
        )}
      </div>
    </div>
  );
}

