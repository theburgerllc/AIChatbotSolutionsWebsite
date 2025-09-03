"use client";
import { useState, useEffect } from 'react';
import GlowMenu from '@/components/GlowMenu';
import ShaderHeader from '@/components/ShaderHeader';
import HeroScene from '@/components/HeroScene';
import StickyCTA from '@/components/StickyCTA';
import ExitIntent from '@/components/ExitIntent';
import TavusModal from '@/components/TavusModal';
import ScheduleModal from '@/components/ScheduleModal';
import ROIQuickCalc from '@/components/ROIQuickCalc';
import SocialProof from '@/components/SocialProof';
import { startConversation } from '@/lib/tavus';
import { track } from '@/lib/analytics';
import { VARIANT_A_HEADLINE, CTA_PRIMARY, CTA_SECONDARY, BENEFITS_BULLETS } from '@/lib/constants';

export default function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [conversationUrl, setConversationUrl] = useState<string>();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('sticky-cta:show'));
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  async function handleDemo() {
    try {
      track('demo_start');
      const url = await startConversation();
      setConversationUrl(url);
      setDemoOpen(true);
    } catch {
      setScheduleOpen(true);
    }
  }

  return (
    <>
      <ShaderHeader />
      <GlowMenu />
      <main className="container py-8">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {VARIANT_A_HEADLINE}
            </h1>
            <p className="mt-4 text-white/70">
              {BENEFITS_BULLETS.join(' • ')}
            </p>
            <div className="mt-6 flex gap-3">
              <button className="btn-primary" onClick={handleDemo}>
                {CTA_PRIMARY}
              </button>
              <button className="btn-secondary" onClick={() => setScheduleOpen(true)}>
                {CTA_SECONDARY}
              </button>
            </div>
          </div>
          <div className="h-[400px] relative">
            <HeroScene />
          </div>
        </section>

        <ROIQuickCalc />
        <SocialProof />
      </main>

      <StickyCTA onDemo={handleDemo} onBook={() => setScheduleOpen(true)} />
      <ExitIntent onAccept={() => localStorage.setItem('discount_code', 'SAVE15')} />
      
      <TavusModal 
        open={demoOpen} 
        onClose={() => {
          setDemoOpen(false);
          setTimeout(() => setScheduleOpen(true), 400);
        }}
        conversationUrl={conversationUrl}
      />
      
      <ScheduleModal 
        open={scheduleOpen} 
        onClose={() => setScheduleOpen(false)} 
      />
    </>
  );
}

