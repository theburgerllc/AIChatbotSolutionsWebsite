"use client";
import { useEffect, useRef } from 'react';

export default function TavusModal({ open, onClose, conversationUrl }: { open: boolean; onClose: () => void; conversationUrl?: string }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      window.addEventListener('keydown', onKey);
      setTimeout(() => closeRef.current?.focus(), 0);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Close demo" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-[92vw] max-w-3xl h-[70vh] bg-black/70 border border-white/10 rounded-[var(--radius)] overflow-hidden backdrop-blur">
        <div className="absolute top-2 right-2 z-10">
          <button ref={closeRef} className="btn-secondary" onClick={onClose} aria-label="Close demo">Close</button>
        </div>
        {conversationUrl ? (
          <iframe src={conversationUrl} title="AI Conversation" className="w-full h-full" allow="microphone; camera" />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/80">Starting demo…</div>
        )}
      </div>
    </div>
  );
}

