import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const now = new Date();
  const pages = ['/', '/demo', '/book', '/thank-you', '/success', '/pricing', '/demo/legal', '/demo/ecommerce', '/demo/healthcare'];
  return pages.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'weekly', priority: p === '/' ? 1 : 0.6 }));
}

