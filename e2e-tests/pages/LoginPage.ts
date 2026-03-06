import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly userEmailInput: Locator;
    readonly userPasswordInput: Locator;
    readonly loginButton: Locator;

    readonly newUserNameInput: Locator;
    readonly newUserEmailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userEmailInput = page.locator('input[data-qa="login-email"]');
        this.userPasswordInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('input[data-qa="login-button"]');
        this.newUserNameInput = page.locator('input[data-qa="signup-name"]');
        this.newUserEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('input[data-qa="signup-button"]');
    }

    async navigate() {
        await this.page.goto("https://www.automationexercise.com/login");
    }

    async performLogin(email: string, password: string) {
        await this.userEmailInput.fill(email);
        await this.userPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async performSignup(name: string, email: string) {
        await this.newUserNameInput.fill(name);
        await this.newUserEmailInput.fill(email);
        await this.signupButton.click();
    }

}