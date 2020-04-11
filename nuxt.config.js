export default {
  buildModules: ['@nuxt/typescript-build'],
  typescript: {
    typeCheck: {
      eslint: true,
    },
  },
  generate: {
    fallback: true,
  },
};
