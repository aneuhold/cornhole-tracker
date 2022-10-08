import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      src: path.resolve('./src'),
      shared: path.resolve('./src/_shared')
    }
  },
  server: {
    fs: {
      allow: ['./src']
    }
  }
};

export default config;
