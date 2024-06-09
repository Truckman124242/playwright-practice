import { expect, type Locator, type Page, test } from "@playwright/test";

export class GaragePage {
  readonly page: Page;
  readonly garageTitle: Locator;
  readonly addCarButton: Locator;
  readonly noCarsMessage: Locator;
  readonly addCarModal: Locator;
  readonly brandField: Locator;
  readonly carBrandField: Locator;
  readonly carModelField: Locator;
  readonly carMileageField: Locator;
  readonly addButton: Locator;
  readonly mileageErrorMessage: Locator;
  readonly updateMileageField: Locator;
  readonly updateMileageButton: Locator;
  readonly updateMileageMessage: Locator;
  readonly addCarExpenseButton: Locator;
  readonly carExpenseModal: Locator;
  readonly litersNumberField: Locator;
  readonly totalCostField: Locator;
  readonly addedExpenseMessage: Locator;
  readonly editCarButton: Locator;
  readonly editCarModal: Locator;
  readonly createdAtField: Locator;
  readonly removeCarButton: Locator;
  readonly confirmCarRemoveButton: Locator;
  readonly carRemoveSuccessMessage: Locator;
  readonly addedCarMessage: Locator;
  readonly updatedCarMessage: Locator;
  readonly saveChangesButton: Locator;
 


  constructor(page: Page) {
    this.page = page;
    this.garageTitle = page.locator(".panel-page_heading").getByText("Garage");
    this.addCarButton = page.getByRole("button", { name: "Add car" });
    this.noCarsMessage = page
      .locator(".h3")
      .getByText("You don’t have any cars in your garage");
    this.carMileageField = page.locator("#addCarMileage");
    this.addCarModal = page.locator(".modal-title").getByText("Add a car");
    this.addButton = page.getByRole("button", { name: "Add" });
    this.addedCarMessage = page.getByText("Car added");
    this.carBrandField = page.locator(".form-control#addCarBrand");
    this.carModelField = page.locator("#addCarModel");
    this.mileageErrorMessage = page
      .locator(".invalid-feedback")
      .getByText("Mileage has to be from 0 to 999999");
    this.updateMileageField = page.locator(".update-mileage-form_input");
    this.updateMileageButton = page.locator(".update-mileage-form_submit");
    this.updateMileageMessage = page.getByText("Mileage updated");
    this.addCarExpenseButton = page.locator(".car_add-expense");
    this.carExpenseModal = page
      .locator(".modal-title")
      .getByText("Add an expense");
    this.litersNumberField = page.locator("#addExpenseLiters");
    this.totalCostField = page.locator("#addExpenseTotalCost");
    this.addedExpenseMessage = page.getByText("Fuel expense added");
    this.editCarButton = page.locator(".icon-edit");
    this.editCarModal = page.locator(".modal-content").getByText("Edit a car");
    this.createdAtField = page.locator("#carCreationDate");
    this.removeCarButton = page.locator(".btn").getByText("Remove car");
    this.confirmCarRemoveButton = page.getByRole('button', { name: 'Remove' })
    this.carRemoveSuccessMessage = page.getByText("Car removed");
    this.updatedCarMessage = page.getByText("Car updated");
    this.saveChangesButton = page.getByRole("button", { name: "Save" });
  }

  async checkGaragePageVisibility() {
    await expect(this.garageTitle).toBeVisible();
  }

  async checkAddCarButtonVisibility() {
    await expect(this.addCarButton).toBeVisible();
  }

  async emptyGarageMessageAppears() {
    await expect(this.noCarsMessage).toBeVisible();
  }

  async openingAddCarModal() {
    await this.addCarButton.click();
    await expect(this.addCarModal).toBeVisible();
  }

  async checkBrandAmount(brandAmount: number) {
    await this.carBrandField.click();
    const cardBrandOptionsCount = await this.page.locator(
      "select[name='carBrandId'] option[value]"
    );
    await expect(cardBrandOptionsCount).toHaveCount(brandAmount);
  }

  async checkModelAmount(modelAmount: number) {
    await this.carModelField.click();
    const cardModelOptionsCount = await this.page.locator(
      "select[name='carModelId'] option[value]"
    );
    await expect(cardModelOptionsCount).toHaveCount(modelAmount);
  }

  async addingCarMileage(mileageAmount: string) {
    await this.carMileageField.fill(mileageAmount);
  }

  async addingTheNewCar() {
    await expect(this.addButton).toBeVisible();
    await this.addButton.click();
    await expect(this.addedCarMessage).toBeVisible();
  }

  async mileageErrorMessageAppears() {
    await this.carMileageField.blur();
    await expect(this.mileageErrorMessage).toBeVisible();
  }

  async specificCarAmountIsAdded(carCount: number) {
    await expect(this.editCarButton).toHaveCount(carCount);
  }

  async updateCarMileage(mileageAmount: string) {
    await this.updateMileageField.fill(mileageAmount);
    await this.updateMileageButton.click();
    await expect(this.updateMileageMessage).toBeVisible();
  }

  async openCarExpenseModal() {
    await this.addCarExpenseButton.click();
    await expect(this.carExpenseModal).toBeVisible();
  }

  async addingLittersForCar(litters: string) {
    await this.litersNumberField.fill(litters);
  }

  async addingTotalCostForCar(totalCost: string) {
    await this.totalCostField.fill(totalCost);
  }

  async addingAnExpense() {
    await this.addButton.click();
    await expect(this.addedExpenseMessage).toBeVisible();
  }

  async openingEditCarModal() {
    await this.editCarButton.click();
    await expect(this.editCarModal).toBeVisible();
  }

  async changingCarCreatedDate(carCreationDate: string) {
    await this.createdAtField.fill(carCreationDate);
    await this.saveChangesButton.click();
    await expect(this.updatedCarMessage).toBeVisible();
  }

  async removingTheCar() {
    await this.removeCarButton.click();
    await this.confirmCarRemoveButton.click();
    await expect(this.carRemoveSuccessMessage).toBeVisible();
  }
}
