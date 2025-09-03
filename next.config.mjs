/** @type {import('next').NextConfig} */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://*.analytics.google.com https://js.stripe.com https://assets.calendly.com",
  "connect-src 'self' https://tavusapi.com https://api.stripe.com https://hooks.stripe.com https://www.google-analytics.com https://region1.google-analytics.com https://*.analytics.google.com https://api.hsforms.com https://forms.hubspot.com https://api.hubapi.com https://*.hsforms.net https://*.hscollectedforms.net https://calendly.com https://*.calendly.com",
  "frame-src https://js.stripe.com https://*.stripe.com https://*.calendly.com https://*.tavus.io https://*.daily.co",
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data: https:",
  "form-action 'self' https://*.stripe.com https://*.calendly.com",
  "object-src 'none'"
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' }
];

const nextConfig = {
  poweredByHeader: false,
  typedRoutes: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;
