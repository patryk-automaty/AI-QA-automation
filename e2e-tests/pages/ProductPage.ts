import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {


    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productCards: Locator;
    readonly productsImages: Locator;
    readonly viewProductButton: Locator;


    constructor(page: Page) {

        super(page)
        this.searchInput = page.locator("#search_product");
        this.searchButton = page.locator("#submit_search");
        this.productCards = page.locator(".features_items");
        this.productsImages = page.locator('.product-image-wrapper');
        this.viewProductButton = page.getByText("View Product");
    }

    async navigate() {
        await this.page.goto("https://www.automationexercise.com/products");
    }

    async searchProduct(produktName: string): Promise<void> {
        await this.searchInput.fill(produktName);
        await this.searchButton.click();
    }

    async viewProductDetails(): Promise<void> {
        await this.viewProductButton.first().click()
    }

}

