import { Locator } from "@playwright/test";
import { COUNTRIES } from "../../../data/customers/countries.data";
import { TCustomerInTable } from "../../../types";
import { SalesPortalPage } from "../salesPortal.page";
import { DeleteCustomerModal } from "./modals/customers/deleteCustomer.modal";
import { FilterModal } from "./modals/filter.modal";


export class CustomersPage extends SalesPortalPage {
  //Modals/dialogs
  readonly filterModal = new FilterModal(this.page);
  readonly deleteCustomerModal = new DeleteCustomerModal(this.page);
  // Headers in menu
  readonly addNewCustomerButton = this.page.getByRole("button", { name: "Add Customer" });
  readonly filterButton = this.page.getByRole("button", { name: "Filter" });
  readonly searchInput = this.page.locator('input[type="search"]');
  readonly searchButton = this.page.locator('#search-customer');
  readonly chipButton = this.page.locator('.chip');
  readonly searchChipButton = this.page.locator('div[data-chip-customers="search"]');

  // Table headers
  readonly tableHeader = this.page.locator("#table-customers th div");
  readonly emailHeader = this.tableHeader.filter({ hasText: "Email" });
  readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  readonly countryHeader = this.tableHeader.filter({ hasText: "Country" });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });

  // Table body
  readonly tableRow = this.page.locator("#table-customers tbody tr");
  readonly tableRowByEmail = (email: string) => this.tableRow.filter({ has: this.page.getByText(email) });

  readonly emailCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(1);
  readonly nameCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(2);
  readonly countryCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(3);
  readonly createdOnCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(4);
  readonly editButton = (email: string) => this.tableRowByEmail(email).getByTitle("Edit");
  readonly detailsButton = (email: string) => this.tableRowByEmail(email).getByTitle("Details");
  readonly deleteButton = (email: string) => this.tableRowByEmail(email).getByTitle("Delete");
  readonly emptyTableRow = this.page.locator('td.fs-italic');

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async clickDeleteCustomer(customerEmail: string) {
    await this.deleteButton(customerEmail).click();
  }

  async clickFilter() {
    await this.filterButton.click();
  }

  async clickTableAction(customerEmail: string, action: "edit" | "details" | "delete") {
    const buttons = {
      edit: this.editButton(customerEmail),
      details: this.detailsButton(customerEmail),
      delete: this.deleteButton(customerEmail),
    };

    await buttons[action].click();
  }

  async getCustomerData(customerEmail: string): Promise<TCustomerInTable> {
    //variant 1
    // return {
    //   email: await this.emailCell(email).textContent(),
    //   name: await this.nameCell(email).textContent(),
    //   country: await this.countryCell(email).textContent(),
    //   createdOn: await this.createdOnCell(email).textContent(),
    // };

    //variant 2
    // const [email, name, country, createdOn] = await Promise.all([
    //   this.emailCell(customerEmail).textContent(),
    //   this.nameCell(customerEmail).textContent(),
    //   this.countryCell(customerEmail).textContent(),
    //   this.createdOnCell(customerEmail).textContent(),
    // ]);
    // return { email, name, country, createdOn };

    //variant 3
    const [email, name, country, createdOn] = await this.tableRowByEmail(customerEmail).locator("td").allInnerTexts();
    return {
      email,
      name,
      country: country as COUNTRIES,
      //createdOn
    };
  }

  async getTableData() {
    const tableData: Array<TCustomerInTable> = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [email, name, country, createdOn] = await row.locator("td").allInnerTexts();
      tableData.push({
        email,
        name,
        country: country as COUNTRIES,
        //createdOn
      });
    }
    return tableData;
  }

  async isCustomerInTable(customerEmail: string): Promise<boolean> {
    return (await this.tableRowByEmail(customerEmail).count()) > 0;
  }

  async fillSearch(value: string | number) {
    await this.searchInput.fill(String(value));
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async search(value: string | number) {
    await this.fillSearch(value);
    await this.clickSearch();
    await this.waitForOpened();
  }

}