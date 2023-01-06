<script setup lang="ts">
import { h, ref, Component } from 'vue';
import { darkTheme, lightTheme, NIcon, frFR, dateFrFR } from 'naive-ui';
import { darkThemeOverrides, lightThemeOverrides } from '~/naive.config';
import {
  SignOut24Regular,
  WeatherSunny24Filled,
  WeatherMoon24Filled,
  Home24Regular,
} from '@vicons/fluent';
import { useUser } from '~/store/user';
import { useApp } from '~/store/app';

const user = useUser();
const app = useApp();
const router = useRouter();
const isLogoShort = ref(false);
const { locale, t } = useI18n();

locale.value = localStorage.locale || 'en';

const naiveLocale = computed(() => {
  if (locale.value === 'fr') return frFR;
  return undefined;
});

const naiveDateLocale = computed(() => {
  if (locale.value === 'fr') return dateFrFR;
  return undefined;
});

const darkMode = computed({
  get() {
    if (app.theme === 'dark') return true;
    return false;
  },
  set(value: boolean) {
    const theme = value ? 'dark' : 'light';
    app.set({ theme: theme });
    localStorage.setItem('theme', theme);
  },
});

function toggleLogoShort(collapsed: boolean) {
  isLogoShort.value = collapsed;
  localStorage.setItem('layoutColapsed', collapsed ? 'true' : 'false');
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function signout() {
  user.signOut();
  router.push('/sign-in');
}

const selectedKey = computed({
  get() {
    return router.currentRoute.value.name as string;
  },
  set(key: string) {
    if (key === 'signout') signout();
    else router.push('/' + key.replace(/-/g, '/').replace('index', ''));
  },
});

onBeforeMount(() => {
  const layoutColapsed = localStorage.layoutColapsed;
  if (layoutColapsed === 'true') {
    isLogoShort.value = true;
  }
});

const topMenu = [
  {
    label: t('home'),
    key: 'index',
    icon: renderIcon(Home24Regular),
    onClick: () => router.push('/'),
  },
];

const bottomMenu = [
  {
    label: t('sign-out'),
    icon: renderIcon(SignOut24Regular),
    key: 'signout',
  },
];
</script>

<template>
  <NConfigProvider
    :theme="darkMode ? darkTheme : lightTheme"
    :theme-overrides="darkMode ? darkThemeOverrides : lightThemeOverrides"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
  >
    <NGlobalStyle />
    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          :collapsed="isLogoShort"
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          style="height: 100vh"
          :on-update:collapsed="(collapsed: boolean) => toggleLogoShort(collapsed)"
          class="z-11"
        >
          <div
            class="flex flex-col justify-between"
            :class="{ '_bg-light': !darkMode }"
            style="height: 100vh"
          >
            <div>
              <SvgLogo
                :short="isLogoShort"
                :dark-mode="darkMode"
                class="mt-4 mb-4 cursor-pointer"
                :class="{ 'h-7 ml-4': isLogoShort, 'h-6 ml-9': !isLogoShort }"
                @click="() => router.push('/')"
              />
              <n-menu
                v-model:value="selectedKey"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="topMenu"
                :accordion="true"
              />
            </div>
            <div>
              <n-menu
                v-model:value="selectedKey"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="bottomMenu"
              />
              <n-switch
                v-model:value="darkMode"
                size="medium"
                class="mb-4 mt-3"
                :class="{ 'ml-3': isLogoShort, 'ml-8': !isLogoShort }"
              >
                <template #checked-icon>
                  <n-icon :component="WeatherMoon24Filled" />
                </template>
                <template #unchecked-icon>
                  <n-icon :component="WeatherSunny24Filled" />
                </template>
              </n-switch>
            </div>
          </div>
        </n-layout-sider>
        <n-layout style="height: 100vh">
          <slot />
        </n-layout>
      </n-layout>
    </n-space>
  </NConfigProvider>
</template>

<style lang="scss" scoped>
._bg-light {
  background-color: $bg-light;
}
</style>
