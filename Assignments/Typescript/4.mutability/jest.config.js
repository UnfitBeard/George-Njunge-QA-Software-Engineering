/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "./",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  coverageDirectory: "<rootDir/coverage",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/constant.ts"
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  coverageReporters: ["json", "html"],
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};