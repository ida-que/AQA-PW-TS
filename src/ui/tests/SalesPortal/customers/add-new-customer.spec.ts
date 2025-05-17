import test, { expect, Locator } from "@playwright/test";
import { generateCustomerData } from "../../../../data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "../../../../data/notifications.data";
import { AddNewCustomerPage } from "../../../pages/customers/add-new-customer.page";
import { CustomersPage } from "../../../pages/customers/customers.page";
import { HomePage } from "../../../pages/home.page";
import { SignInPage } from "../../../pages/signIn.page";
import { SALES_PORTAL_URL } from "../../../../config/environment";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("e2e - Should create customer with smoke data, notification and table assertions", async ({ page }) => {
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);
    const signInPage = new SignInPage(page);
    await page.goto(SALES_PORTAL_URL);
    await signInPage.waitForOpened();
    await signInPage.fillCredentials(`${process.env.USER_LOGIN}`, `${process.env.USER_PASSWORD}`);
    await signInPage.clickOnLoginButton();

    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    const createdCustomer = await customersPage.getInfoCreatedCustomer(data.email);
    await expect(createdCustomer.email).toEqual(data.email);
    await expect(createdCustomer.name).toEqual(data.name);
    await expect(createdCustomer.country).toEqual(data.country);
  });
});

