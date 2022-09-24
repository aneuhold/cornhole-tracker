module.exports = {
  // The below is needed to run TypeScript with Svelte and Storybook
  webpackFinal: async  (config) => {
    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes("svelte-loader"),
    )
    svelteLoader.options.preprocess = require("svelte-preprocess")({
      postCss: true
    })
    return config
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-svelte-csf"
  ],
  "framework": "@storybook/svelte",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "svelteOptions": {
    "preprocess": import("../svelte.config.js").preprocess
  } 
}