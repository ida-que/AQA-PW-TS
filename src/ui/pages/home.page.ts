import { SalesPortalPage } from "./salesPortal.page";

export class HomePage extends SalesPortalPage {
    title = this.page.locator('.welcome-text');

    uniqueElement = this.title;

}
