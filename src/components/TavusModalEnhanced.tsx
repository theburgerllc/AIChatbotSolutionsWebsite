"use client";
import { useEffect, useRef, useState } from 'react';

interface TavusModalProps {
  open: boolean;
  onClose: () => void;
  conversationUrl?: string;
  error?: string;
}

export default function TavusModalEnhanced({ open, onClose, conversationUrl, error }: TavusModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(true);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      window.addEventListener('keydown', onKey);
      setTimeout(() => closeRef.current?.focus(), 0);
      setIsLoading(true);
      
      // Check permissions
      if (navigator.mediaDevices && conversationUrl) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(() => {
            setHasPermissions(true);
            setIsLoading(false);
          })
          .catch(() => {
            setHasPermissions(false);
            setIsLoading(false);
          });
      } else if (conversationUrl) {
        setTimeout(() => setIsLoading(false), 1500);
      }
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, conversationUrl]);

  if (!open) return null;
  
  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-label="AI Video Chat Demo" 
      className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true" 
      />
      <div className="relative w-[92vw] max-w-4xl h-[80vh] max-h-[600px] bg-gradient-to-br from-gray-900/95 to-black/95 border border-purple-500/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md animate-slide-in-up">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">
              {isLoading ? 'Connecting...' : 'Live AI Agent'}
            </span>
          </div>
          <button 
            ref={closeRef} 
            className="btn-secondary !px-4 !py-2" 
            onClick={onClose} 
            aria-label="Close demo"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>
        
        {/* Content */}
        <div className="w-full h-full flex items-center justify-center">
          {error ? (
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Unable to start demo</h3>
              <p className="text-white/60 mb-6 max-w-md mx-auto">{error}</p>
              <button onClick={onClose} className="btn-primary">
                Schedule a Live Demo Instead
              </button>
            </div>
          ) : !hasPermissions ? (
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Camera & Microphone Required</h3>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                Please allow camera and microphone access to interact with our AI agent.
              </p>
              <button onClick={() => window.location.reload()} className="btn-primary">
                Try Again
              </button>
            </div>
          ) : conversationUrl ? (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4">
                      <svg className="animate-spin" viewBox="0 0 24 24">
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4" 
                          fill="none"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                    <p className="text-white/80 animate-pulse">Initializing AI agent...</p>
                  </div>
                </div>
              )}
              <iframe 
                src={conversationUrl} 
                title="AI Conversation" 
                className="w-full h-full border-0" 
                allow="microphone; camera; autoplay"
                onLoad={() => setIsLoading(false)}
              />
            </>
          ) : (
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <svg className="animate-spin" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <p className="text-white/80 animate-pulse">Preparing your demo experience...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
