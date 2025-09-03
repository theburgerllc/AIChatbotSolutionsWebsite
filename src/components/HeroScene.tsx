"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const OrbScene = dynamic(() => import('./r3f/OrbScene'), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl') ||
      canvas.getContext('webgl2')
    );
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => setReduced(mq.matches);
      update();
      mq.addEventListener?.('change', update);
      return () => mq.removeEventListener?.('change', update);
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWebgl(supportsWebGL());
    }
  }, []);

  if (!webgl || reduced) {
    return (
      <div className="relative aspect-video bg-gradient-to-br from-[var(--color-primary)]/30 via-purple-500/20 to-cyan-400/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.12),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,.08),transparent_40%)]" />
        <div className="absolute inset-0 grid place-items-center text-white/80">Preview</div>
      </div>
    );
  }

  return <OrbScene reduced={reduced} />;
}

