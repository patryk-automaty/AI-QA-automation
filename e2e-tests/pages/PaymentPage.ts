import { Page, Locator } from "@playwright/test"
import { BasePage } from "./BasePage"

export interface paymmentData {
    nameOnCard: string;
    cardNumber: string;
    CVC: string;
    ExpirationMonth: string;
    ExpirationYear: string;
}

export class PaymentPage extends BasePage {

    readonly nameOnCardInput: Locator;
    readonly cardNumerInput: Locator;
    readonly cvcInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;
    readonly confirmOrderButton: Locator;
    readonly successMessage: Locator;


    constructor(page:Page) {

        super(page)
        this.nameOnCardInput = page.locator("input[data-qa='name-on-card']");
        this.cardNumerInput = page.locator("input[data-qa='card-number']");
        this.cvcInput = page.locator("input[data-qa='cvc']");
        this.expirationMonthInput = page.locator("input[data-qa='expiry-month']");
        this.expirationYearInput = page.locator("input[data-qa='expiry-year']");
        this.confirmOrderButton = page.locator("#submit");
        this.successMessage = page.locator("#success_message");

    }

    async fillPaymentInformation(payment: paymmentData) {

        await this.nameOnCardInput.fill(payment.nameOnCard);
        await this.cardNumerInput.fill(payment.cardNumber);
        await this.cvcInput.fill(payment.CVC);
        await this.expirationMonthInput.fill(payment.ExpirationMonth);
        await this.expirationYearInput.fill(payment.ExpirationYear);
        await this.confirmOrderButton.click();
    }
}