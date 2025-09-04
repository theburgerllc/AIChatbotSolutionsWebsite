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
import { startConversation, TavusError } from '@/lib/tavus';
import { track } from '@/lib/analytics';
import { VARIANT_A_HEADLINE, CTA_PRIMARY, CTA_SECONDARY, BENEFITS_BULLETS } from '@/lib/constants';

export default function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [conversationUrl, setConversationUrl] = useState<string>();
  const [demoError, setDemoError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('sticky-cta:show'));
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  async function handleDemo() {
    setIsLoading(true);
    setDemoError(undefined);
    
    try {
      track('demo_start_attempt');
      const url = await startConversation();
      setConversationUrl(url);
      setDemoOpen(true);
      track('demo_start_success');
    } catch (error) {
      console.error('Demo start failed:', error);
      
      if (error instanceof TavusError) {
        if (error.code === '503') {
          setDemoError('Our AI agents are currently busy. Please schedule a personal demo.');
        } else if (error.code === 'CONNECTION_ERROR') {
          setDemoError('Connection issue. Please check your internet and try again.');
        } else {
          setDemoError(error.message);
        }
      } else {
        setDemoError('Unable to start demo. Please try scheduling a call instead.');
      }
      
      track('demo_start_error', { error: error instanceof Error ? error.message : 'unknown' });
      
      setTimeout(() => {
        setScheduleOpen(true);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ShaderHeader />
      <GlowMenu />
      <main className="container py-8">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center min-h-[600px]">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight gradient-text">
              {VARIANT_A_HEADLINE}
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Transform your customer experience with an AI that can see, hear, and respond like a real human. 
              <span className="block mt-2 text-white/60">
                {BENEFITS_BULLETS.join(' • ')}
              </span>
            </p>
            
            {demoError && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {demoError}
              </div>
            )}
            
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                className="btn-primary group relative overflow-hidden" 
                onClick={handleDemo}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Starting Demo...
                  </>
                ) : (
                  <>
                    <span className="relative z-10">{CTA_PRIMARY}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => setScheduleOpen(true)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {CTA_SECONDARY}
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Setup in 5 minutes
              </div>
            </div>
          </div>
          
          <div className="h-[400px] md:h-[500px] relative animate-float">
            <HeroScene />
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Our <span className="gradient-text">AI Video Chatbot</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Human-Like Interaction</h3>
              <p className="text-white/70">Natural conversations with visual and emotional intelligence that builds trust</p>
            </div>
            <div className="card hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Response</h3>
              <p className="text-white/70">24/7 availability with zero wait times and unlimited concurrent conversations</p>
            </div>
            <div className="card hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-white/70">85% lead qualification rate with 3x conversion improvement on average</p>
            </div>
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
          setConversationUrl(undefined);
          track('demo_closed');
        }}
        conversationUrl={conversationUrl}
        error={demoError}
      />
      
      <ScheduleModal 
        open={scheduleOpen} 
        onClose={() => setScheduleOpen(false)} 
      />
    </>
  );
}
