import { Locator } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";
import { ICustomer, TCustomerInTable } from "../../../types/customer.types";

export class CustomersPage extends SalesPortalPage {
    addNewCustomerButton = this.page.getByRole('button', { name: 'Add Customer' });
    tableHeader = this.page.locator('#table-customers th div');
    emailHeader = this.tableHeader.filter({ hasText: 'Email' });
    nameHeader = this.tableHeader.filter({ hasText: 'Name' });
    countryHeader = this.tableHeader.filter({ hasText: 'Country' });
    tableRow = this.page.locator('#table-customers tbody tr');
    tableRowByEmail = (email: string) => this.tableRow.filter({ has: this.page.getByText(email) });
    emailCell = (email: string) => this.tableRowByEmail(email).locator('td').nth(1);
    nameCell = (email: string) => this.tableRowByEmail(email).locator('td').nth(2);
    countryCell = (email: string) => this.tableRowByEmail(email).locator('td').nth(3);
    uniqueElement = this.addNewCustomerButton;

    async clickAddNewCustomer() {
        await this.addNewCustomerButton.click();
    }

    async getInfoCreatedCustomer(customerEmail: string): Promise<TCustomerInTable> {
        const [email, name, country] = await this.tableRowByEmail(customerEmail).locator('td').allInnerTexts();
        return {
            email,
            name,
            country: country as ICustomer['country'],
        }
      };
    }

