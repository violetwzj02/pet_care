import { chromium, devices, expect } from "@playwright/test";
import { spawn } from "node:child_process";
import { openSync } from "node:fs";
import { mkdir } from "node:fs/promises";

const baseURL = "http://localhost:3021";
const outputDir = "playwright-check";

function startServer() {
  const env = { ...process.env };
  const pathValue = env.Path || env.PATH;
  delete env.Path;
  delete env.PATH;
  env.Path = pathValue;
  const log = openSync(`${outputDir}/server.log`, "a");

  return spawn("cmd.exe", ["/c", "npm.cmd", "run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3021"], {
    env,
    stdio: ["ignore", log, log],
    windowsHide: true,
  });
}

async function waitForServer(timeout = 60_000, throwOnTimeout = true) {
  const deadline = Date.now() + timeout;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) {
        return true;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  if (throwOnTimeout) {
    throw new Error(`Timed out waiting for ${baseURL}`);
  }

  return false;
}

function stopServer(server) {
  if (!server?.pid) {
    return;
  }

  server.kill();
  const cleanup = spawn("taskkill", ["/pid", String(server.pid), "/t", "/f"], {
    stdio: "ignore",
    windowsHide: true,
  });
  cleanup.unref();
}

async function verifyPage(contextOptions, screenshotName) {
  const browser = await chromium.launch();
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  await page.goto(baseURL);
  await expect(page.getByRole("heading", { name: "让毛孩子干净、松软、好心情。" })).toBeVisible();
  await expect(page.getByRole("img", { name: /可爱手绘地图/ })).toBeVisible();

  await page.locator("#testimonials").scrollIntoViewIfNeeded();
  await expect(page.locator("#testimonials")).toBeInViewport();
  await expect(page.getByRole("heading", { name: "常来的主人，最在意的是细节和稳定感。" })).toBeVisible();
  await expect(page.getByText("修完脸型特别自然")).toBeVisible();
  await page.getByRole("button", { name: "下一条评价" }).click();
  await expect(page.getByText("第一次带猫洗护")).toBeVisible();

  await page.locator("#booking").scrollIntoViewIfNeeded();
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
  await expect(page.getByRole("status")).toContainText(
    "小林，已收到 2026-05-12 10:00 - 12:00 的预约信息。",
  );

  await page.screenshot({ path: `${outputDir}/${screenshotName}`, fullPage: true });
  await browser.close();
}

await mkdir(outputDir, { recursive: true });
let server;

try {
  const hasExistingServer = await waitForServer(1_500, false);
  if (!hasExistingServer) {
    server = startServer();
    await waitForServer();
  }
  await verifyPage({ viewport: { width: 1440, height: 1100 } }, "home-desktop.png");
  await verifyPage(devices["Pixel 7"], "home-mobile.png");
  console.log(`Playwright verification passed. Screenshots saved in ${outputDir}.`);
} finally {
  stopServer(server);
}

process.exit(0);
