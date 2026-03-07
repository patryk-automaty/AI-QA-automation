import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('User Authentication', () => {

    test('Successful login with valid credetials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.navigate();
        await loginPage.acceptCookies();
        await loginPage.blockAds();
        await loginPage.performLogin("testowymail11231123@mailowy.com","testhaslo123");

        const loggedInTest = page.getByText("Logged in as");
        await expect(loggedInTest).toBeVisible();
    });
});