import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    Components({
      // performance issue with plugins/naive.client.ts
      resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
    }),
  ],
  optimizeDeps: {
    include:
      process.env.NODE_ENV === 'development'
        ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
        : [],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/styles/import.scss" as *;',
      },
    },
  },
});
