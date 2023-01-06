# Nuxt 3 (SSG mode, vite) / Naive UI, TypeScript starter

Starter derivated from a side project using Nuxt 3 / Naive UI in SSG mode with:

- Naive UI components registered globally
- Tailwind-like utility with Windi CSS
- i18n with YAML configuration files and a specific approach: translations grouped by scope instead of using one file per language. It's more productive this way, you can leverage tools like Copilot to translate automatically each language based on the first sentence. Also configured for Naive components using locales. Auto refresh
- SCSS with global variables & mixins, variables are also exported to TS if you need to define style programmatically
- Vue composition API auto import
- Basic authentication & authorization middleware, custom fetch implementation
- Configured Vitest with examples for unit & snapshot testing
- Husky pre-commit tests & commit message check, eslint, prettier configured
- Pinia store, dark mode...
  
Some screenshots:

![Screen 1](public/screen1.png)

![Screen 2](public/screen2.png)

![Screen 3](public/screen3.png)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
