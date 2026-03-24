import { test, expect } from "@playwright/test"
import { ProductDetailsPage } from "../pages/ProductDetailsPage"
import { CartPage } from "../pages/CartPage";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";
import validPayment from "../test-data/vaildPayment.json"


test.describe("Checkout Process", () => {

    let productDetailsPage: ProductDetailsPage;
    let cartPage: CartPage;
    let productPage: ProductPage;
    let loginPage: LoginPage;
    let checkoutPage: CheckoutPage;
    let paymentPage: PaymentPage;

    test.beforeEach(async ({ page }) => {
        productPage = new ProductPage(page);
        productDetailsPage = new ProductDetailsPage(page);
        cartPage = new CartPage(page);
        loginPage = new LoginPage(page);
        checkoutPage = new CheckoutPage(page);
        paymentPage = new PaymentPage(page);
        productPage.blockAds();
        });
    
    test("Successful checkout process", async({page}) => {

        await loginPage.navigate();
        await loginPage.acceptCookies();
        await loginPage.performLogin("12343t1111est@test.com","testhaslo1234");

        const quantity = "5";
        await productPage.navigate();
        await productPage.viewProductDetails();
        await productDetailsPage.inputQuantityProductAndAddtoCart(quantity);
        await productDetailsPage.goToCartPage();

        await cartPage.proceedToCheckout();

        await checkoutPage.acceptOrder();
        await paymentPage.fillPaymentInformation(validPayment);
    })
})