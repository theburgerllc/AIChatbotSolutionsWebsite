"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="container py-24 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-white/70">{error?.message || 'Unexpected error'}</p>
      <button className="btn-primary mt-6" onClick={() => reset()}>Try again</button>
    </main>
  );
}

