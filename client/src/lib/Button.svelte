<script lang="ts" context="module">
	import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';

	const listeners = {
		click: () => {
			console.log('Button was clicked');
		}
	};

	export const buttonStories: ComponentStories = {
		Primary: {
			props: {
				label: 'Primary Button',
				primary: true
			},
			listeners
		},
		'Non Primary': {
			props: {
				label: 'Secondary Button'
			},
			listeners
		}
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/**
	 * If the button should be the primary color
	 */
	export let primary = false;

	/**
	 * Button contents
	 */
	export let label = 'Button';

	const standardClasses = 'font-bold py-2 px-4 rounded-full active:bg-blue-800 shadow-md';

	$: primaryClasses = primary
		? 'bg-blue-500 hover:bg-blue-700 text-white'
		: 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border-blue-500 hover:border-transparent';

	const dispatch = createEventDispatcher();

	/**
	 * Optional click handler
	 */
	function onClick(event: Event) {
		dispatch('click', event);
	}
</script>

<button type="button" class={standardClasses + ' ' + primaryClasses} on:click={onClick}>
	{label}
</button>
