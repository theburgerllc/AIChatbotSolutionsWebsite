import type { Metadata } from 'next';
import './globals.css';
import GAProvider from './providers/ga-provider';

export const metadata: Metadata = {
  title: 'AI Video Chatbot — Tavus-powered | Chatbot Solutions',
  description: 'Convert more buyers with a human-like AI that answers, qualifies, and books meetings.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Chatbot Solutions",
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  logo: "/logos/brand.svg",
  sameAs: ["https://www.tavus.io/"],
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI Video Chatbot",
  brand: { "@type": "Brand", name: "AI Chatbot Solutions" },
  image: ["/logos/brand.svg"],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: 199,
    highPrice: 699,
    priceCurrency: "USD",
    offerCount: 2,
    offers: [
      { "@type": "Offer", price: 199, priceCurrency: "USD", name: "Starter" },
      { "@type": "Offer", price: 699, priceCurrency: "USD", name: "Growth" }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GAProvider />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
        {children}
      </body>
    </html>
  );
}

