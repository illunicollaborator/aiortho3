/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'prettier/prettier': ['error'],
    '@next/next/no-img-element': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
};
