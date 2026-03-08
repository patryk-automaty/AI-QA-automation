import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {


    readonly userEmailInput: Locator;
    readonly userPasswordInput: Locator;
    readonly loginButton: Locator;

    readonly newUserNameInput: Locator;
    readonly newUserEmailInput: Locator;
    readonly signupButton: Locator;

    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {

        super(page);
 
        this.userEmailInput = page.locator('input[data-qa="login-email"]');
        this.userPasswordInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');
        this.newUserNameInput = page.locator('input[data-qa="signup-name"]');
        this.newUserEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
        this.acceptCookiesButton = page.locator('button.fc-cta-consent');
    }

    async navigate() {
        await this.page.goto("https://www.automationexercise.com/login");
    }

    async performLogin(email: string, password: string): Promise<void> {
        await this.userEmailInput.fill(email);
        await this.userPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async performSignup(name: string, email: string): Promise<void>  {
        await this.newUserNameInput.fill(name);
        await this.newUserEmailInput.fill(email);
        await this.signupButton.click();
    }

    async getPasswordValidationMessage(): Promise<string> {
        return await this.userPasswordInput.evaluate((element: HTMLInputElement) => {
            return element.validationMessage;
        });
    }
}