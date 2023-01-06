import { defineStore } from 'pinia';

interface App {
  theme?: string;
}

function darkMode() {
  let system = 'light';
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    system = 'dark';
  }
  if (localStorage.theme === 'dark') return true;
  else if (!localStorage.theme && system === 'dark') return true;
  return false;
}

export const useApp = defineStore('app', {
  state: (): App => ({
    theme: darkMode() ? 'dark' : 'light',
  }),
  actions: {
    set(app: App) {
      this.theme = app.theme;
    },
  },
});
