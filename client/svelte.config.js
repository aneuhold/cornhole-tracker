import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess({ postcss: true })],

  kit: {
    adapter: adapter(),
    alias: {
      shared: 'src/_shared',
      // an alias ending /* will only match
      // the contents of a directory, not the directory itself
      'shared/*': 'src/_shared/*'
    }
  }
};

export default config;
