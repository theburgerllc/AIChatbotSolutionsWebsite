// Tavus Types
export interface TavusResponse {
  conversation_url?: string;
  conversation_id?: string;
  error?: string;
  status?: string;
}

export interface TavusConfig {
  retryAttempts?: number;
  retryDelay?: number;
  timeout?: number;
}

export interface TavusModalProps {
  open: boolean;
  onClose: () => void;
  conversationUrl?: string;
  error?: string;
}

// UI Component Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
}

export interface LeadData extends ContactFormData {
  source: string;
  timestamp: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// Pricing Types
export interface PricingTier {
  id: string;
  name: string;
  price: number;
  priceId: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

// Error Types
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class TavusError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code, 500);
    this.name = 'TavusError';
  }
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Session Types
export interface UserSession {
  id: string;
  email: string;
  name?: string;
  role?: string;
  createdAt: Date;
}

// Constants Type Export
export interface AppConstants {
  VARIANT_A_HEADLINE: string;
  CTA_PRIMARY: string;
  CTA_SECONDARY: string;
  BENEFITS_BULLETS: string[];
}
