import { test, expect } from '@playwright/test';

test('join federation and access app', async ({ page }) => {
  await page.goto('/join/search');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Join' }).first().click();
  await expect(page).toHaveURL(/\/app/);
  await expect(page.getByText('Dashboard')).toBeVisible();
});
