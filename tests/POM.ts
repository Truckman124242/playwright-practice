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
  readonly notMatchingAlert: Locator;
  readonly repeatPasswordRequiredAlert: Locator;
  readonly registerButton: Locator;
  readonly garageTitle: Locator;
  readonly existingUserAlert: Locator;
  readonly closeButton: Locator;
  readonly signInEmail: Locator;
  readonly signInButton: Locator;
  readonly signInPassword: Locator;
  readonly loginAccountButton: Locator;
  readonly accountSettingsButton: Locator;
  readonly accountRemoveButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly guestLogInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByLabel("Email");
    this.passwordField = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.signUpButton = page.getByText("Sign up");
    this.NameField = page.locator("#signupName");
    this.nameRequiredAlert = page.getByText("Name required");
    this.nameNotValidAlert = page.getByText("Name is invalid");
    this.nameLengthAlert = page.getByText("Name has to be from 2 to 20 characters long");
    this.lastNameField = page.locator("#signupLastName");
    this.lastNameRequiredAlert = page.getByText("Last name required");
    this.lastNameInvalidAlert = page.getByText("Last name is invalid");
    this.lastNameLengthAlert = page.getByText("Last name has to be from 2 to 20 characters long");
    this.emailRequiredAlert = page.getByText("Email required");
    this.emailField = page.locator("#signupEmail");
    this.emailIncorrectAlert = page.getByText("Email is incorrect");
    this.passwordField = page.locator("#signupPassword");
    this.passwordRequiredAlert = page.getByText("Password required");
    this.passwordIncorrectAlert = page.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    this.repeatPasswordField = page.locator("#signupRepeatPassword");
    this.notMatchingAlert = page.getByText("Passwords do not match");
    this.repeatPasswordRequiredAlert = page.getByText("Re-enter password required");
    this.registerButton = page.locator(".btn").getByText("Register");
    this.garageTitle = page.locator(".panel-page_heading").getByText("Garage");
    this.existingUserAlert = page
      .locator(".alert")
      .getByText("User already exists");
    this.closeButton = page.locator(".close");
    this.signInButton = page.locator('.btn:has-text("Sign In")');
    this.signInEmail = page.locator("#signinEmail");
    this.signInPassword = page.locator("#signinPassword");
    this.loginAccountButton = page.locator(".btn").getByText("Login");
    this.accountSettingsButton = page.getByRole("link", { name: " Settings" });
    this.accountRemoveButton = page.locator(".btn").getByText("Remove");
    this.confirmDeleteButton = page.getByRole("button", { name: "Remove" });
    this.guestLogInButton = page
      .locator(".header-link")
      .getByText("Guest log in");
  }

  async openSignUpForm() {
    await this.page.goto("/");
    await this.signUpButton.click();
  }

  async emptyNameField() {
    await this.NameField.click();
    await this.NameField.blur();
    await expect(this.nameRequiredAlert).toBeVisible();
  }

  async invalidNameField() {
    await this.NameField.fill("1!#");
    await this.NameField.blur();
    await expect(this.nameNotValidAlert).toBeVisible();
  }

  async shortSignupName() {
    await this.NameField.click();
    await this.NameField.fill("A");
    await this.NameField.blur();
    await expect(this.nameLengthAlert).toBeVisible();
  }

  async nameRedBorderColor() {
    await this.NameField.click();
    await this.NameField.blur();
    await expect(this.NameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  async emptyLastNameField() {
    await this.lastNameField.click();
    await this.lastNameField.blur();
    await expect(this.lastNameRequiredAlert).toBeVisible();
  }

  async nameIsInvalid() {
    await this.lastNameField.click();
    await this.lastNameField.fill("1!#");
    await this.lastNameField.blur();
    await expect(this.lastNameInvalidAlert).toBeVisible();
  }

  async shortSignupLastName() {
    await this.lastNameField.click();
    await this.lastNameField.fill("A");
    await this.lastNameField.blur();
    await expect(this.lastNameLengthAlert).toBeVisible();
  }

  async lastNameRedBorderColor() {
    await this.lastNameField.click();
    await this.lastNameField.blur();
    await expect(this.lastNameField).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  }

  async emptyEmailField() {
    await this.emailField.click();
    await this.emailField.blur();
    await expect(this.emailRequiredAlert).toBeVisible();
  }

  async EmailFieldIsInvalid() {
    await this.emailField.click();
    await this.emailField.fill("test@mail,com");
    await this.emailField.blur();
    await expect(this.emailIncorrectAlert).toBeVisible();
  }

  async EmailFieldRedBorderColor() {
    await this.emailField.click();
    await this.emailField.blur();
    await expect(this.emailField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  async emptyPasswordField() {
    await this.passwordField.click();
    await this.passwordField.blur();
    await expect(this.passwordRequiredAlert).toBeVisible();
  }

  async passwordFieldIsInvalid() {
    await this.passwordField.fill("TestingOneTwo");
    await this.passwordField.blur();
    await expect(this.passwordIncorrectAlert).toBeVisible();
  }

  async passwordFieldRedBorderColor() {
    await this.passwordField.click();
    await this.passwordField.blur();
    await expect(this.passwordField).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  }

  async repeatPasswordFieldMismatch() {
    await this.passwordField.fill("Test!23456");
    await this.repeatPasswordField.fill("Test!2345");
    await this.repeatPasswordField.blur();
    await expect(this.notMatchingAlert).toBeVisible();
  }

  async emptyRepeatPasswordField() {
    await this.repeatPasswordField.click();
    await this.repeatPasswordField.blur();
    await expect(this.repeatPasswordRequiredAlert).toBeVisible();
  }

  async repeatPasswordFieldRedBorderColor() {
    await this.repeatPasswordField.click();
    await this.repeatPasswordField.blur();
    await expect(this.repeatPasswordField).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  }

  async disabledRegisterButton() {
    await expect(this.registerButton).toBeDisabled();
  }

  async enabledRegisterButton() {
    await this.NameField.fill("Oleh");
    await this.lastNameField.fill("Test");
    await this.emailField.fill("oleh+qa1@test.com");
    await this.passwordField.fill("Test!23456");
    await this.repeatPasswordField.fill("Test!23456");
    await expect(this.registerButton).toBeEnabled();
  }

  async successfulSignUp() {
    await this.NameField.fill("Oleh");
    await this.lastNameField.fill("Test");
    await this.emailField.fill("oleh+aqa1003012@test.com");
    await this.passwordField.fill("Test!23456");
    await this.repeatPasswordField.fill("Test!23456");
    await this.registerButton.click();
    await expect(this.garageTitle).toBeVisible();
  }

  async unsuccessfulSignUp() {
    await this.NameField.fill("Duplicate");
    await this.lastNameField.fill("Test");
    await this.emailField.fill("oleh+aqa1003012@test.com");
    await this.passwordField.fill("Test!23456");
    await this.repeatPasswordField.fill("Test!23456");
    await this.registerButton.click();
    await expect(this.existingUserAlert).toBeVisible();
  }

  async signIn() {
    await this.closeButton.click();
    await this.page.waitForSelector('.btn:has-text("Sign In")');
    await this.signInButton.click();
    await this.signInEmail.fill("oleh+aqa1003012@test.com");
    await this.signInPassword.fill("Test!23456");
    await this.loginAccountButton.click();
  }

  async removingAccount() {
    await this.accountSettingsButton.click();
    await this.accountRemoveButton.click();
    await this.confirmDeleteButton.click();
    await expect(this.guestLogInButton).toBeVisible();
  }
}
