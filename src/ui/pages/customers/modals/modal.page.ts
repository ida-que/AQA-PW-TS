import { expect } from "@playwright/test";
import { SalesPortalPage } from "../../salesPortal.page";

export abstract class Modal extends SalesPortalPage {
  readonly modalContainer = this.page.locator(`div[role="dialog"]`);
  readonly title = this.modalContainer.locator('.modal-title');
  readonly closeButton = this.modalContainer.locator('button[aria-label="Close"]');

  async close() {
    await this.closeButton.click();
    await this.waitForClosed();
  }
  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }
}