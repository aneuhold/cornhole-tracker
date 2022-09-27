<script lang="ts" context="module">
	import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';

	export const inputBoxStories: ComponentStories = {
		Standard: {
			props: {
				value: '',
				placeHolder: 'Some example placeholder'
			}
		},
		Password: {
			props: {
				value: '',
				placeHolder: 'Password',
				password: true
			}
		}
	};
</script>

<script lang="ts">
	export let value = '';
	export let placeHolder = 'Example';
	export let password = false;

	const inputClasses =
		'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:shadow-outline transition ease-in-out';
</script>

{#if password}
	<input class={inputClasses} placeholder={placeHolder} type="password" bind:value />
{:else}
	<input class={inputClasses} placeholder={placeHolder} bind:value />
{/if}
