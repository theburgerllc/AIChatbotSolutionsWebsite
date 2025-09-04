# Deployment Checklist - AI Chatbot Solutions

## ⚠️ Vercel Protection

**Important:** Disable Vercel Protection for Preview/Production or use Bypass Token for manual checks. Webhooks require Protection OFF to receive 200.

## ✅ Pre-Deployment Verification

### 1. Local Build & Test
```bash
# Clean install and build
npm ci
npm run typecheck
npm run lint  
npm run build
npm test
```

### 2. Environment Setup

#### Required Environment Variables
Create `.env.local` for local development with these variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe (from https://dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (get from stripe CLI after running listen command)

# Tavus (from Tavus Dashboard)
TAVUS_API_KEY=your_api_key
TAVUS_PERSONA_ID=your_persona_id
TAVUS_REPLICA_ID=your_replica_id
TAVUS_CALLBACK_URL=https://your-domain.vercel.app/api/tavus/webhook

# Optional
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourname/meeting
CALENDLY_WEBHOOK_TOKEN=your_token
LEADS_NOTIFICATION_EMAIL=your@email.com
```

## 📝 Vercel Project Configuration

### 1. General Settings
- **Framework Preset:** Next.js
- **Node.js Version:** 22.x
- **Root Directory:** ./
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm ci` (default)

### 2. Environment Variables Setup
Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Preview & Production | Your deployment URL |
| `STRIPE_SECRET_KEY` | Preview & Production | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Preview & Production | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Preview & Production | Stripe webhook signing secret |
| `TAVUS_API_KEY` | Preview & Production | Tavus API key |
| `TAVUS_PERSONA_ID` | Preview & Production | Tavus persona ID |
| `TAVUS_REPLICA_ID` | Preview & Production | Tavus replica ID |
| `TAVUS_CALLBACK_URL` | Preview & Production | Your webhook endpoint URL |

## 🧪 Local Testing Scripts

### Test Stripe Webhook
```powershell
# Run the test script
.\\scripts\\test-stripe-webhook.ps1

# Or manually:
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Forward webhooks
stripe listen --events checkout.session.completed,customer.subscription.updated --forward-to localhost:3000/api/stripe/webhook

# Terminal 3: Trigger test event
stripe trigger checkout.session.completed
```

### Test Tavus API
```powershell
# Run the test script
.\\scripts\\test-tavus-api.ps1

# Or manually with curl:
curl -X POST http://localhost:3000/api/tavus/start -H "Content-Type: application/json" -d "{}"
```

## 🚀 Deployment Steps

### 1. First Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel Dashboard
3. Deploy to Preview branch first
4. Test all endpoints on Preview URL
5. Promote to Production

### 2. Preview Environment Testing
- [ ] Home page loads without errors
- [ ] 3D scene renders correctly (no SSR errors)
- [ ] API routes return expected responses:
  - [ ] `/api/stripe/checkout` - Creates session
  - [ ] `/api/stripe/portal` - Returns portal URL
  - [ ] `/api/stripe/webhook` - Responds to webhooks
  - [ ] `/api/tavus/start` - Creates conversation
  - [ ] `/api/tavus/webhook` - Receives callbacks
  - [ ] `/api/contact` - Processes contact form

### 3. Production Verification
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Configure Stripe webhooks to production URL
- [ ] Update Tavus callback URL to production
- [ ] Test all critical paths with real data

## 🔒 Security Checklist

- [x] All dependencies pinned to exact versions
- [x] npm audit shows 0 vulnerabilities
- [x] Sensitive keys only in environment variables
- [x] API routes validate input and handle errors
- [x] Webhook signatures verified (Stripe)
- [x] CORS headers properly configured

## 🛠 Post-Deployment

### Monitoring Setup
1. Enable Vercel Analytics (optional)
2. Set up error tracking (e.g., Sentry)
3. Configure uptime monitoring
4. Set up alerting for failed deployments

### Webhook Configuration

#### Stripe Webhooks
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy signing secret to Vercel env vars

#### Tavus Webhooks
1. Configure in Tavus Dashboard
2. Set callback URL: `https://your-domain.vercel.app/api/tavus/webhook`
3. Enable desired event types

## ⚡ Performance Optimizations

- [x] Dynamic imports for heavy components (Three.js)
- [x] Client-side only rendering for 3D scenes
- [x] Proper tree-shaking with ES modules
- [x] Next.js automatic code splitting
- [x] Image optimization with Next/Image

## 🔄 CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push:
- Installs dependencies
- Checks pinned dependencies
- Runs TypeScript type checking
- Runs ESLint
- Builds the application
- Runs tests (when configured)

## 📞 Support & Troubleshooting

### Common Issues

**Build fails with "Module not found"**
- Ensure all dependencies are installed: `npm ci`
- Clear cache: `rm -rf .next node_modules && npm ci`

**3D scene not rendering**
- Check browser WebGL support
- Verify client-side rendering with `{ ssr: false }`
- Check console for Three.js errors

**Stripe webhooks not working**
- Verify webhook secret matches
- Check endpoint URL is accessible
- Ensure signature verification is enabled

**Environment variables not loading**
- Restart dev server after adding .env.local
- Verify variable names match exactly
- Check Vercel dashboard for production vars

## ✨ Final Checks

Before going live:
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Build succeeds locally and on Vercel
- [ ] All API endpoints tested
- [ ] Webhooks configured and tested
- [ ] SSL certificate active
- [ ] Domain configured correctly
