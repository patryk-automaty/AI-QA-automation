import { Page, Locator } from '@playwright/test'

export class BasePage {
    readonly page: Page;
    readonly acceptCookiesButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.acceptCookiesButton = page.locator('button.fc-cta-consent');
    }

    async blockAds(): Promise<void> {
        await this.page.route('**/*', (route) => {
            const url = route.request().url();
            if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
                route.abort();
            } else {
                route.continue();
            }
        });
    }

    async acceptCookies(): Promise<void>  {
        try {
            await this.acceptCookiesButton.waitFor({state: 'visible', timeout: 3000});
            await this.acceptCookiesButton.click();
        }
        catch (error){
            console.log("Cookie popup did not appear - proceeding with the test.")
        }
    }
}