module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.cjs'],
  moduleNameMapper: {},
  collectCoverageFrom: [
    'routes/**/*.js',
    'middleware/**/*.js',
    '!node_modules/**'
  ]
};
