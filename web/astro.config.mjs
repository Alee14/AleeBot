// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  adapter: node({
    mode: 'standalone'
  }),

  env: {
    schema: {
      API_URL: envField.string({ context: 'client', access: 'public'  }),
    }
  }
});
