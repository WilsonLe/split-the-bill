import "expect-puppeteer";

describe("New User Flow", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000");
  });
  it('should display "Sign in to your account"', async () => {
    await expect(page).toMatch("Sign in to your account");
  });
  // it("Should let new user sign up", async () => {
  //   await expect(page).toClick("button");
  //   const pages = await browser.pages();
  //   const widget = pages[pages.length - 1];
  //   expect(await widget.title()).toBe("Auth Emulator IDP Login Widget");
  //   await expect(widget).toMatch("Sign-in with");
  //   await expect(widget).toMatch("Google.com");
  //   await expect(widget).toClick("button", { text: "Add New Account" });
  // });
});
