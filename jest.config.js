module.exports = {
  collectCoverage: true,
  roots: ['<rootDir>/api', '<rootDir/lib>'],
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
