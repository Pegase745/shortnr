module.exports = {
  rootDir: 'src',
  testMatch: ['**/*.spec.(ts|tsx)'],
  verbose: false,
  clearMocks: true,
  resetModules: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__fixtures__/',
    '/__tests__/',
    '/(__)?mock(s__)?/',
    '/__jest__/',
    '.?.min.js',
  ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts'],
};
