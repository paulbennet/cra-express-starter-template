module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'max-len': ['error', 120]
    }
};
