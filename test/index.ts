import ppt from "puppeteer";

(async () => {
  const browser = await ppt.launch({ headless: process.env.CI === "true" });
  const page = await browser.newPage();
  await page.goto("https://google.com");
  await browser.close();
})();
