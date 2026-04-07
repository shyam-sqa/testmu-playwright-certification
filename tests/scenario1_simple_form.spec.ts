import {test, expect, Locator} from '@playwright/test'

 test.beforeEach(async ({page})=>{
    await page.goto("https://www.testmuai.com/selenium-playground/")
    const link:Locator = page.getByRole('link',{name:"Simple Form Demo"})
    await expect(link).toBeVisible()
    await link.click()
 })


test("Verify URL", async ({page})=>{
    expect(page).toHaveURL(/simple-form-demo/)
})

test("Validate Message",async({page})=>{
    const message:string = "Welcome to TestMu AI"
    const txtbox = page.locator("input#user-message")
    await expect(txtbox).toBeVisible()
    await txtbox.fill(message)
    await expect(txtbox).toHaveValue(message,{timeout:5000})
    const btn: Locator = page.getByRole('button',{name:'Get Checked Value'})
    await btn.click()
    const txtmessage = page.locator('#message')
    await expect(txtmessage).toBeVisible({timeout:5000})
    await expect(txtmessage).toContainText(message,{timeout:5000})
})

    


