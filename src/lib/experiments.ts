export type Variant = 'A' | 'B';

function parseVariant(v?: string | null): Variant | null {
  if (!v) return null;
  const up = v.toUpperCase();
  return up === 'A' || up === 'B' ? (up as Variant) : null;
}

export function getVariant(_name: 'hero'): Variant {
  try {
    if (typeof window !== 'undefined') {
      const urlV = new URLSearchParams(window.location.search).get('exp_hero');
      const fromUrl = parseVariant(urlV);
      if (fromUrl) return fromUrl;

      const ls = parseVariant(localStorage.getItem('exp_hero'));
      if (ls) return ls;

      const ck = document.cookie.split(';').map(s => s.trim()).find(s => s.startsWith('exp_hero='));
      const cv = parseVariant(ck?.split('=')[1]);
      if (cv) return cv;
    }
  } catch { /* noop */ }
  return 'A';
}

export function setVariant(v: Variant) {
  try {
    if (typeof document !== 'undefined') {
      document.cookie = `exp_hero=${v}; Path=/; Max-Age=${60 * 60 * 24 * 30}`;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('exp_hero', v);
    }
  } catch { /* noop */ }
}

