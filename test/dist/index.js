"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
(async () => {
    const browser = await puppeteer_1.default.launch({ headless: process.env.CI === "true" });
    const page = await browser.newPage();
    await page.goto("https://google.com");
    await browser.close();
})();
//# sourceMappingURL=index.js.map