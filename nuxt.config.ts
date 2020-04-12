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
  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: {
        memoryLimit: 4096,
        workers: 2,
      },
      ignoreNotFoundWarnings: false,
    }],
  ],

  typescript: {
    typeCheck: {
      eslint: true,
    },
  },
};

export default config;
