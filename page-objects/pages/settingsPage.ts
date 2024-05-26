import { expect, type Locator, type Page } from "@playwright/test";

export class SettingsPage {
  readonly accountSettingsButton: Locator;
  readonly accountRemoveButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly guestLogInButton: Locator;

  constructor(page: Page) {
    this.accountSettingsButton = page.getByRole("link", { name: " Settings" });
    this.accountRemoveButton = page.locator(".btn").getByText("Remove");
    this.confirmDeleteButton = page.getByRole("button", { name: "Remove" });
    this.guestLogInButton = page
      .locator(".header-link")
      .getByText("Guest log in");
  }

  async removeTheUserAccount() {
    await this.accountSettingsButton.click();
    await this.accountRemoveButton.click();
    await this.confirmDeleteButton.click();
    await expect(this.guestLogInButton).toBeVisible();
  }
}
