import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from "../config/environment";
import { generateCustomerData } from "../data/customers/generateCustomer.data";
import { ICustomer } from "../types/customer.types";
import { test as base, expect } from "../fixtures/pages.fixture";


interface IBusinessSteps {
  loginAsLocalUser(): Promise<void>;
  createNewCustomer(params?: Partial<ICustomer>): Promise<ICustomer>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ page, homePage }, use) => {
    await use(async () => {
      await page.goto(SALES_PORTAL_URL);
      await page.locator("#emailinput").fill(USER_LOGIN);
      await page.locator("#passwordinput").fill(USER_PASSWORD);
      await page.getByRole("button", { name: "Login" }).click();
      await homePage.waitForOpened();
    });
  },

createNewCustomer: async ({ homePage, addNewCustomerPage, customersPage }, use) => {
    await use(async (params?: Partial<ICustomer>) => {
      await homePage.clickModuleButton('Customers');
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