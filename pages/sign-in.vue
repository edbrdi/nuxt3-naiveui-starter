<script setup lang="ts">
import {
  useMessage,
  FormInst,
  FormItemRule,
  FormValidationError,
} from 'naive-ui';
import { useUser } from '~/store/user';
import { useApp } from '~/store/app';

definePageMeta({
  layout: 'simple',
});

const app = useApp();
const router = useRouter();
const user = useUser();
const form = ref<FormInst | null>(null);
const message = useMessage();
const { t } = useI18n();
const model = ref({
  email: '',
  password: '',
});

const darkMode = computed(() => {
  if (app.theme === 'dark') return true;
  return false;
});

const rules = computed(() => {
  return {
    email: [
      {
        validator(rule: FormItemRule, value: string) {
          if (!value) {
            return new Error(t('email-required'));
          } else if (!/.+@.+/.test(value)) {
            return new Error(t('email-invalid'));
          }
          return true;
        },
        required: true,
      },
    ],
    password: [
      {
        validator(rule: FormItemRule, value: string) {
          if (!value) {
            return new Error(t('password-required'));
          }
          return true;
        },
        required: true,
      },
    ],
  };
});

function handleSignInClick(e: MouseEvent) {
  e.preventDefault();
  form.value?.validate(async (errors: Array<FormValidationError> | void) => {
    if (!errors) {
      await user.signIn(model.value).catch((e) => message.error(e.message));
      router.push('/');
    }
  });
}
</script>

<template>
  <div class="mx-auto max-w-sm h-screen flex flex-col justify-center">
    <SvgLogo :dark-mode="darkMode" class="h-11 mx-auto mb-16" />
    <n-form
      ref="form"
      :model="model"
      :rules="rules"
      class="w-full"
      size="large"
      @keydown.enter="handleSignInClick"
    >
      <n-form-item path="email" :label="$t('email')">
        <n-input
          v-model:value="model.email"
          placeholder=""
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="password" :label="$t('password')">
        <n-input
          v-model:value="model.password"
          type="password"
          placeholder=""
          show-password-on="click"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-row :gutter="[0, 24]" class="pt-6">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              :disabled="!model.email || !model.password"
              round
              type="primary"
              @click="handleSignInClick"
            >
              {{ $t('sign-in') }}
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>
