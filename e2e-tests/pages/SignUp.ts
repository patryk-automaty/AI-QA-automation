import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface UserData {
    title: string;
    name: string;
    email: string;
    password: string;
    dateOfBirth: {
        day: string;
        month: string;
        year: string;
    };
    newsletter: boolean;
    specialOffers: boolean;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

export class SignUp extends BasePage {

    readonly mrTitleRadiobutton: Locator;
    readonly mrsTitleRadiobutton: Locator;
    readonly nameInput: Locator;
    readonly emailInputDisabled: Locator;
    readonly passwordInput: Locator;
    readonly dayDateOfBirthSelect: Locator;
    readonly monthDateOfBirthSelect: Locator;
    readonly yearDateOfBirthSelect: Locator;
    readonly newsletterCheckbox: Locator;
    readonly specialOfferCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        super(page);

        this.mrTitleRadiobutton = page.locator('#id_gender1');
        this.mrsTitleRadiobutton = page.locator('#id_gender2');
        this.nameInput = page.locator('#name');
        this.emailInputDisabled = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.dayDateOfBirthSelect = page.locator('#days');
        this.monthDateOfBirthSelect = page.locator('#months');
        this.yearDateOfBirthSelect = page.locator('#years');
        this.newsletterCheckbox = page.locator('#newsletter');
        this.specialOfferCheckbox = page.locator('#optin');
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.companyInput = page.locator('#company');
        this.address1Input = page.locator('#address1');
        this.address2Input = page.locator('#address2');
        this.countrySelect = page.locator('#country');
        this.stateInput = page.locator('#state');
        this.cityInput = page.locator('#city');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.locator('#mobile_number');
        this.createAccountButton = page.locator("button[data-qa='create-account']")

    }

    async fillPersonalInformation(user: UserData): Promise<void> {
        if (user.title == "Mr") {
            await this.mrTitleRadiobutton.check();
        }
        else {
            await this.mrsTitleRadiobutton.check();
        }
        // Enter account information
        await this.nameInput.clear();
        await this.nameInput.fill(user.name);
        await this.passwordInput.fill(user.password);
        await this.dayDateOfBirthSelect.selectOption(user.dateOfBirth.day);
        await this.monthDateOfBirthSelect.selectOption(user.dateOfBirth.month);
        await this.yearDateOfBirthSelect.selectOption(user.dateOfBirth.year);
        // Address information
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.companyInput.fill(user.company);
        await this.address1Input.fill(user.address1);
        await this.address2Input.fill(user.address2);
        await this.countrySelect.selectOption(user.country);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipcodeInput.fill(user.zipcode);
        await this.mobileNumberInput.fill(user.mobileNumber);
    }

}
