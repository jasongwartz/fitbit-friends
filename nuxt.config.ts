import { Configuration } from '@nuxt/types';

const config: Configuration = {
  head: {
    title: 'Fitbit Friends!',
  },
  generate: {
    fallback: true,
  },
  modules: [
    '@nuxtjs/bulma',
  ],

  typescript: {
    typeCheck: {
      eslint: true,
    },
    loaderOptions: {
      compileOptions: {
        ignore: 'api',
      },
    },
  },
};

export default config;
