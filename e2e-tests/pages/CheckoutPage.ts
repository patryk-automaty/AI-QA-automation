import { Locator, Page  } from "@playwright/test";
import { BasePage } from "./BasePage";


export class CheckoutPage extends BasePage {

    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        
        super(page);
        this.placeOrderButton = page.getByRole('link', {name : 'Place Order'})
    }

    async acceptOrder() {
        this.placeOrderButton.click();
    }


}