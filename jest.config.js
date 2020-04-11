module.exports = {
  collectCoverage: true,
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
