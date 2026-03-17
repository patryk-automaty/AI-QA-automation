import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {

    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);

        this.quantityInput = page.locator("#quantity");
        this.addToCartButton = page.getByText("Add to cart");

    }

    async inputQuantityProductAndAddtoCart(quantity: string) {
        await this.quantityInput.fill(quantity);
        await this.addToCartButton.click();
    }
}