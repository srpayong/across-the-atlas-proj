import { expect, test } from '@playwright/test';

test('navigation test', async ({page}) => {
await page.goto('http://localhost:3000');


// await expect(
//   page.getByRole('heading', { name: '"A journey of a thousand miles begins with one single step." -Lao Tzu' }),
//   ).toBeVisible();
await
  page.getByRole('link', { name: 'Login' });
await expect (
  page.getByRole('img', { name: 'Slide' }),).toBeVisible();
await expect (
  page.getByRole('button', { name: 'Learn more' }).first()).toBeVisible();
await expect(
  page.getByRole('button', { name: 'Learn more' }).nth(1)).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Learn more' }).nth(2)).toBeVisible();
// await expect(
//   page.locator('li').filter ({ hasText: 'Explore' }).locator('img'))



await page.waitForURL('http://localhost:3000/login', {timeout: 60000})

await page.waitForURL('http://localhost:3000/register', {timeout: 60000})



})
