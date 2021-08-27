module.exports = {
  moduleNameMapper: {
    '^src/(.+)': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/test/**/*.test.ts'],
};
