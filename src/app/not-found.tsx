import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container py-24 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="mt-2 text-white/70">We couldnt find that page.</p>
      <Link href="/" className="btn-primary mt-6 inline-flex">Go home</Link>
    </main>
  );
}

