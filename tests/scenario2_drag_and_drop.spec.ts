import { test, expect } from '@playwright/test';

test("Set slider to 95 dynamically", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground");

  await page.getByText("Drag & Drop Sliders").click();

  const slider = page.locator('input[type="range"][value="15"]');
  const rangeValue = page.locator('#rangeSuccess');

  const box = await slider.boundingBox();
  if (!box) throw new Error("Slider not visible");

  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

  let value = parseInt(await slider.inputValue());
  while (value !== 95) {
    if (value < 95) {
      await slider.press("ArrowRight");
    } else {
      await slider.press("ArrowLeft");
    }
    value = parseInt(await slider.inputValue());
  }

  await expect(rangeValue).toHaveText("95");
});