import { expect, test } from '@playwright/test';

const guestEntry = {
  cookies: [],
  origins: [{
    origin: 'http://127.0.0.1:5173',
    localStorage: [{ name: 'nuanban.entry.v1', value: JSON.stringify({ mode: 'guest', at: '2026-01-01T00:00:00.000Z' }) }],
  }],
};

test.describe('第一次进入暖伴', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('首次访问跳转到欢迎页，可游客进入并记住选择', async ({ page }) => {
    await page.goto('/#/');
    await expect(page).toHaveURL(/#\/welcome$/);
    await expect(page.getByRole('heading', { name: /先坐一会儿/ })).toBeVisible();
    await page.getByRole('button', { name: '游客模式，直接进入' }).click();
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.getByRole('heading', { name: '今天想学点什么？' })).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('nuanban.entry.v1'))).toContain('guest');
    await page.reload();
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.getByRole('heading', { name: '今天想学点什么？' })).toBeVisible();
  });

  test('登录入口只展示真实账号状态，不收集任何凭证', async ({ page }) => {
    await page.goto('/#/welcome');
    await page.getByRole('button', { name: '登录暖伴账号' }).click();
    const panel = page.getByRole('region', { name: '账号服务状态' });
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('不会生成任何凭证');
    await expect(page.locator('input[type="password"], input[type="text"], input[type="tel"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /模拟|演练|认领/ })).toHaveCount(0);
    await expect(page.getByRole('link', { name: '查看账号服务状态' })).toHaveAttribute('href', '#/onboarding/login');
    expect(await page.evaluate(() => Object.keys(localStorage).filter(key => /token|session|auth/i.test(key)))).toEqual([]);
  });

  test('纸纹流光只是装饰：不拦截点击、无横向溢出、减少动态时静止', async ({ page }) => {
    await page.goto('/#/welcome');
    const ambient = page.locator('.ambient');
    await expect(ambient).toHaveCount(1);
    const style = await ambient.evaluate(element => {
      const computed = getComputedStyle(element);
      return { pointerEvents: computed.pointerEvents, position: computed.position };
    });
    expect(style).toEqual({ pointerEvents: 'none', position: 'fixed' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await ambient.evaluate(element => getComputedStyle(element, '::after').animationName)).toBe('none');
  });
});

test.describe('已经选过游客模式', () => {
  test.use({ storageState: guestEntry });

  test('直接访问首页不会被拦截，背景层仍在', async ({ page }) => {
    await page.goto('/#/');
    await expect(page.getByRole('heading', { name: '今天想学点什么？' })).toBeVisible();
    await expect(page.locator('.ambient')).toHaveCount(1);
  });

  test('再次打开欢迎页显示继续进入', async ({ page }) => {
    await page.goto('/#/welcome');
    await expect(page.getByRole('heading', { name: '欢迎回来' })).toBeVisible();
    await page.getByRole('button', { name: '继续以游客身份进入' }).click();
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.getByRole('heading', { name: '今天想学点什么？' })).toBeVisible();
  });
});
