const { pathsToModuleNameMapper } = require('ts-jest');

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // transform: {
  //   '^.+.tsx?$': ['ts-jest', {}],
  // },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/$1',
  },
};
