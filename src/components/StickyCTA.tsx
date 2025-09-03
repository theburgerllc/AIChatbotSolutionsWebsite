"use client";
import { useEffect, useState } from 'react';

export default function StickyCTA({ onDemo, onBook }: { onDemo: () => void; onBook: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onShow() { setVisible(true); }
    function onShowEvent(_e: Event) { onShow(); }
    window.addEventListener('sticky-cta:show', onShowEvent);
    return () => window.removeEventListener('sticky-cta:show', onShowEvent);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-3xl px-4">
      <div className="card flex items-center justify-between gap-3">
        <div className="text-sm text-white/80">Ready to see it live?</div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={onBook}>Book a call</button>
          <button className="btn-primary" onClick={onDemo}>Watch the AI talk</button>
        </div>
      </div>
    </div>
  );
}

