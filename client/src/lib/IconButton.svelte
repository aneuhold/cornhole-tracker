<script lang="ts" context="module">
	import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
	import svgIcons from 'src/util/svgIcons';

	const listeners = {
		click: () => {
			console.log('Icon Button was clicked');
		}
	};

	export const iconButtonStories: ComponentStories = {
		Twitter: {
			props: {
				iconHtml: svgIcons.twitter
			},
			listeners
		}
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let iconHtml: string;

	const dispatch = createEventDispatcher();

	/**
	 * Optional click handler
	 */
	function onClick(event: Event) {
		dispatch('click', event);
	}
</script>

<button
	type="button"
	class="inline-block p-3 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
	on:click={onClick}
>
	{@html iconHtml}
</button>
