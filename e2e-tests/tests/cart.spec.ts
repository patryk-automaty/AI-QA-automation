import {test, expect} from "@playwright/test"
import { ProductPage } from "../pages/ProductPage"
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CartPage } from "../pages/CartPage";

test.describe("Shopping Cart", () => {

    let productPage: ProductPage;
    let productDetailsPage: ProductDetailsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({page}) => {
        productPage = new ProductPage(page);
        productDetailsPage = new ProductDetailsPage(page);
        cartPage = new CartPage(page);
        productPage.blockAds();
    })

    test("Adding and checking a product in the shopping cart", async ({page}) => {
    const quantity = "5";
    await productPage.navigate();
    await productPage.acceptCookies();
    await productPage.viewProductDetails();

    const productNameFromDetails = (await productDetailsPage.productName.textContent())?.trim() ?? "";
    const productPriceFromDetails = (await productDetailsPage.productPrice.textContent())?.trim() ?? "";
    
    await productDetailsPage.inputQuantityProductAndAddtoCart(quantity);
    await productDetailsPage.goToCartPage();

    await expect(cartPage.productName).toHaveText(productNameFromDetails);
    await expect(cartPage.productPrice).toHaveText(productPriceFromDetails);
    })

    test("Updating the shopping cart", async ({page}) => {
        const quantity = "5";
        const quantity2 = "3"
        await productPage.navigate();
        await productPage.acceptCookies();
        await productPage.viewProductDetails();
        await productDetailsPage.inputQuantityProductAndAddtoCart(quantity);
        await productDetailsPage.goToCartPage();

        await expect(cartPage.productQuantity).toHaveText(quantity)

        await productPage.navigate();
        await productPage.viewProductDetails();
        await productDetailsPage.inputQuantityProductAndAddtoCart(quantity2);
        await productDetailsPage.goToCartPage();

        const parsedQuantity1 = parseInt(quantity, 10);
        const parsedQuantity2 = parseInt(quantity2, 10);
        const finalParsedQuantity = parsedQuantity1 + parsedQuantity2;

        const finalQuantity = finalParsedQuantity.toString();

        await expect(cartPage.productQuantity).toHaveText(finalQuantity)


    })

    test("Removing a product from the shopping cart", async ({page}) => {
        const quantity = "5";
        await productPage.navigate();
        await productPage.acceptCookies();
        await productPage.viewProductDetails();
        await productDetailsPage.inputQuantityProductAndAddtoCart(quantity);
        await productDetailsPage.goToCartPage();

        await cartPage.removeProduct();
        await expect(cartPage.emptyCartInformation).toBeVisible();


    })
})