import { svelte } from '@sveltejs/vite-plugin-svelte';
import type { UserConfig } from 'vite';

/** @type {import('vite').UserConfig} */
const config: UserConfig = {
	plugins: [svelte()]
};

export default config;
