import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productQuantity: Locator;
    readonly deleteButton: Locator;
    readonly emptyCartInformation: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.locator(".cart_description h4 a");
        this.productPrice = page.locator('.cart_price p');
        this.productQuantity = page.locator('.cart_quantity button');
        this.deleteButton = page.locator(".cart_quantity_delete");
        this.emptyCartInformation = page.locator("#empty_cart")
    }

    async navigate() {
        await this.page.goto("https://www.automationexercise.com/view_cart");
    }

    async removeProduct() {
        await this.deleteButton.click();
    }

}