/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "./reports", outputName: "junit.xml" }],
    [
      "jest-html-reporters",
      {
        publicPath: "./jest-report",
        filename: "report.html",
        expand: true,
      },
    ],
  ],
};
