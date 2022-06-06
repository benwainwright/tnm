const es6Packages = [
  "grommet-controls",
  "react-markdown",
  "vfile",
  "unified",
  "remark-parse",
  "mdast-util-from-markdown",
  "mdast-util-to-string",
  "micromark",
  "micromark-core-commonmark",
  "parse-entities",
];

module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  setupFiles: ["react-app-polyfill/jsdom"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  testPathIgnorePatterns: ["integration-tests"],
  testEnvironment: "jsdom",
  testRunner: "jest-circus/runner",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${es6Packages.join("|")})`,
  ],
  modulePaths: ["/Users/benwainwright1/repos/tnm/src"],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.md$": "<rootDir>/src/testSupport/string-file-stub.js",
    "^.+\\.module\\.(css|sass|scss|md)$": "identity-obj-proxy",
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  resetMocks: true,
  coveragePathIgnorePatterns: [
    "src/fixtures",
    "src/API.ts",
    "src/aws-exports.js",
    "src/cdk-entry.ts",
    "src/index.tsx",
    "src/react-app-env.d.ts",
    "src/reportWebVitals.ts",
    "src/setupTests.ts",
    "src/graphql",
  ],
};
