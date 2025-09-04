#!/usr/bin/env pwsh

Write-Host "=== Stripe Webhook Local Test ===" -ForegroundColor Cyan
Write-Host ""

# Check if stripe CLI is installed
try {
    $stripeVersion = stripe version 2>$null
    if ($LASTEXITCODE -ne 0) { throw }
    Write-Host "✓ Stripe CLI detected: $stripeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Stripe CLI not found. Install from: https://stripe.com/docs/stripe-cli" -ForegroundColor Red
    Write-Host "  Run: winget install Stripe.Stripe" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Starting local webhook forwarding..." -ForegroundColor Yellow
Write-Host "This will forward Stripe events to your local dev server." -ForegroundColor Gray
Write-Host ""
Write-Host "Instructions:" -ForegroundColor Cyan
Write-Host "1. First, start the dev server in a new terminal: npm run dev" -ForegroundColor White
Write-Host "2. Then run this command to start forwarding:" -ForegroundColor White
Write-Host ""
Write-Host "stripe listen --events checkout.session.completed,customer.subscription.updated --forward-to localhost:3000/api/stripe/webhook" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Copy the webhook signing secret printed by Stripe CLI" -ForegroundColor White
Write-Host "4. Set it in Vercel: STRIPE_WEBHOOK_SECRET=whsec_..." -ForegroundColor White
Write-Host ""
Write-Host "5. To test, run in another terminal:" -ForegroundColor White
Write-Host "stripe trigger checkout.session.completed" -ForegroundColor Yellow
Write-Host ""
