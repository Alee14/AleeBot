import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node
        },

        plugins: {
            '@stylistic/js': stylisticJs
        },

        rules: {
            '@stylistic/js/quotes': ['error', 'single'],
            '@stylistic/js/semi-style': ['error', 'last'],
            '@stylistic/js/semi': ['error', 'always'],
            '@stylistic/js/indent': ['error', 4]
        }
    },
    pluginJs.configs.recommended,
];
