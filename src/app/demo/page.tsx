import Link from 'next/link';

export const metadata = { title: 'Demos — AI Chatbot Solutions' };

export default function DemoHub() {
  const verticals = [
    { key: 'legal', title: 'Legal', desc: 'Qualify prospects, answer intake questions, and book consultations.' },
    { key: 'ecommerce', title: 'Ecommerce', desc: 'Guide shoppers, resolve objections, and recover carts.' },
    { key: 'healthcare', title: 'Healthcare', desc: 'Triage questions, share directions, and schedule appointments.' }
  ];

  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold">Interactive Demos</h1>
      <p className="mt-2 text-white/70">Pick a vertical to experience the AI in context.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {verticals.map(v => (
          <div key={v.key} className="card">
            <h2 className="text-xl font-semibold">{v.title}</h2>
            <p className="text-white/70 mt-2">{v.desc}</p>
            <Link href={`/demo/${v.key}`} className="btn-primary mt-4 inline-flex">Open {v.title} Demo</Link>
          </div>
        ))}
      </div>
    </main>
  );
}

