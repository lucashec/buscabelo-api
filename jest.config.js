const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.json')

const config = {
    verbose: true,
    clearMocks: true,
    coverageProvider: "v8",
    preset: 'ts-jest',
    testMatch: [
        "**/*.spec.ts"
      ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/src/'}),
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    collectCoverage: true,
    collectCoverageFrom:[
      '<rootDir>/src/modules/**/services/*.ts'
    ],
    coverageDirectory: 'coverge',
    coverageReporters:[
      'text-summary',
      'lcov',
    ]
  };
  
module.exports = config;

