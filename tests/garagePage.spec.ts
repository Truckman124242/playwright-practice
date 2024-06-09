import { test } from "@playwright/test";
import { GaragePage } from "../page-objects/pages/garagePage";
import { SignInForm } from "../page-objects/forms/signInForm";
import { correctEmail, correctPassword } from "../test-data/credentials";

let signInForm: SignInForm;
let garagePage: GaragePage;

test.beforeEach(async ({ page }) => {
  signInForm = new SignInForm(page);
  garagePage = new GaragePage(page);
  await signInForm.page.goto("/");
  await signInForm.clickOnButton(signInForm.signInButton);
  await signInForm.fillCorrectSignInCredentials(correctEmail, correctPassword);
  await signInForm.clickOnButton(signInForm.loginAccountButton);
});

test.describe("Garage page elements tests", () => {
  test("Add car button is visible", async ({ page }) => {
    await garagePage.checkAddCarButtonVisibility();
  });

  test("Garage page is empty", async ({ page }) => {
    await garagePage.emptyGarageMessageAppears();
  });

  test("Brand amount is correct", async ({ page }) => {
    await garagePage.openingAddCarModal();
    await garagePage.checkBrandAmount(5);
  });

  test("Models amount is correct", async ({ page }) => {
    await garagePage.openingAddCarModal();
    await garagePage.checkModelAmount(5);
  });

  test("Error message about incorrect mileage amount appears", async ({
    page,
  }) => {
    await garagePage.openingAddCarModal();
    await garagePage.addingCarMileage("99999999");
    await garagePage.mileageErrorMessageAppears();
  });
});

test.describe("Add car tests", () => {
  test("new car is added", async ({ page }) => {
    await garagePage.openingAddCarModal();
    await garagePage.addingCarMileage("3550");
    await garagePage.addingTheNewCar();
  });

  test("Only one car is present", async ({ page }) => {
    await garagePage.specificCarAmountIsAdded(1);
  });
});

test.describe("Update car tests", () => {
  test("Mileage is updated for the car", async ({ page }) => {
    await garagePage.updateCarMileage("4500");
  });

  test("Fuel expenses are added for first car", async ({ page }) => {
    await garagePage.openCarExpenseModal();
    await garagePage.addingLittersForCar("260");
    await garagePage.addingTotalCostForCar("252570");
    await garagePage.addingAnExpense();
  });

  test("Change created date for car", async ({ page }) => {
    await garagePage.openingEditCarModal();
    await garagePage.changingCarCreatedDate("15.03.2022");
  });

  test("Remove car", async ({ page }) => {
    await garagePage.openingEditCarModal();
    await garagePage.removingTheCar();
  });
});
