module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    '@vue/eslint-config-typescript/recommended'
  ],
  rules: {
    indent: ['error', 2],
    semi: ["error", "always"],
    quotes: ["error", "single"],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
    '@typescript-eslint/no-inferrable-types': "off",
  },
};
