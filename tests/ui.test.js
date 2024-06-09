const { test, expect} = require('@playwright/test');
//Nav bar tests for guest users//
test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
    });

test('Verify "Login" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
    });

test('Verify "Register" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();
    expect(isRegisterButtonVisible).toBe(true);
    });
    //Nav bar tests for logged in users//
test('Verify "All Books" link is visible for logged in user', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
    });
test('Verify "user can log in with valid credentials"', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('nav.navbar');

    //go to login page
    const loginButton = await page.$('a[href="/login"]');
    await loginButton.click();
    //fill in the form
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    const submitButton = await page.$('xpath=//*[@id="login-form"]/fieldset/input');
    await submitButton.click();

    //check if the user can log out
    const logoutButton = await page.$('#logoutBtn');
    const logoutButtontext = await logoutButton.textContent();
    expect(logoutButtontext).toBe('Logout');
    });

    