import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Navigate to the homepage before each test
  await page.goto('/');

  // Explicitly wait for the Welcome Banner to appear and click it
  const welcomeBanner = page.locator('button[aria-label="Close Welcome Banner"]');
  await welcomeBanner.waitFor({ state: 'visible', timeout: 5000 });
  await welcomeBanner.click();

  // Dismiss cookie consent if present
  const cookieConsent = page.locator('a[aria-label="dismiss cookie message"]');
  if (await cookieConsent.isVisible()) {
    await cookieConsent.click();
  }
});

test('should successfully navigate to the homepage', async ({ page }) => {
  // Validate the page title
  await expect(page).toHaveTitle(/OWASP Juice Shop/);
});

test('should display the navigation toolbar elements', async ({ page }) => {
  // Explicitly wait for the login button to be visible in the DOM
  const loginButton = page.locator('#navbarLoginButton');
  await loginButton.waitFor({ state: 'visible', timeout: 5000 });
  await expect(loginButton).toBeVisible();

  // Validate search bar visibility
  const searchBar = page.locator('#searchQuery');
  await expect(searchBar).toBeVisible();
});

test('should display the product grid container', async ({ page }) => {
  // Explicitly wait for the product grid to render
  const productGrid = page.locator('mat-grid-list');
  await productGrid.waitFor({ state: 'visible', timeout: 5000 });
  await expect(productGrid).toBeVisible();
});