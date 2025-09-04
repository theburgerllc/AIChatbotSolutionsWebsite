"use client";
import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';
import { ANALYTICS_LABELS } from '@/lib/constants';

export default function StickyCTA({ onDemo, onBook }: { onDemo: () => void; onBook: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onShow() {
      setVisible(true);
      try { track(ANALYTICS_LABELS.sticky_cta_show); } catch { /* noop */ }
    }
    function onShowEvent(_e: Event) { onShow(); }
    window.addEventListener('sticky-cta:show', onShowEvent);
    return () => window.removeEventListener('sticky-cta:show', onShowEvent);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-3xl px-4" role="region" aria-label="Sticky call to action">
      <div className="card flex items-center justify-between gap-3">
        <div className="text-sm text-white/80">Ready to see it live?</div>
        <div className="flex gap-2">
          <button
            className="btn-secondary"
            onClick={() => { try { track(ANALYTICS_LABELS.sticky_cta_book); } catch { /* noop */ } onBook(); }}
            aria-label="Book a call"
          >
            Book a call
          </button>
          <button
            className="btn-primary"
            onClick={() => { try { track(ANALYTICS_LABELS.sticky_cta_demo); } catch { /* noop */ } onDemo(); }}
            aria-label="Watch the AI talk"
          >
            Watch the AI talk
          </button>
        </div>
      </div>
    </div>
  );
}

