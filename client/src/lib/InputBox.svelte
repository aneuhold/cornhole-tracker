<script lang="ts" context="module">
	import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';

	export const inputBoxStories: ComponentStories = {
		'With PlaceHolder': {
			props: {
				value: '',
				placeHolder: 'Some example placeholder'
			}
		}
	};
</script>

<script lang="ts">
	export let value = '';
	export let placeHolder = 'Example';
</script>

<input
	class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
	placeholder={placeHolder}
	bind:value
/>
