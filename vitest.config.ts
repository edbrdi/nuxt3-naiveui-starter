import path from 'path';
import { defineConfig } from 'vitest/config';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    vue(),
    AutoImport({
      imports: ['vue'],
    }),
  ],
  test: {
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    },
  },
});
