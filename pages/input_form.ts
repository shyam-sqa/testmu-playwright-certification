import { Locator, Page, expect } from '@playwright/test';

export class InputFormPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly companyInput: Locator;
    readonly websiteInput: Locator;
    readonly countrySelect: Locator;
    readonly cityInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly stateInput: Locator;
    readonly zipInput: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('#name');
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByLabel('Password*');
        this.companyInput = page.locator('#company')
        this.websiteInput = page.locator('#websitename');
        this.countrySelect = page.locator('select[name="country"]');
        this.cityInput = page.locator('#inputCity');
        this.address1Input = page.locator('#inputAddress1');
        this.address2Input = page.locator('#inputAddress2');
        this.stateInput = page.locator('#inputState');
        this.zipInput = page.locator('#inputZip');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
    }

    async navigate() {
        await this.page.goto("https://www.testmuai.com/selenium-playground/");
        await this.page.getByRole('link', { name: 'Input Form Submit' }).click();
    }

    async fillForm(details: any) {
        await this.nameInput.fill(details.name);
        await this.emailInput.fill(details.email);
        await this.passwordInput.fill(details.password);
        await this.companyInput.fill(details.company)
        await this.websiteInput.fill(details.website);
        await this.countrySelect.selectOption(details.country);
        await this.cityInput.fill(details.city);
        await this.address1Input.fill(details.address1);
        await this.address2Input.fill(details.address2);
        await this.stateInput.fill(details.state);
        await this.zipInput.fill(details.zip);
    }
}