"use client";
import { useState } from 'react';
import HeroScene from './HeroScene';
import { track } from '@/lib/analytics';

interface HeroSectionProps {
  onStartDemo: () => void;
  onScheduleCall: () => void;
  isLoading?: boolean;
  error?: string;
}

export default function HeroSection({ onStartDemo, onScheduleCall, isLoading = false, error }: HeroSectionProps) {
  const [emailFocused, setEmailFocused] = useState(false);
  const [email, setEmail] = useState('');

  const handleQuickStart = () => {
    if (email) {
      track('quick_start_attempt', { has_email: true });
      localStorage.setItem('lead_email', email);
    }
    onStartDemo();
  };

  return (
    <section className="relative min-h-[700px] flex items-center py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="order-2 lg:order-1 animate-fadeIn">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-6 animate-slideInLeft">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-purple-300 font-medium">Live Now • Powered by Tavus.io</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="block">AI That Talks,</span>
            <span className="block gradient-text">Sees & Converts</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
            Deploy a human-like AI assistant that qualifies leads, books meetings, and closes deals 
            <span className="text-purple-400 font-semibold"> 24/7</span>. 
            No more missed opportunities.
          </p>

          {/* Benefit Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {['85% Lead Qualification', '3x Conversion Rate', '24/7 Availability'].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-slideInLeft">
              <p className="text-red-400 text-sm flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* Quick Start Form */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className={`relative flex-1 transition-all ${emailFocused ? 'scale-105' : ''}`}>
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>
              <button 
                onClick={handleQuickStart}
                disabled={isLoading}
                className="btn-primary px-8 py-4 text-base font-semibold whitespace-nowrap group"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Starting...
                  </>
                ) : (
                  <>
                    Start Free Demo
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Alternative CTA */}
            <div className="flex items-center gap-4">
              <span className="text-white/40 text-sm">or</span>
              <button onClick={onScheduleCall} className="text-purple-400 hover:text-purple-300 text-sm font-medium underline underline-offset-4 transition-colors">
                Schedule a personalized demo with our team →
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-6">
              {[
                { icon: '🔒', text: 'SOC 2 Compliant' },
                { icon: '⚡', text: 'Setup in 5 minutes' },
                { icon: '💳', text: 'No credit card required' }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-white/60">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px] lg:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl" />
          <div className="relative h-full animate-float">
            <HeroScene />
          </div>
          
          {/* Floating Stats */}
          <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 animate-slideInRight">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-lg">📈</span>
              </div>
              <div>
                <p className="text-xs text-white/60">Conversion Rate</p>
                <p className="text-xl font-bold text-white">+312%</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 animate-slideInLeft animation-delay-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-400 text-lg">🎯</span>
              </div>
              <div>
                <p className="text-xs text-white/60">Leads Qualified</p>
                <p className="text-xl font-bold text-white">85%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
