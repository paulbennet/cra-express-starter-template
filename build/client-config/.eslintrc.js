module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'standard'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    settings: {
        react: {
            version: '17.0.2'
        }
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'max-len': ['error', 120]
    }
};