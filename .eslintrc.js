/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
    extends: [
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json'
    },
    plugins: ['@typescript-eslint'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    },
  };
  