import { test, expect } from "@playwright/test";
import { SignUpForm } from './POM';

let signUpForm: SignUpForm

test.beforeEach(async ({ page }) => {
  signUpForm = new SignUpForm(page);
  await signUpForm.openSignUpForm();
});

test.describe("Name field tests", () => {
  test("Name required message appears for empty Name field", async ({ page }) => {
    await signUpForm.emptyNameField()
  });
  test("Name is invalid message appears when entering invalid Name value", async ({
    page,
  }) => {
    await signUpForm.invalidNameField()
  });
  test("Name length message appears when entering 1 character for Name field", async ({
    page,
  }) => {
    await signUpForm.shortSignupName()
  });
  test("Name field border color is red", async ({ page }) => {
    await signUpForm.nameRedBorderColor()
  });
});

test.describe("Last Name field tests", () => {
  test("Last Name required message appears for empty Last Name field", async ({
    page,
  }) => {
    await signUpForm.emptyLastNameField()
  });
  test("Last Name is invalid message appears when entering invalid Last Name value", async ({
    page,
  }) => {
    await signUpForm.nameIsInvalid()
  });
  test("Last Name length message appears when entering 1 character for Last Name field", async ({
    page,
  }) => {
    await signUpForm.shortSignupLastName()
  });

  test("Last Name field border color is red", async ({ page }) => {
    await signUpForm.lastNameRedBorderColor()
  });
});

test.describe("Email field tests", () => {
  test("Email required message appears for empty Email field", async ({
    page,
  }) => {
    await signUpForm.emptyEmailField()
  });
  test("Email is incorrect message appears when entering invalid Email value", async ({
    page,
  }) => {
    await signUpForm.EmailFieldIsInvalid()
  });
  test("Email field border color is red", async ({ page }) => {
    await signUpForm.EmailFieldRedBorderColor()
  });
});

test.describe("Password field tests", () => {
  test("Message about wrong data appears for Password field", async ({
    page,
  }) => {
    await signUpForm.passwordFieldIsInvalid()
  });
  test("Password required message appears for empty Password field", async ({
    page,
  }) => {
    await signUpForm.emptyPasswordField()
  });
  test("Password field border color is red", async ({ page }) => {
    await signUpForm.passwordFieldRedBorderColor()
  });
});

test.describe("Re-enter Password field tests", () => {
  test("Message about passwords not matching appears for Re-enter Password field", async ({
    page,
  }) => {
    await signUpForm.repeatPasswordFieldMismatch()
  });
  test("Re-enter Password required message appears for empty Re-enter Password field", async ({
    page,
  }) => {
    await signUpForm.emptyRepeatPasswordField()
  });
  test("Re-enter Password field border color is red", async ({ page }) => {
    await signUpForm.repeatPasswordFieldRedBorderColor ()
  });
});

test.describe("Register button tests", () => {
  test("Register button is disabled", async ({ page }) => {
    await signUpForm.disabledRegisterButton()
  });
  test("Register button is enabled", async ({ page }) => {
    await signUpForm.enabledRegisterButton ()
  });
});

test.describe("Registration tests", () => {

  test("User is being successfully registered", async ({ page }) => {
    await signUpForm.successfulSignUp ()
  });
  test("Error message appears when signing up as user with already existing email", async ({
    page,
  }) => {
    await signUpForm.unsuccessfulSignUp();
  });

  test.describe("Account tests", () => {
    test("User account is being removed", async ({
      page,
    }) => {
      await signUpForm.signIn()
      await signUpForm.removingAccount();
    });
  })

});
