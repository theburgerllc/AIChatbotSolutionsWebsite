"use client";
import { useEffect, useState } from 'react';

export default function ExitIntent({ onAccept }: { onAccept?: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const key = 'exit-intent-shown';
    function handler(e: MouseEvent) {
      if (sessionStorage.getItem(key)) return;
      const y = e.clientY;
      if (y !== undefined && y <= 0) {
        sessionStorage.setItem(key, '1');
        setShow(true);
      }
    }
    document.addEventListener('mouseout', handler);
    return () => document.removeEventListener('mouseout', handler);
  }, []);

  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3">
      <div className="mx-auto max-w-3xl card flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold">Save 15% today</div>
          <div className="text-white/70 text-sm">Use code SAVE15 at checkout. Want the discount?</div>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => setShow(false)}>No thanks</button>
          <button className="btn-primary" onClick={() => { try { localStorage.setItem('discount_code', 'SAVE15'); } catch { /* noop */ } onAccept?.(); setShow(false); }}>Yes, apply</button>
        </div>
      </div>
    </div>
  );
}

