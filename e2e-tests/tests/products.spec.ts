import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe("Product Search", () => {

    let productPage: ProductPage;

    test.beforeEach(async ({page}) => {
        productPage = new ProductPage(page);
        await productPage.blockAds();
    })

    test("Successful product search using keywords", async ({page}) => {
        await productPage.navigate();
        await productPage.acceptCookies();
        await productPage.searchProduct("dress")
        const results = page
        await expect(productPage.productCards.first()).toBeVisible();
    })

    })