// Open the URL https://anatoly-karpovich.github.io/aqa-course-project/#/
// At this point:
// Enter the login credentials: username / password (given), and at this point:
// Wait for the spinners disappear
// Verify if the user Anatoly is logged in the system
// Verify (by the screenshot) the side nav panel with 'Home' page selected

import {test, expect} from '@playwright/test';
test('Login with valid credentials', async ({ page }) => {
 await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/#/');

 const emailTextField = page.getByRole('textbox', { name: 'Email address *' });
 const passwordTextField = page.getByRole('textbox', { name: 'Password *' });
 const loginButton = page.getByRole('button', { name: 'Login' });
 const spinnerLogin = page.getByRole('status');
 const firstName = 'Anatoly';
 const username = page.getByRole('link', { name: `${firstName}` });
 const homePage = page.locator('a[name="Home"].active');

 await emailTextField.fill('test@gmail.com');
 await passwordTextField.fill('12345678');
 await loginButton.click();
 await spinnerLogin.waitFor({ state: 'hidden' });
 await expect (username).toBeVisible();
 await expect(homePage).toHaveScreenshot();
});
