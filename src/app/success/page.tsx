"use client";
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SuccessInner() {
  const router = useRouter();
  const sp = useSearchParams();
  useEffect(() => {
    // const id = sp.get('session_id');
    const t = setTimeout(() => router.push('/thank-you'), 800);
    return () => clearTimeout(t);
  }, [router, sp]);
  return (
    <main className="container py-16 text-center">
      <h1 className="text-4xl font-bold">Success</h1>
      <p className="mt-2 text-white/70">Finalizing your purchase… redirecting.</p>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<main className="container py-16 text-center"><p>Loading…</p></main>}>
      <SuccessInner />
    </Suspense>
  );
}

