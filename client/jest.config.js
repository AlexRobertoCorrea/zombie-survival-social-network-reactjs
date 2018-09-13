module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  setupFiles: ['<rootDir>/test-setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/test-setup.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost/',
  verbose: true
};
