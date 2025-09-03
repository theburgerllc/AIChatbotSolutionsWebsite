export async function generateMetadata({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical: v } = await params;
  return { title: `${v[0]?.toUpperCase()}${v.slice(1)} Demo — AI Chatbot Solutions` };
}

export default async function VerticalDemoPage({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical: v } = await params;
  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold">{v[0]?.toUpperCase()}{v.slice(1)} Demo</h1>
      <p className="mt-2 text-white/70">Experience the Tavus-powered AI for {v} workflows. This page will embed the conversation viewer and staged content.</p>
      <div className="card mt-6">Demo content coming soon.</div>
    </main>
  );
}

