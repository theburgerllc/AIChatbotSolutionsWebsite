"use client";
import Link from 'next/link';
import type { Route } from 'next';

export default function GlowMenu() {
  const items: { href: Route; label: string }[] = [
    { href: '/', label: 'Home' },
    { href: '/demo', label: 'Demo' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/book', label: 'Book' },
  ];
  return (
    <nav className="w-full py-3">
      <ul className="flex gap-4 items-center">
        {items.map(i => (
          <li key={i.href}>
            <Link href={i.href} className="px-3 py-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

