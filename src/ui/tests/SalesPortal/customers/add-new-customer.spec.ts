import test, { expect } from "@playwright/test";
import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from "../../../../config/environment";
import { generateCustomerData } from "../../../../data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "../../../../data/notifications.data";
import { SignInPage, HomePage, CustomersPage, AddNewCustomerPage, SideMenuComponent } from "../../../pages";

test.describe('[UI] [Sales Portal] [Customers]', () => {
  test('Should create customer with valid data', async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);
    const sideMenu = new SideMenuComponent(page);

    await page.goto(SALES_PORTAL_URL);
    await signInPage.fillCredentials({ username: USER_LOGIN, password: USER_PASSWORD });
    await signInPage.clickLogin();

    await homePage.waitForOpened();
    await sideMenu.clickMenuItem('Customers');
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    const actualCustomer = (await customersPage.getTableData())[0];
    const expectedCustomer = {
      email: data.email,
      name: data.name,
      country: data.country,
    };
    expect(actualCustomer).toMatchObject(expectedCustomer);
  });
});

