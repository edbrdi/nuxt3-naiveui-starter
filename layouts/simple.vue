<script setup lang="ts">
import { darkTheme, lightTheme } from 'naive-ui';
import { darkThemeOverrides, lightThemeOverrides } from '~/naive.config';
import { useApp } from '~/store/app';

const { locale } = useI18n();
const app = useApp();

locale.value = localStorage.locale || 'en';

const darkMode = computed(() => {
  if (app.theme === 'dark') return true;
  return false;
});
</script>

<template>
  <NConfigProvider
    :theme="darkMode ? darkTheme : lightTheme"
    :theme-overrides="darkMode ? darkThemeOverrides : lightThemeOverrides"
  >
    <NGlobalStyle />
    <div>
      <slot />
    </div>
  </NConfigProvider>
</template>
