<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/**
	 * If the button should be the primary color
	 */
	export let primary = false;

	/**
	 * Button contents
	 */
	export let label = '';

	const standardClasses = 'font-bold py-2 px-4 rounded-full';
	function getPrimaryClasses() {
		if (primary) {
			return 'bg-blue-500 hover:bg-blue-700 text-white';
		}
		return 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border-blue-500 hover:border-transparent';
	}
	const classes = standardClasses + ' ' + getPrimaryClasses();

	const dispatch = createEventDispatcher();

	/**
	 * Optional click handler
	 */
	function onClick(event: Event) {
		dispatch('click', event);
	}
</script>

<button type="button" class={classes} on:click={onClick}>
	{label}
</button>
