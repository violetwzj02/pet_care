import { expect, test } from "@playwright/test";

test("home page renders and booking toast works", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "让毛孩子干净、松软、好心情。" })).toBeVisible();
  await expect(page.getByRole("img", { name: /可爱手绘地图/ })).toBeVisible();

  await page.getByRole("link", { name: "预约洗护" }).click();
  await expect(page.locator("#booking")).toBeInViewport();

  await page.getByRole("button", { name: /深层护理，选择套餐/ }).click();
  await expect(page.locator("#booking")).toBeInViewport();
  await expect(page.locator('select[name="service"]')).toHaveValue("深层护理");

  await page.locator('input[name="owner"]').fill("小林");
  await page.locator('input[name="phone"]').fill("13800138000");
  await page.locator('select[name="pet"]').selectOption({ label: "猫咪" });
  await page.locator('select[name="service"]').selectOption({ label: "基础洗护" });
  await page.locator('input[name="date"]').fill("2026-05-12");
  await page.locator('select[name="time"]').selectOption({ label: "10:00 - 12:00" });
  await page.locator('textarea[name="message"]').fill("怕吹风");
  await page.locator("form").evaluate((form) => {
    if (form instanceof HTMLFormElement) {
      form.requestSubmit();
    }
  });

  await expect(page.getByRole("status")).toContainText("小林，已收到 2026-05-12 10:00 - 12:00 的预约信息。");
});
