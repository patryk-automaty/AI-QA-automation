import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {

    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly viewCartLink: Locator;

    constructor(page: Page) {
        super(page);

        this.quantityInput = page.locator("#quantity");
        this.addToCartButton = page.locator("button.cart");
        this.productName = page.locator(".product-information h2");
        this.productPrice = page.locator(".product-information span span")
        this.viewCartLink = page.locator(".modal-body u")
    }

    async inputQuantityProductAndAddtoCart(quantity: string) {
        await this.quantityInput.clear();
        await this.quantityInput.fill(quantity);
        await this.addToCartButton.click();
    }

    async goToCartPage() {
        await this.viewCartLink.click();
    }
}