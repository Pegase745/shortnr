module.exports = {
  testMatch: ['**/*.spec.(ts|tsx)'],
  verbose: false,
  clearMocks: true,
  resetModules: true,
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__fixtures__/',
    '/__tests__/',
    '/(__)?mock(s__)?/',
    '/__jest__/',
    '.?.min.js',
  ],
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2339],
      },
    },
  },
  moduleDirectories: ['node_modules', 'src', 'server'],
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },
  setupFiles: ['./tests/setupEnzyme.ts'],
  setupFilesAfterEnv: ['./tests/setupMatchers.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'json', 'js'],
};
