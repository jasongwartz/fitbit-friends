module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
  ],
  rules: {
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ["error", "always"],
    'space-before-function-paren': ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
  }
};
