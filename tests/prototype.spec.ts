import { test, expect } from '@playwright/test';

test.describe('Admin Center Home Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders global navigation', async ({ page }) => {
    // Header elements
    await expect(page.getByRole('button', { name: 'Admin center' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Zendesk' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Help' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Admin User/ })).toBeVisible();
  });

  test('renders main navigation items', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'People' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Channels' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apps' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Settings' })).toBeVisible();
  });

  test('renders homepage content', async ({ page }) => {
    // Page header
    await expect(page.getByRole('heading', { name: 'Welcome to Admin Center', level: 1 })).toBeVisible();
    await expect(page.getByText('Manage your account, people, channels, and settings')).toBeVisible();

    // Account overview section
    await expect(page.getByRole('heading', { name: 'Account overview', level: 2 })).toBeVisible();
    await expect(page.getByText('Total agents')).toBeVisible();
    await expect(page.getByText('247')).toBeVisible();
    await expect(page.getByText('Active tickets')).toBeVisible();
    await expect(page.getByText('1,432')).toBeVisible();
    await expect(page.getByText('Satisfaction score')).toBeVisible();
    await expect(page.getByText('94%')).toBeVisible();
    await expect(page.getByText('Avg response time')).toBeVisible();
    await expect(page.getByText('2.4h')).toBeVisible();
  });

  test('renders quick actions section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Quick actions', level: 2 })).toBeVisible();
    await expect(page.getByText('Add team members')).toBeVisible();
    await expect(page.getByText('Configure channels')).toBeVisible();
    await expect(page.getByText('Browse apps')).toBeVisible();
  });

  test('renders recent activity section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent activity', level: 2 })).toBeVisible();
    await expect(page.getByText('Sarah Chen')).toBeVisible();
    await expect(page.getByText('updated security settings')).toBeVisible();
    await expect(page.getByText('3 new agents')).toBeVisible();
    await expect(page.getByText('Slack integration')).toBeVisible();
  });

  test('renders call to action button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'View all settings' })).toBeVisible();
  });

  test('navigation items are interactive', async ({ page }) => {
    const peopleButton = page.getByRole('button', { name: 'People' });
    await expect(peopleButton).toBeVisible();

    // Click should work (no errors)
    await peopleButton.click();
    await expect(peopleButton).toBeVisible();
  });

  test('matches design screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('admin-center-home.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('has accessible structure', async ({ page }) => {
    // Check for proper landmarks
    const main = page.locator('main');
    await expect(main).toBeVisible();

    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav).toBeVisible();

    const banner = page.getByRole('banner', { name: 'Header' });
    await expect(banner).toBeVisible();
  });
});
