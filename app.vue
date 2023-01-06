<script setup lang="ts">
const color = useColorMode();

useHead({
  title: 'Nuxt',
  meta: [{ charset: 'utf-8' }],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: `/${color.value}-favicon.svg` },
  ],
});
</script>

<template>
  <Html>
    <Body>
      <n-message-provider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </n-message-provider>
    </Body>
  </Html>
</template>
