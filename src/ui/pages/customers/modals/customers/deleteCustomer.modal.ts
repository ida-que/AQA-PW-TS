import { Modal } from "../modal.page";

export class DeleteCustomerModal extends Modal {
  readonly deleteButton = this.modalContainer.getByRole('button', { name: 'Yes, Delete' });
  readonly cancelButton = this.modalContainer.getByRole('button', { name: 'Cancel' });

  readonly uniqueElement = this.deleteButton;

  async clickDelete() {
    await this.deleteButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}