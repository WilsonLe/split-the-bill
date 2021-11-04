module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.CI === "true",
    product: "chrome",
    slowMo: process.env.CI === "true" ? 0 : 500,
  },
  browserContext: "default",
};
