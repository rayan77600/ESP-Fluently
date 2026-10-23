import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/app/**/layout.tsx"],
  // Seuil imposé par la Definition of Done (CONTRIBUTING / PAQ).
  coverageThreshold: {
    global: { lines: 70, statements: 70, functions: 70, branches: 70 },
  },
};

export default createJestConfig(config);
