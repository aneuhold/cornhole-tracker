<script lang="ts" context="module">
	import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';

	export const navBarStories: ComponentStories = {
		'Logged In': {
			props: {}
		}
	};
</script>

<ul class="flex">
	<li class="mr-6">
		<a class="text-blue-500 hover:text-blue-800" href="#">Active</a>
	</li>
	<li class="mr-6">
		<a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
	</li>
	<li class="mr-6">
		<a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
	</li>
	<li class="mr-6">
		<a class="text-gray-400 cursor-not-allowed" href="#">Disabled</a>
	</li>
</ul>
