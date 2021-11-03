module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.CI === "true",
    product: "chrome",
  },
  browserContext: "default",
};
