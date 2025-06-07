import { ICredentials } from '../../types';
import { SalesPortalPage } from './salesPortal.page';

export class SignInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator('#emailinput');
  readonly passwordInput = this.page.locator('#passwordinput');
  readonly loginBtn = this.page.getByRole('button', { name: 'Login' });
  readonly uniqueElement = this.loginBtn;
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }


  async fillCredentials({ email, password }: ICredentials) {
    await this.fillEmail(email);
    await this.fillPassword(password);
  }
  async clickLogin() {
    await this.loginBtn.click();
  }
}
