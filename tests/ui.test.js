const { test, expect} = require('@playwright/test');
//login page function
async function login(page) {

        await page.goto('http://localhost:3000/login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"] ', '123456');
        await page.click('input[type="submit"]');
    }

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


    test ('Verify "MY Books" link is visible for logged in user', async ({ page }) => {
        await page.goto('http://localhost:3000/login');
        await page.fill('input[name="email"]', 'peter@abv.bg');
        await page.fill('input[name="password"] ', '123456');
        await page.click('input[type="submit"]');

        const myBooksLink = await page.$('a[href="/profile"]');
        const ismyBooksLinkVisible = await myBooksLink.isVisible();

        expect(ismyBooksLinkVisible).toBe(true);
    });
    
    test('Verify "add book" link is visible for logged in user', async ({ page }) => {
        await login(page);

        const addBookLink = await page.$('a[href="/create"]');
        const isAddBookLinkVisible = await addBookLink.isVisible();
        expect(isAddBookLinkVisible).toBe(true);
        }
    );
    test('Verify "user email is visible"', async ({ page }) => {
        await login(page);
        
        const welcomeMessage = await page.locator('span:text("Welcome, peter@abv.bg")');
        const isVisible = await welcomeMessage.isVisible();
        expect(isVisible).toBe(true);
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
            
        test('Submit the form with empty fields', async ({ page }) => {
            await page.goto('http://localhost:3000/login');
            await page.click('input[type="submit"]');
            page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('All fields are required');
            await dialog.accept();
            await page.$('a[href="/login"]');
            expect(page.url()).toContain('http://localhost:3000/login');
        }
    )
});
    test ('Empty Email', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
   
    await page.fill('input[name="password"] ', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required');
        await dialog.accept();
        await page.$('a[href="/login"]');
        expect(page.url()).toContain('http://localhost:3000/login');
    }
)});
    test ('Empty register page', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required');
        await dialog.accept();
        await page.$('a[href="/register"]');
        expect(page.url()).toContain('http://localhost:3000/register');
    }
)});
    test ('full register page', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'user@abv.com');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
    });
    test ('Worng password register page', async ({ page }) => {
        await page.goto('http://localhost:3000/register');
        await page.fill('input[name="email"]', 'user@abv.bg');
        await page.fill('input[name="password"]', '123456');
        await page.fill('input[name="confirm-pass"]', '1234567');
        await page.click('input[type="submit"]');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain("Passwords don't match");
            await dialog.accept();
            await page.$('a[href="/register"]');
            expect(page.url()).toContain('http://localhost:3000/register');
        }
    )});