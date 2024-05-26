import { type Locator, type Page } from "@playwright/test";
import { SignUpForm } from "./signUpForm";

let signUpForm: SignUpForm;

export class SignInForm {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly signInEmail: Locator;
  readonly signInPassword: Locator;
  readonly loginAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.signInEmail = page.locator("#signinEmail");
    this.signInPassword = page.locator("#signinPassword");
    this.loginAccountButton = page.locator(".btn").getByText("Login");
  }

  async fillCorrectSignInCredentials(email: string, password: string) {
    await this.signInEmail.fill(email);
    await this.signInPassword.fill(password);
  }

  async clickOnButton(button:Locator) {
    await button.click();
  }
}

//   async openSignInForm() {
//     await this.signInButton.click();
//   }

//   async clickOnSignInButton() {
//     await this.loginAccountButton.click();
//   }