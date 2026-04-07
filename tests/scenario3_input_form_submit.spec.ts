import { test, expect, Locator } from '@playwright/test';
import { InputFormPage } from './input_form'

test.describe('Input Form Tests', () => {
    let inputForm: InputFormPage;

    test.beforeEach(async ({ page }) => {
        inputForm = new InputFormPage(page);
        await inputForm.navigate();
    });

    test("Verify error message", async () => {
        await expect(inputForm.submitBtn).toBeVisible();
        await inputForm.submitBtn.click();
        
        await expect(inputForm.nameInput).toBeVisible();
        await expect(inputForm.nameInput).toHaveJSProperty('validationMessage', 'Please fill out this field.');
    });

    test("input details and submit form", async ({page}) => {
        const userData = {
            name: 'Shyam',
            email: 'Shyam@gmail.com',
            password: '123456',
            company:'test company',
            website: 'Shyam website',
            country: 'United States',
            city: 'Cincinnati',
            address1: '108 W Seymour Ave',
            address2: 'suite 2000',
            state: 'OH',
            zip: '45216'
        };

        // Use the optimized method from POM
        await inputForm.fillForm(userData);
        await inputForm.submitBtn.click();

        const success_message:Locator = page.locator('.success-msg')
        await expect(success_message).toContainText('Thanks for contacting us, we will get back to you shortly.')
    });
});