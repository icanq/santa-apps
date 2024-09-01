module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/server', '<rootDir>/server/__tests__'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/server/$1',
  },
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
};
