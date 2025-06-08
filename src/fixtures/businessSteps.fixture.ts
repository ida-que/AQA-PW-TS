import { USER_LOGIN, USER_PASSWORD } from "../config/environment";
import { generateCustomerData } from "../data/customers/generateCustomer.data";
import { ICustomer } from "../types/customer.types";
import { test as base, expect } from "../fixtures/pages.fixture";
import { SignInPage } from "../ui/pages/signIn.page";


interface IBusinessSteps {
  loginAsLocalUser(): Promise<void>;
  createNewCustomer(params?: Partial<ICustomer>): Promise<ICustomer>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ homePage, signInPage }, use) => {
    await use(async () => {
      await signInPage.openPortal();
      await signInPage.fillCredentials({ username: USER_LOGIN, password: USER_PASSWORD });
      await signInPage.clickLogin();
      await homePage.waitForOpened();
    });
  },

createNewCustomer: async ({ addNewCustomerPage, customersPage, sideMenu }, use) => {
    await use(async (params?: Partial<ICustomer>) => {
      await sideMenu.clickMenuItem('Customers');
      await customersPage.waitForOpened();
      await customersPage.clickAddNewCustomer();
      await addNewCustomerPage.waitForOpened();
      const data = generateCustomerData(params);
      await addNewCustomerPage.fillInputs(data);
      await addNewCustomerPage.clickSaveNewCustomer();
      await customersPage.waitForOpened();
      expect(await customersPage.isCustomerInTable(data.email), 'Created customer should be in table').toBeTruthy();
      return data;
    });
  },
});

export { expect } from "@playwright/test";