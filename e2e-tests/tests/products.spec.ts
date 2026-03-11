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
        await expect(productPage.productCards.first()).toBeVisible();
    })

    test("Unsuccessful product search with no results", async ({page}) => {
        await productPage.navigate();
        await productPage.acceptCookies();
        await productPage.searchProduct("no searching result");
        await expect(productPage.productsImages).toHaveCount(0);
    })

    })