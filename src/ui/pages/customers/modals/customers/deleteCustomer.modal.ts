import { Modal } from "./modal.page";

export class DeleteCustomerModal extends Modal {
  readonly deleteButton = this.uniqueElement.getByRole('button', { name: 'Yes, Delete' });
  readonly cancelButton = this.uniqueElement.getByRole('button', { name: 'Cancel' });

  async clickDelete() {
    await this.deleteButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}