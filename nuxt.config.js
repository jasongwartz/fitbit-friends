export default {
  head: {
    title: 'Fitbit Friends!',
  },
  generate: {
    fallback: true,
  },
  modules: [
    '@nuxtjs/bulma',
  ],

  buildModules: ['@nuxt/typescript-build'],
  typescript: {
    typeCheck: {
      eslint: true,
    },
  },
};
