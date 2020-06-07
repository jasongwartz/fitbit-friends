import { Configuration } from '@nuxt/types';

const config: Configuration = {
  head: {
    title: 'Fitbit Friends!',
  },
  server: {
    host: '0.0.0.0',
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
