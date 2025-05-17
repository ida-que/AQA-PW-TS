// Task 1.
// Write a smoke test suite with negative tests for registration at the site https://anatoly-karpovich.github.io/demo-login-form/ using DDT approach.
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
// Additionally, write negative tests for the login.

import test, { expect } from '@playwright/test';

interface IRegistrationTestData {
    testName: string;
    username: string;
    password: string;
    message: string;
}
const validCredentialsRegistration = {
    username: `ida-que${Date.now()}`,
    password: 'youShallPass',
}

const registrationInvalidTestData: IRegistrationTestData[] = [
    {
        testName: 'Empty username',
        username: '',
        password: validCredentialsRegistration.password,
        message: 'Username is required',
    },
    {
        testName: 'Username all spaces',
        username: '   ',
        password: validCredentialsRegistration.password,
        message: 'Prefix and postfix spaces are not allowed is username',
    },
    {
        testName: 'Username prefix spaces (BUG - misspelling!)',
        username: '   username',
        password: validCredentialsRegistration.password,
        message: 'Prefix and postfix spaces are not allowed in username',
    },
    {
        testName: 'Username postfix spaces (BUG - misspelling!)',
        username: 'username   ',
        password: validCredentialsRegistration.password,
        message: 'Prefix and postfix spaces are not allowed in username',
    },
    {
        testName: 'Username less chars',
        username: 'us',
        password: validCredentialsRegistration.password,        
        message: 'Username should contain at least 3 characters',
    },    
    {
        testName: 'Password all spaces',
        username: validCredentialsRegistration.username,
        password: '   ',
        message: 'Password is required',
    },
    {
        testName: 'Password prefix spaces (BUG - validation missing!)',
        username: validCredentialsRegistration.username,
        password: '   password',
        message: 'Prefix and postfix spaces are not allowed in password',
    },
    {
        testName: 'Password postfix spaces (BUG - validation missing!)',
        username: validCredentialsRegistration.username,
        password: 'password   ',
        message: 'Prefix and postfix spaces are not allowed in password',
    },
    {
        testName: 'Password less chars',        
        username: validCredentialsRegistration.username,
        password: 'pass',
        message: 'Password should contain at least 8 characters',
    },
    {
        testName: 'Password no uppercase (BUG - validation missing!)',
        username: validCredentialsRegistration.username,
        password: 'passwordpassword',
        message: 'Password should contain at least one character in upper case',
    },
    {
        testName: 'Password no lowercase',
        username: validCredentialsRegistration.username,
        password: 'PASSWORD123',
        message: 'Password should contain at least one character in lower case',
    },
];

test.describe('[UI] [Demo Login Form] [Registration] Negative scenarios', () => {
    registrationInvalidTestData.forEach(({ testName, username, password, message }) => {
        test(testName, async ({ page }) => {
            await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
            await page.locator('#registerOnLogin').click();
            await page.locator('#userNameOnRegister').fill(username);
            await page.locator('#passwordOnRegister').fill(password);
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.locator('#errorMessageOnRegister')).toHaveText(message);
        });
    });  
});

interface ILoginTestData {
    testName: string;
    username: string;
    password: string;
    message: string;
}
const loginInvalidTestData: ILoginTestData[] = [
    {
        testName: 'Empty username',
        username: '',
        password: validCredentialsRegistration.password,
        message: 'Username is required',
    },
    {
        testName: 'Empty password',
        username: validCredentialsRegistration.username,
        password: '',
        message: 'Password is required',
    },
    {
        testName: 'No credentials',
        username: '',
        password: '',
        message: 'Credentials are required',
    },
    {
        testName: 'Invalid credentials',        
        username: validCredentialsRegistration.username,
        password: validCredentialsRegistration.password,
        message: 'Invalid credentials',
    }
];

test.describe('[UI] [Demo Login Form] [Login] Negative scenarios', () => {
    loginInvalidTestData.forEach(({ testName, username, password, message }) => {
        test(testName, async ({ page }) => {
            await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
            await page.locator('#userName').fill(username);
            await page.locator('#password').fill(password);
            await page.getByRole('button', { name: 'Submit' }).click();
            await expect(page.locator('#errorMessage')).toHaveText(message);
        });
    });  
});