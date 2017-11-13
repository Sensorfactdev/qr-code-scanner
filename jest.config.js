module.exports = {
  setupFiles: [
    'raf/polyfill',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|scss|css)$': '<rootDir>/__mocks__/fileTransformer.js',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$': '<rootDir>/__mocks__/fileMock.js',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '.*.svg', '/dist'],
  modulePathIgnorePatterns: ['/node_modules/', '.*.svg', '/dist'],
  testResultsProcessor: './node_modules/jest-junit',
};
