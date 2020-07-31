module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-classes-per-file': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'class-methods-use-this': 0,
    'import/extensions': 0,
    'no-continue': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-empty-function': 0,
    'import/prefer-default-export': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-empty': 0,
    'no-param-reassign': 0,
    'no-mixed-operators': 0,
    'max-len': 0,
    radix: 0,
  },
};
