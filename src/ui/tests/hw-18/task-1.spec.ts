// Task 1.
// Write a smoke test suite with tests for registration at the site https://anatoly-karpovich.github.io/demo-login-form/
// Requirements:
// Username:
// - obligatory
// - should be 3 to 40 characters long (inclusive)
// - no prefix/postfix spaces
// - no all spaces
// Password:
// - obligatory
// - should be 8 to 20 characters long (inclusive)
// - no prefix/postfix spaces
// - no all spaces
// - at least one uppercase letter
// - at least one lowercase letter

// Additional comments:
// - to navigate to registration, precondition is required: using beforeEach hook
// - in case of successful registration, need to go back to the login page: using afterEach hook(?)

import { test, expect } from '@playwright/test';


test.describe('[UI] [Login page] [Register form]', () => {
    const validCredentials = {
        username: `ida-que${Date.now()}`,
        password: 'youShallPass'
    };
    const invalidUsername = {
        allSpaces: '   ',
        prefixSpaces: '   username',
        postfixSpaces: 'username   ',
        lessChars: 'us',
        moreChars: `${validCredentials.username}${validCredentials.username}${validCredentials.username}`,
    };
    const invalidPassword = {
        allSpaces: '   ',
        prefixSpaces: '   password',
        postfixSpaces: 'password   ',
        lessChars: 'pass',
        moreChars: `${validCredentials.password}${validCredentials.password}${validCredentials.password}`,
        noUppercase: 'password',
        noLowercase: 'PASSWORD',
    };

    test.beforeEach(async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
        await page.locator('#registerOnLogin').click();
    });

    test('Registration with valid credentials', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Successfully registered!' })).toBeVisible();
        });

    test.describe('Registration with invalid credentials', () => {
        test('No credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Please, provide valid data' })).toBeVisible();
        });
        test('No username', async ({ page }) => {
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Username is required' })).toBeVisible();
        });
        test('No password', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Password is required' })).toBeVisible();
        });
        // Invalid username with valid password
        test('Username all spaces (BUG - misspelling - test without misspell)', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(invalidUsername.allSpaces);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Prefix and postfix spaces are not allowed is username' })).toBeVisible(); // testing with misspell error message
        });
        test('Username prefix spaces (BUG - misspelling!)', async ({ page }) => {            
            await page.locator('#userNameOnRegister').fill(invalidUsername.prefixSpaces);            
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Prefix and postfix spaces are not allowed in username' })).toBeVisible();
        });
        test('Username postfix spaces (BUG - misspelling!)', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(invalidUsername.postfixSpaces);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Prefix and postfix spaces are not allowed in username' })).toBeVisible();
        });
        test('Username less chars', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(invalidUsername.lessChars);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Username should contain at least 3 characters' })).toBeVisible();
        });
        test('Username more chars (BUG!)', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(invalidUsername.moreChars);
            await page.locator('#passwordOnRegister').fill(validCredentials.password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Please, provide valid data' })).toBeVisible();
        });
        // Invalid password with valid username
        test('Password all spaces', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidPassword.allSpaces);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Password is required' })).toBeVisible();
        });
        test('Password prefix spaces (BUG!)', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidPassword.prefixSpaces);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Please, provide valid data' })).toBeVisible();
        });
        test('Password postfix spaces (BUG!)', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidPassword.postfixSpaces);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Please, provide valid data' })).toBeVisible();
        });
        test('Password less chars', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidPassword.lessChars);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Password should contain at least 8 characters' })).toBeVisible();
        });
        test('Password more chars (BUG!)', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidPassword.moreChars);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Please, provide valid data' })).toBeVisible();
        });
        test('Password no uppercase (BUG!)', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidPassword.noUppercase);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Please, provide valid data' })).toBeVisible();
        });
        test('Password no lowercase', async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(validCredentials.username);
            await page.locator('#passwordOnRegister').fill(invalidPassword.noLowercase);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Password should contain at least one character in lower case' })).toBeVisible();
        });
        test.afterEach(async ({ page }) => {
            await page.locator('#backOnRegister').click();
        });
    });
});
