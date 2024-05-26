import { test } from "@playwright/test";
import { SignUpForm } from "../page-objects/forms/signUpForm";
import { SignInForm } from "../page-objects/forms/signInForm";
import { GaragePage } from "../page-objects/pages/garagePage";
import { SettingsPage } from "../page-objects/pages/settingsPage";
import {
  correctName,
  shortName,
  incorrectName,
  correctLastName,
  shortLastName,
  incorrectLastName,
  correctEmail,
  incorrectEmail,
  correctPassword,
  incorrectPassword,
  notMatchingPassword,
} from "../test-data/credentials";

let signUpForm: SignUpForm;
let signInForm: SignInForm;
let garagePage: GaragePage;
let settingsPage: SettingsPage;

test.beforeEach(async ({ page }) => {
  signUpForm = new SignUpForm(page);
  signInForm = new SignInForm(page);
  garagePage = new GaragePage(page);
  settingsPage = new SettingsPage(page);
  await signUpForm.page.goto("/");
  await signUpForm.clickOnButton(signUpForm.signUpButton);
});

test.describe("Name field tests", () => {
  test("Name required message appears for empty Name field", async ({
    page,
  }) => {
    await signUpForm.triggerBlurForField(signUpForm.NameField);
    await signUpForm.checkAlertVisibility(signUpForm.nameRequiredAlert);
  });
  test("Invalid name message appears when entering invalid Name value", async ({
    page,
  }) => {
    await signUpForm.fillSignUpField(signUpForm.NameField, incorrectName);
    await signUpForm.triggerBlurForField(signUpForm.NameField);
    await signUpForm.checkAlertVisibility(signUpForm.nameNotValidAlert);
  });
  test("Name length message appears when entering 1 character for Name field", async ({
    page,
  }) => {
    await signUpForm.fillSignUpField(signUpForm.NameField, shortName);
    await signUpForm.triggerBlurForField(signUpForm.NameField);
    await signUpForm.checkAlertVisibility(signUpForm.nameLengthAlert);
  });
  test("Name field border color is red", async ({ page }) => {
    await signUpForm.triggerBlurForField(signUpForm.NameField);
    await signUpForm.checkElementBorderColor(signUpForm.nameRequiredAlert);
  });
});

test.describe("Last Name field tests", () => {
  test("Last Name required message appears for empty Last Name field", async ({
    page,
  }) => {
    await signUpForm.triggerBlurForField(signUpForm.lastNameField);
    await signUpForm.checkAlertVisibility(signUpForm.lastNameRequiredAlert);
  });
  test("Last Name is invalid message appears when entering invalid Last Name value", async ({
    page,
  }) => {
    await signUpForm.fillSignUpField(
      signUpForm.lastNameField,
      incorrectLastName
    );
    await signUpForm.triggerBlurForField(signUpForm.lastNameField);
    await signUpForm.checkAlertVisibility(signUpForm.lastNameInvalidAlert);
  });
  test("Last Name length message appears when entering 1 character for Last Name field", async ({
    page,
  }) => {
    await signUpForm.fillSignUpField(signUpForm.lastNameField, shortLastName);
    await signUpForm.triggerBlurForField(signUpForm.lastNameField);
    await signUpForm.checkAlertVisibility(signUpForm.lastNameLengthAlert);
  });

  test("Last Name field border color is red", async ({ page }) => {
    await signUpForm.triggerBlurForField(signUpForm.lastNameField);
    await signUpForm.checkElementBorderColor(signUpForm.lastNameRequiredAlert);
  });
});

test.describe("Email field tests", () => {
  test("Email required message appears for empty Email field", async ({
    page,
  }) => {
    await signUpForm.triggerBlurForField(signUpForm.emailField);
    await signUpForm.checkAlertVisibility(signUpForm.emailRequiredAlert);
  });
  test("Email is incorrect message appears when entering invalid Email value", async ({
    page,
  }) => {
    await signUpForm.fillSignUpField(signUpForm.emailField, incorrectEmail);
    await signUpForm.triggerBlurForField(signUpForm.emailField);
    await signUpForm.checkAlertVisibility(signUpForm.emailIncorrectAlert);
  });
  test("Email field border color is red", async ({ page }) => {
    await signUpForm.triggerBlurForField(signUpForm.emailField);
    await signUpForm.checkElementBorderColor(signUpForm.emailRequiredAlert);
  });
});

test.describe("Password field tests", () => {
  test("Password required message appears for empty Password field", async ({
    page,
  }) => {
    await signUpForm.triggerBlurForField(signUpForm.passwordField);
    await signUpForm.checkAlertVisibility(signUpForm.passwordRequiredAlert);
  });
  test("Message about wrong data appears for Password field", async ({
    page,
  }) => {
    await signUpForm.fillSignUpField(
      signUpForm.passwordField,
      incorrectPassword
    );
    await signUpForm.triggerBlurForField(signUpForm.passwordField);
    await signUpForm.checkAlertVisibility(signUpForm.passwordIncorrectAlert);
  });
  test("Password field border color is red", async ({ page }) => {
    await signUpForm.triggerBlurForField(signUpForm.passwordField);
    await signUpForm.checkElementBorderColor(signUpForm.passwordRequiredAlert);
  });
});

test.describe("Re-enter Password field tests", () => {
  test("Message about passwords not matching appears for Re-enter Password field", async ({
    page,
  }) => {
    await signUpForm.fillSignUpField(signUpForm.passwordField, correctPassword);
    await signUpForm.fillSignUpField(
      signUpForm.repeatPasswordField,
      notMatchingPassword
    );
    await signUpForm.triggerBlurForField(signUpForm.repeatPasswordField);
    await signUpForm.checkAlertVisibility(signUpForm.passwordsMismatchAlert);
  });
  test("Re-enter Password required message appears for empty Re-enter Password field", async ({
    page,
  }) => {
    await signUpForm.triggerBlurForField(signUpForm.repeatPasswordField);
    await signUpForm.checkAlertVisibility(
      signUpForm.repeatPasswordRequiredAlert
    );
  });
  test("Re-enter Password field border color is red", async ({ page }) => {
    await signUpForm.triggerBlurForField(signUpForm.repeatPasswordField);
    await signUpForm.checkElementBorderColor(
      signUpForm.repeatPasswordRequiredAlert
    );
  });
});

test.describe("Register button tests", () => {
  test("Register button is disabled", async ({ page }) => {
    await signUpForm.checkIfButtonIsDisabled(signUpForm.registerButton);
  });
  test("Register button is enabled", async ({ page }) => {
    await signUpForm.fillCorrectSignUpCredentials(
      correctName,
      correctLastName,
      correctEmail,
      correctPassword
    );
    await signUpForm.checkIfButtonIsEnabled(signUpForm.registerButton);
  });
});

test.describe("Registration tests", () => {
  test("User is being successfully registered", async ({ page }) => {
    await signUpForm.fillCorrectSignUpCredentials(
      correctName,
      correctLastName,
      correctEmail,
      correctPassword
    );
    await signUpForm.clickOnButton(signUpForm.registerButton);
    await garagePage.checkGaragePageVisibility();
  });
  test("Error message appears when signing up as user with already existing email", async ({
    page,
  }) => {
    await signUpForm.fillCorrectSignUpCredentials(
      correctName,
      correctLastName,
      correctEmail,
      correctPassword
    );
    await signUpForm.clickOnButton(signUpForm.registerButton);
    await signUpForm.checkAlertVisibility(signUpForm.existingUserAlert);
  });

  test.describe("Account deletion test", () => {
    test("User account is being removed", async ({ page }) => {
      await signUpForm.clickOnButton(signUpForm.closeButton);
      await signInForm.clickOnButton(signInForm.signInButton);
      await signInForm.fillCorrectSignInCredentials(correctEmail, correctPassword);
      await signInForm.clickOnButton(signInForm.loginAccountButton);
      await settingsPage.removeTheUserAccount();
    });

    // test("User account is being removed", async ({ page }) => {
    //   await signUpForm.closeSignupForm();
    //   await signInForm.openSignInForm();
    //   await signInForm.fillCorrectSignInCredentials(correctEmail, correctPassword);
    //   await signInForm.clickOnSignInButton();
    //   await settingsPage.removeTheUserAccount();
    // });

  });
});
