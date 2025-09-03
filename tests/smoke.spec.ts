import { test, expect } from '@playwright/test';

test('Home demo opens and closes -> scheduler shows', async ({ page }) => {
  await page.route('**/api/tavus/start', route => route.fulfill({ json: { conversation_url: 'https://example.com/demo' } }));
  await page.goto('/');
  await page.getByRole('button', { name: /Watch the AI talk now/i }).click();
  await expect(page.getByRole('dialog', { name: /Close demo/i })).toBeVisible();
  await page.getByRole('button', { name: /Close demo/i }).click();
  await expect(page.getByRole('dialog', { name: /Close scheduler/i })).toBeVisible();
});

test('Pricing page shows plans and can start checkout', async ({ page }) => {
  await page.route('**/api/stripe/checkout', route => route.fulfill({ json: { url: 'https://example.com/checkout' } }));
  await page.goto('/pricing');
  await expect(page.getByRole('heading', { name: 'Pricing' })).toBeVisible();
  await page.getByRole('button', { name: /Buy Starter/i }).click();
});

test('Book page captures UTM into localStorage', async ({ page }) => {
  await page.goto('/book?utm_source=testsrc&utm_medium=testmed');
  await expect(page.getByRole('heading', { name: /Book a Strategy Call/i })).toBeVisible();
  await page.waitForFunction(() => !!localStorage.getItem('last_utm'));
  const utm = await page.evaluate(() => localStorage.getItem('last_utm'));
  expect(utm).toContain('testsrc');
});

