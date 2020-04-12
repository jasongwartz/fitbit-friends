module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  rules: {
    indent: ['error', 2],
    semi: ["error", "always"],
    quotes: ["error", "single"],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
    '@typescript-eslint/no-inferrable-types': "off",
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
  },
};
