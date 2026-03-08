import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignUp } from '../pages/SignUp';
import validUser from '../test-data/vaildUser.json'


test.describe('User Authentication', () => {

    let loginPage: LoginPage;
    let signupPage: SignUp;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        signupPage = new SignUp(page);
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
        await loginPage.navigate();
        await loginPage.acceptCookies();
        await loginPage.performLogin("testowymail11231123@mailowy.com","testhaslo1234");

        const incorrectLoginText = page.getByText("Your email or password is incorrect!");
        await expect(incorrectLoginText).toBeVisible();

        })
   

    test('Unsuccessful login with empty fields', async ({ page }) => {
        await loginPage.navigate();
        await loginPage.acceptCookies();
        await loginPage.userEmailInput.fill("patry123@gmail.com");
        await loginPage.loginButton.click();
        const validationMsg = await loginPage.getPasswordValidationMessage();
        expect(validationMsg).toBe("Please fill out this field.")

        })

    test('Successful registration with valid information', async ({page}) => {
        await loginPage.navigate();
        await loginPage.acceptCookies();

        const fullName = `${validUser.firstName}${validUser.lastName}`;
        const uniqueEmail = `patryk_test_${Date.now()}@testypw.com`;
        await loginPage.performSignup(fullName, uniqueEmail)
        await signupPage.fillPersonalInformation(validUser);
        await signupPage.createAccountButton.click();
        
        const successMsg = page.getByText('Account Created!');
        await expect(successMsg).toBeVisible();
        })
    });