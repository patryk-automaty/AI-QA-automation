import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('User Authentication', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.blockAds();
    });

    test('Successful login with valid credetials', async ({ page }) => {
        
        await loginPage.navigate();
        await loginPage.acceptCookies();
        await loginPage.performLogin("testowymail11231123@mailowy.com","testhaslo123");

        const loggedInTest = page.getByText("Logged in as");
        await expect(loggedInTest).toBeVisible();
        });
    
    test('Unsuccessful login with invalid credentials', async ({ page }) => {
        await loginPage.navigate()
        await loginPage.acceptCookies();
        await loginPage.performLogin("testowymail11231123@mailowy.com","testhaslo1234");

        const incorrectLoginText = page.getByText("Your email or password is incorrect!");
        await expect(incorrectLoginText).toBeVisible();

        })
    });