const coverageDirectory = `${process.cwd()}/coverage`;

console.info('Coverage directory:', coverageDirectory);
console.info('Coverage HTML report:', `${coverageDirectory}/lcov-report/index.html`);

module.exports = {
  collectCoverage: true,
  coverageDirectory,
  roots: ['<rootDir>/api'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: [
    '<rootDir>/jest.setup.ts',
  ],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
};
