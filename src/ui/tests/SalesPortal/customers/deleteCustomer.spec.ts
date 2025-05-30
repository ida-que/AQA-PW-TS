import { test, expect } from '../../../../fixtures/businessSteps.fixture';


test.describe('[UI] [Sales Portal] [Customers]', () => {
  test('Should delete created customer, validate absence in the table', async ({ loginAsLocalUser, createNewCustomer, customersPage }) => {
    await loginAsLocalUser();
    const createdCustomer = await createNewCustomer();
    await customersPage.clickTableAction(createdCustomer.email, 'delete');
    await customersPage.deleteCustomerModal.waitForOpened();
    await customersPage.deleteCustomerModal.clickDelete();
    await customersPage.deleteCustomerModal.waitForClosed();
    await customersPage.waitForOpened();
    expect(await customersPage.isCustomerInTable(createdCustomer.email), "Customer shouldn't be in table").toBeFalsy();
  });
});