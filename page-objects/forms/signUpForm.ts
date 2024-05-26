import { expect, type Locator, type Page } from "@playwright/test";

export class SignUpForm {
  readonly page: Page;
  readonly signUpButton: Locator;
  readonly NameField: Locator;
  readonly nameRequiredAlert: Locator;
  readonly nameNotValidAlert: Locator;
  readonly nameLengthAlert: Locator;
  readonly lastNameField: Locator;
  readonly lastNameRequiredAlert: Locator;
  readonly lastNameInvalidAlert: Locator;
  readonly lastNameLengthAlert: Locator;
  readonly emailRequiredAlert: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly emailIncorrectAlert: Locator;
  readonly passwordRequiredAlert: Locator;
  readonly passwordIncorrectAlert: Locator;
  readonly repeatPasswordField: Locator;
  readonly passwordsMismatchAlert: Locator;
  readonly repeatPasswordRequiredAlert: Locator;
  readonly registerButton: Locator;
  readonly existingUserAlert: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByLabel("Email");
    this.passwordField = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.signUpButton = page.getByText("Sign up");
    this.NameField = page.locator("#signupName");
    this.nameRequiredAlert = page.getByText("Name required");
    this.nameNotValidAlert = page.getByText("Name is invalid");
    this.nameLengthAlert = page.getByText(
      "Name has to be from 2 to 20 characters long"
    );
    this.lastNameField = page.locator("#signupLastName");
    this.lastNameRequiredAlert = page.getByText("Last name required");
    this.lastNameInvalidAlert = page.getByText("Last name is invalid");
    this.lastNameLengthAlert = page.getByText(
      "Last name has to be from 2 to 20 characters long"
    );
    this.emailRequiredAlert = page.getByText("Email required");
    this.emailField = page.locator("#signupEmail");
    this.emailIncorrectAlert = page.getByText("Email is incorrect");
    this.passwordField = page.locator("#signupPassword");
    this.passwordRequiredAlert = page.getByText("Password required");
    this.passwordIncorrectAlert = page.getByText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    this.repeatPasswordField = page.locator("#signupRepeatPassword");
    this.passwordsMismatchAlert = page.getByText("Passwords do not match");
    this.repeatPasswordRequiredAlert = page.getByText(
      "Re-enter password required"
    );
    this.registerButton = page.locator(".btn").getByText("Register");
    this.closeButton = page.locator(".close");
    this.existingUserAlert = page.getByText("User already exists");
  }

  async triggerBlurForField(interactLocator: Locator) {
    await interactLocator.click();
    await interactLocator.blur();
  }

  async checkAlertVisibility(visibilityLocator: Locator) {
    await expect(visibilityLocator).toBeVisible();
  }

  async checkElementBorderColor(locator: Locator) {
    await expect(locator).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  async fillSignUpField(interactLocator: Locator, nameFieldValue: string) {
    await interactLocator.fill(nameFieldValue);
  }

  async checkIfButtonIsDisabled(button: Locator) {
    await expect(button).toBeDisabled();
  }

  async checkIfButtonIsEnabled(button: Locator) {
    await expect(button).toBeEnabled();
  }

  async fillCorrectSignUpCredentials(
    name: string,
    lastName: string,
    email: string,
    password: string
  ) {
    await this.NameField.fill(name);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.repeatPasswordField.fill(password);
  }
  async clickOnButton(button:Locator) {
    await button.click();
    
//   async clickOnSignUpButton() {
//     await this.registerButton.click();
//   }

//   async closeSignupForm() {
//     await this.closeButton.click();
//   }
  }
}
