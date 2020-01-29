const path = require('path');
const srcRoot = path.resolve(__dirname, './clients');

module.exports = {
    extends: [
        'airbnb-typescript',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:jest/all',
    ],
    globals: {
        fetch: true,
        window: true,
        document: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react-hooks', 'jest'],
    rules: {
        'import/prefer-default-export': 'off',

        '@typescript-eslint/explicit-function-return-type': 'off',

        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-wrap-multilines': 'off',

        'jest/prefer-expect-assertions': 'off',
        'jest/prefer-strict-equal': 'warn',
        'jest/no-hooks': [
            'error',
            {
                allow: ['afterEach', 'afterAll'], // We want global teardown available but not global setup
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                paths: [srcRoot],
            },
            webpack: {
                config: {
                    resolve: {
                        extensions: ['.js', '.jsx', '.ts', '.tsx'],
                        modules: [srcRoot, 'node_modules'],
                    },
                },
            },
        },
        react: {
            version: 'detect',
        },
    },
};
