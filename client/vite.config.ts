import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import type { UserConfig } from 'vite';

/** @type {import('vite').UserConfig} */
const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			src: path.resolve('./src'),
			shared: path.resolve('./_shared')
		}
	},
	server: {
		fs: {
			allow: ['./_shared', './src']
		}
	}
};

export default config;
