<!--
  @component

  A NavBar component that can be used to show the logged in status of a user
  and the menu for more options. 
-->
<script lang="ts" context="module">
	import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
	import svgIcons from 'src/util/svgIcons';

	export const navBarStories: ComponentStories = {
		'Logged In': {
			props: {}
		}
	};
</script>

<script lang="ts">
	import IconButton from './IconButton.svelte';

	let menuOpen = false;

	const menuItemClasses =
		'flex items-center p-2 text-base font-normal text-gray-700 rounded-lg hover:bg-gray-100';

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<!-- drawer component -->
{#if menuOpen}
	<div
		id="drawer-example"
		class="fixed z-40 h-screen p-4 overflow-y-auto w-80 bg-blue-300 transition"
		tabindex="-1"
		aria-labelledby="drawer-label"
	>
		<h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-black">
			Menu
		</h5>
		<button
			type="button"
			aria-controls="drawer-example"
			class="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center text-gray-700"
			on:click={toggleMenu}
		>
			{@html svgIcons.closeIcon}
			<span class="sr-only">Close menu</span>
		</button>
		<p class={menuItemClasses}>This is a test</p>
	</div>
{/if}

<ul class="flex rounded p-4 bg-blue-200 flex-row items-center gap-x-2">
	<IconButton iconHtml={svgIcons.menu} on:click={toggleMenu} />
	<h1>Cornhole Tracker</h1>
</ul>
