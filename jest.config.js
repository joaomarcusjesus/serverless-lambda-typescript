module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: ['node_modules', '<rootDir>/src/**', 'dist'],
  modulePathIgnorePatterns: ['<rootDir>/src', '<rootDir>/dist'],
};
