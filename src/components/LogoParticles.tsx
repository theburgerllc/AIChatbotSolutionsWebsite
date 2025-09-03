"use client";

export default function LogoParticles() {
  return (
    <div className="grid grid-cols-3 gap-4 opacity-80">
      {[
        "/logos/brand.svg",
        "/logos/tavus.svg",
        "/logos/stripe.svg"
      ].map((src) => (
        <img key={src} src={src} alt="logo" className="h-10 w-auto mx-auto" />
      ))}
    </div>
  );
}

