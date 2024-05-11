import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Sign up").click();
});

test.describe("Name field tests", () => {
  test("Name required message appears for empty Name field", async ({
    page,
  }) => {
    await page.locator("#signupName").click();
    await page.locator("#signupName").blur();
    const nameRequiredAlert = page.getByText("Name required")
    await expect(nameRequiredAlert).toBeVisible();
  });
  test("Name is invalid message appears when entering invalid Name value", async ({
    page,
  }) => {
    await page.locator("#signupName").fill("1!#");
    await page.locator("#signupName").blur();
    const nameNotValidAlert = page.getByText("Name is invalid")
    await expect(nameNotValidAlert).toBeVisible();
  });
  test("Name length message appears when entering 1 character for Name field", async ({
    page,
  }) => {
    await page.locator("#signupName").click();
    await page.locator("#signupName").fill("A");
    await page.locator("#signupName").blur();
    const nameLengthAlert = page.getByText("Name has to be from 2 to 20 characters long")
    await expect(nameLengthAlert).toBeVisible();
  });
  test("Name field border color is red", async ({ page }) => {
    const nameField = page.locator("#signupName");
    await nameField.click();
    await nameField.blur();
    await expect(nameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
});

test.describe("Last Name field tests", () => {
  test("Last Name required message appears for empty Last Name field", async ({
    page,
  }) => {
    await page.locator("#signupLastName").click();
    await page.locator("#signupLastName").blur();
    const nameRequiredAlert = page.getByText("Last name required")
    await expect(nameRequiredAlert).toBeVisible();
  });
  test("Last Name is invalid message appears when entering invalid Last Name value", async ({
    page,
  }) => {
    await page.locator("#signupLastName").click();
    await page.locator("#signupLastName").fill("1!#");
    await page.locator("#signupLastName").blur();
    const lastNameInvalidAlert = page.getByText("Last name is invalid")
    await expect(lastNameInvalidAlert).toBeVisible();
  });
  test("Last Name length message appears when entering 1 character for Last Name field", async ({
    page,
  }) => {
    await page.locator("#signupLastName").click();
    await page.locator("#signupLastName").fill("A");
    await page.locator("#signupLastName").blur();
    const lastNameLengthAlert = page.getByText("Last name has to be from 2 to 20 characters long")
    await expect(lastNameLengthAlert).toBeVisible();
  });
  test("Last Name field border color is red", async ({ page }) => {
    const lastNameField = page.locator("#signupLastName");
    await lastNameField.click();
    await lastNameField.blur();
    await expect(lastNameField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
});

test.describe("Email field tests", () => {
  test("Email required message appears for empty Email field", async ({
    page,
  }) => {
    await page.locator("#signupEmail").click();
    await page.locator("#signupEmail").blur();
    const emailRequiredAlert = page.getByText("Email required")
    await expect(emailRequiredAlert).toBeVisible();
  });
  test("Email is incorrect message appears when entering invalid Email value", async ({
    page,
  }) => {
    await page.locator("#signupEmail").click();
    await page.locator("#signupEmail").fill("test@mail,com");
    await page.locator("#signupEmail").blur();
    const emailIncorrectAlert = page.getByText("Email is incorrect")
    await expect(emailIncorrectAlert).toBeVisible();
  });
  test("Email field border color is red", async ({ page }) => {
    const emailField = page.locator("#signupEmail");
    await emailField.click();
    await emailField.blur();
    await expect(emailField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
});

test.describe("Password field tests", () => {
  test("Message about wrong data appears for Password field", async ({
    page,
  }) => {
    await page.locator("#signupPassword").fill("TestingOneTwo");
    await page.locator("#signupPassword").blur();
    const passwordIncorrectAlert =  page.getByText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")
    await expect(passwordIncorrectAlert).toBeVisible();
  });
  test("Password required message appears for empty Password field", async ({
    page,
  }) => {
    await page.locator("#signupPassword").click();
    await page.locator("#signupPassword").blur();
    const passwordRequiredAlert = page.getByText("Password required")
    await expect(passwordRequiredAlert).toBeVisible();
  });
  test("Password field border color is red", async ({ page }) => {
    const passwordField = page.locator("#signupPassword")
    await passwordField.click();
    await passwordField.blur();
    await expect(passwordField).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
});

test.describe("Re-enter Password field tests", () => {
  test("Message about passwords not matching appears for Re-enter Password field", async ({
    page,
  }) => {
    await page.locator("#signupPassword").fill("Test!23456");
    await page.locator("#signupRepeatPassword").fill("Test!2345");
    await page.locator("#signupRepeatPassword").blur();
    const notMatchingAlert = page.getByText("Passwords do not match")
    await expect(notMatchingAlert).toBeVisible();
  });
  test("Re-enter Password required message appears for empty Re-enter Password field", async ({
    page,
  }) => {
    await page.locator("#signupRepeatPassword").click();
    await page.locator("#signupRepeatPassword").blur();
    const repeatPasswordRequiredAlert = page.getByText("Re-enter password required")
    await expect(repeatPasswordRequiredAlert).toBeVisible();
  });
  test("Re-enter Password field border color is red", async ({ page }) => {
    const repeatPassword = page.locator("#signupRepeatPassword");
    await repeatPassword.click();
    await repeatPassword.blur();
    await expect(repeatPassword).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
});

test.describe("Register button tests", () => {
  test("Register button is disabled", async ({ page }) => {
    const registerButton = page.locator(".btn").getByText("Register")
    await expect(registerButton).toBeDisabled();
  });
  test("Register button is enabled", async ({ page }) => {
    await page.locator("#signupName").fill("Oleh");
    await page.locator("#signupLastName").fill("Test");
    await page.locator("#signupEmail").fill("oleh+qa1@test.com");
    await page.locator("#signupPassword").fill("Test!23456");
    await page.locator("#signupRepeatPassword").fill("Test!23456");
    const registerButton = page.locator(".btn").getByText("Register")
    await expect(registerButton).toBeEnabled();
  });
});

test.describe("Registration tests", () => {
  test("User with not yet used email is being registered", async ({ page }) => {
    await page.locator("#signupName").fill("Oleh");
    await page.locator("#signupLastName").fill("Test");
    await page.locator("#signupEmail").fill("oleh+aqa32101@test.com");
    await page.locator("#signupPassword").fill("Test!23456");
    await page.locator("#signupRepeatPassword").fill("Test!23456");
    const registerButton = page.locator(".btn").getByText("Register")
    await registerButton.click();
    const garageTitle = page.locator(".panel-page_heading").getByText("Garage")
    await expect(garageTitle).toBeVisible();
  });
  test("Error message appears when signing up as user with already existing within the system email", async ({
    page,
  }) => {
    await page.locator("#signupName").fill("Duplicate");
    await page.locator("#signupLastName").fill("Test");
    await page.locator("#signupEmail").fill("oleh+aqa32101@test.com");
    await page.locator("#signupPassword").fill("Test!23456");
    await page.locator("#signupRepeatPassword").fill("Test!23456");
    const registerButton = page.locator(".btn").getByText("Register")
    await registerButton.click();
    const existingUserAlert = page.locator(".alert").getByText("User already exists")
    await expect(existingUserAlert).toBeVisible();
  });
});
