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
    // Show sticky CTA after 30 seconds
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('sticky-cta:show'));
    }, 30000);
    
    // Track page view
    track('page_view', { page: 'home' });
    
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
      
      // Show schedule modal after a delay if demo fails
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
        {/* Hero Section with Enhanced Sales Copy */}
        <section className="grid md:grid-cols-2 gap-12 items-center min-h-[600px] py-12">
          <div className="animate-fadeIn">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-purple-300">Powered by Tavus.io Technology</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="gradient-text">{VARIANT_A_HEADLINE}</span>
            </h1>
            
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Transform your customer experience with an AI that can{' '}
              <span className="text-purple-400 font-semibold">see, hear, and respond</span>{' '}
              like a real human. Available 24/7, never gets tired, and scales instantly.
            </p>
            
            {/* Benefits with Icons */}
            <ul className="mt-8 space-y-3">
              {BENEFITS_BULLETS.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/70">{benefit}</span>
                </li>
              ))}
            </ul>
            
            {/* Error Message */}
            {demoError && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {demoError}
                </p>
              </div>
            )}
            
            {/* CTA Buttons with Enhanced Styling */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                className="btn-primary group relative overflow-hidden min-w-[200px]" 
                onClick={handleDemo}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Starting Demo...
                  </>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {CTA_PRIMARY}
                    </span>
                  </>
                )}
              </button>
              
              <button 
                className="btn-secondary min-w-[200px]" 
                onClick={() => setScheduleOpen(true)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {CTA_SECONDARY}
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
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
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  SOC 2 Compliant
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="h-[400px] md:h-[500px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
            <HeroScene />
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-24 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Industry Leaders Choose Our <span className="gradient-text">AI Video Chatbot</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Powered by cutting-edge Tavus.io technology, our platform delivers unmatched performance and reliability
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Human-Like Interaction</h3>
              <p className="text-white/70">Natural conversations with visual and emotional intelligence that builds trust instantly</p>
              <div className="mt-4 text-purple-400 text-sm font-semibold">85% engagement rate →</div>
            </div>
            
            <div className="card group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Response</h3>
              <p className="text-white/70">24/7 availability with zero wait times and unlimited concurrent conversations</p>
              <div className="mt-4 text-purple-400 text-sm font-semibold">3x faster response →</div>
            </div>
            
            <div className="card group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven ROI</h3>
              <p className="text-white/70">85% lead qualification rate with 3x conversion improvement on average</p>
              <div className="mt-4 text-purple-400 text-sm font-semibold">250% ROI average →</div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <ROIQuickCalc />
        
        {/* Social Proof */}
        <SocialProof />
        
        {/* Final CTA Section */}
        <section className="mt-24 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-white/60 mb-8">
              Join hundreds of companies already using AI to scale their customer interactions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleDemo} className="btn-primary px-8 py-4 text-lg">
                Start Your Free Demo Now
              </button>
              <button onClick={() => setScheduleOpen(true)} className="btn-secondary px-8 py-4 text-lg">
                Talk to an Expert
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      <StickyCTA onDemo={handleDemo} onBook={() => setScheduleOpen(true)} />
      
      {/* Exit Intent */}
      <ExitIntent onAccept={() => {
        localStorage.setItem('discount_code', 'SAVE15');
        track('exit_intent_accepted');
      }} />
      
      {/* Tavus Modal */}
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
      
      {/* Schedule Modal */}
      <ScheduleModal 
        open={scheduleOpen} 
        onClose={() => {
          setScheduleOpen(false);
          track('schedule_modal_closed');
        }} 
      />
    </>
  );
}
