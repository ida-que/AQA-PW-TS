import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
    rememberMeCheckbox = this.page.getByRole('checkbox', { name: 'Remember me' });
    customersButton = this.page.getByRole('link', { name: 'Customer' });
    emailInput = this.page.locator("#emailinput");
    passwordInput = this.page.locator("#passwordinput");
    loginButton = this.page.getByRole('button', { name: 'Login' });

    uniqueElement = this.rememberMeCheckbox;

    async fillCredentials(email: string, password: string) {
        await this.emailInput.fill(`${email}`);
        await this.passwordInput.fill(`${password}`);
    }
    async clickOnLoginButton() {
        await this.loginButton.click();
    }
}
