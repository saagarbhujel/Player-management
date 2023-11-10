// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transform: {
    '^.+\\.tsx?$':'ts-jest'
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
        },
    },
};
