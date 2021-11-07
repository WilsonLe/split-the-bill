module.exports = {
  coverageProvider: "v8",
  preset: "jest-puppeteer",
  rootDir: "src",
  setupFilesAfterEnv: ["expect-puppeteer"],
};
