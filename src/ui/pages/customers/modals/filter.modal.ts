import { expect } from "@playwright/test";
import { Modal } from "./modal.page";

export class FilterModal extends Modal {
  readonly applyButton = this.modalContainer.getByRole('button', { name: 'Apply' });
  readonly clearFiltersButton = this.modalContainer.getByRole('button', { name: 'Clear Filters' });

  readonly checkbox = (name: string) => this.modalContainer.locator(`input[value="${name}"]`);

  readonly uniqueElement = this.clearFiltersButton;

  async checkFilters(...value: string[]) {
    for (const v of value) {
      await this.checkbox(v).check();
    }
  }

  async clickApply() {
    await this.applyButton.click();
  }

  async clickClearFilters() {
    await this.clearFiltersButton.click();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.uniqueElement).not.toBeVisible();
  }
}