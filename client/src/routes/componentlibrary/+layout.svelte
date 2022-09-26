<script lang="ts">
	import SideBar, { type Link } from '$lib/SideBar.svelte';

	const links: Link[] = [
		{
			href: 'componentlibrary/button',
			text: 'Button'
		}
	];
</script>

<svelte:head>
	<title>Component Library</title>
	<meta name="description" content="The component library for this app" />
</svelte:head>

<div class="componentLibraryContainer">
	<SideBar {links} />
	<div class="componentContainer">
		<slot />
	</div>
</div>

<style>
	.componentLibraryContainer {
		display: grid;
		grid-template-columns: min-content 1fr;
	}
	.componentContainer {
		margin: 16px;
	}
</style>
