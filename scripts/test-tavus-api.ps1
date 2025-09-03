#!/usr/bin/env pwsh

Write-Host "=== Tavus API Local Test ===" -ForegroundColor Cyan
Write-Host ""

# Check if local server is running
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method Head -ErrorAction Stop -TimeoutSec 2
    Write-Host "✓ Local dev server is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Local dev server not responding. Start it first: npm run dev" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Testing Tavus conversation creation endpoint..." -ForegroundColor Yellow
Write-Host ""

# Test with optional persona and replica IDs
$testPayload = @{
    persona_id = "test-persona"
    replica_id = "test-replica"
} | ConvertTo-Json

Write-Host "Sending POST request to /api/tavus/start" -ForegroundColor Cyan
Write-Host "Payload: $testPayload" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/tavus/start" `
        -Method POST `
        -ContentType "application/json" `
        -Body $testPayload `
        -ErrorAction Stop
    
    Write-Host "✓ Response received:" -ForegroundColor Green
    $response | ConvertTo-Json | Write-Host
    
    if ($response.error -eq "Tavus not configured") {
        Write-Host ""
        Write-Host "⚠ Tavus API credentials not configured" -ForegroundColor Yellow
        Write-Host "Set these environment variables in .env.local:" -ForegroundColor White
        Write-Host "  TAVUS_API_KEY=your_api_key" -ForegroundColor Gray
        Write-Host "  TAVUS_PERSONA_ID=your_persona_id" -ForegroundColor Gray
        Write-Host "  TAVUS_REPLICA_ID=your_replica_id" -ForegroundColor Gray
    } elseif ($response.conversation_url) {
        Write-Host ""
        Write-Host "✓ Conversation created successfully!" -ForegroundColor Green
        Write-Host "URL: $($response.conversation_url)" -ForegroundColor White
    }
} catch {
    Write-Host "✗ Request failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Testing Tavus webhook endpoint..." -ForegroundColor Yellow

$webhookPayload = @{
    event = "conversation.completed"
    conversation_id = "test-123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/tavus/webhook" `
        -Method POST `
        -ContentType "application/json" `
        -Body $webhookPayload `
        -ErrorAction Stop
    
    Write-Host "✓ Webhook endpoint responded:" -ForegroundColor Green
    $response | ConvertTo-Json | Write-Host
} catch {
    Write-Host "✗ Webhook request failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Don't forget to set TAVUS_CALLBACK_URL in Vercel:" -ForegroundColor Yellow
Write-Host "  https://your-domain.vercel.app/api/tavus/webhook" -ForegroundColor Gray
