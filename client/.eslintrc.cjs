module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	plugins: ['svelte3', '@typescript-eslint', 'prettier'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		]
	}
};
