import {test, expect} from "@playwright/test"
import { ProductPage } from "../pages/ProductPage"
import { ProductDetailsPage } from "../pages/ProductDetailsPage";

test.describe("Shopping Cart", () => {

    let productPage: ProductPage;
    let productDetailsPage: ProductDetailsPage;

    test.beforeEach(async ({page}) => {
        productPage = new ProductPage(page);
        productDetailsPage = new ProductDetailsPage(page);
        productPage.blockAds();
    })

    test("Adding a product to the shopping cart", async ({page}) => {
        await productPage.navigate();
        await productPage.acceptCookies();
        await productPage.viewProductDetails();
        await productDetailsPage.inputQuantityProductAndAddtoCart("5")
    })
})