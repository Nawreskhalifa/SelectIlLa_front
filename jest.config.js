module.exports = {
  // Use the default preset for Vue CLI projects with TypeScript and Babel support
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

  // Specify the test file patterns to include JavaScript and TypeScript files ending with .spec.js or .spec.ts
  testMatch: [
    '<rootDir>/tests/*.spec.js', // JavaScript test files
    '<rootDir>/tests/*.spec.ts', // TypeScript test files
  ],

  // Specify the test environment as jsdom for DOM testing
  testEnvironment: "jsdom",

  // Specify how to transform Vue files and JavaScript files using Babel
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },

  // Specify the file extensions for modules to resolve
  moduleFileExtensions: ["vue", "js", "ts", "json"],

  // Specify patterns to ignore for coverage reports
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],

  // Specify coverage reporters
  coverageReporters: ["text", "json-summary"],

  // Fix for vue-test-utils to work with Jest 29
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
    nodeOptions: {
      experimentalVMModules: true
    }
  },
};
