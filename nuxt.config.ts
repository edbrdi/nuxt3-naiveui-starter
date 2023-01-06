import * as fs from 'fs';
import chokidar from 'chokidar';
import { getMessages } from './lang';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  // messy trick to force reload when change occurs in some folders
  // wasn't able to make it work with vite plugins
  const watcher = chokidar.watch(['./lang/', './utils/'], {
    ignoreInitial: true,
  });
  watcher.on('all', (event, _file) => {
    console.log(event, _file);
    fs.readFile('nuxt.config.ts', 'utf8', (err, data) => {
      if (err) throw err;
      fs.writeFile('nuxt.config.ts', data, 'utf8', (err) => {
        if (err) throw err;
      });
    });
  });
}

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@pinia/nuxt',
    'nuxt-windicss',
    '@nuxtjs/color-mode',
    [
      '@nuxtjs/i18n',
      {
        vueI18n: {
          legacy: false,
          locale: 'en',
          messages: getMessages(),
        },
      },
    ],
  ],
  css: ['@/assets/styles/global.scss'],
  runtimeConfig: {
    public: {
      BACKEND_HOST: 'http://localhost',
      BACKEND_PORT: '3001',
    },
  },
  watchers: {
    chokidar: {},
  },
});
