import path from 'path';
import { test, expect } from '@playwright/test';

const fixturePath = path.resolve(__dirname, '..', 'assets', 'homepage-fixture.html');

async function openFixture(page: Parameters<typeof test.beforeEach>[0]['page']) {
  await page.goto(`file://${fixturePath}`);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('load').catch(() => undefined);
}

test.beforeEach(async ({ page }) => {
  await openFixture(page);

  try {
    await page.getByRole('button', { name: /close welcome banner/i }).click({ timeout: 2000 });
  } catch {
    // Welcome banner not present, continue.
  }

  try {
    await page.getByRole('button', { name: /dismiss/i }).click({ timeout: 2000 });
  } catch {
    // Cookie/banner action not present, continue.
  }
});

test('should successfully navigate to the homepage', async ({ page }) => {
  await expect(page).toHaveTitle(/OWASP Juice Shop/);
  await expect(page.locator('body')).toContainText(/juice shop/i, { timeout: 30000 });
});

test('should display the navigation toolbar elements', async ({ page }) => {
  const loginButton = page.getByRole('button', { name: /login/i }).first();
  await expect(loginButton).toBeVisible({ timeout: 30000 });

  const searchBar = page.locator('#searchQuery').first();
  await expect(searchBar).toBeVisible({ timeout: 30000 });
});

test('should display the product grid container', async ({ page }) => {
  const productGrid = page.locator('#product-grid').first();
  await expect(productGrid).toBeVisible({ timeout: 30000 });
  await expect(productGrid).toHaveCount(1);
});
