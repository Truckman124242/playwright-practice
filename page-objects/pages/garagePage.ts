import { expect, type Locator, type Page } from "@playwright/test";

export class GaragePage {
  readonly page: Page;
  readonly garageTitle: Locator;

  constructor(page: Page) {
    this.garageTitle = page.locator(".panel-page_heading").getByText("Garage");
  }

  async checkGaragePageVisibility() {
    await expect(this.garageTitle).toBeVisible();
  }
}
