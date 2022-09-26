<script lang="ts" context="module">
	export type ComponentStoryBooks = { [componentName: string]: ComponentStoryBook };
	export type ComponentStoryBook = {
		component: any;
		stories: ComponentStories;
	};
	export type ComponentStories = { [storyName: string]: ComponentStory };
	export type ComponentStory = {
		props: { [propName: string]: any };
	};
	export type CurrentStoryInfo = {
		currentComponent: string;
		currentStory: string;
	};
</script>

<script lang="ts">
	import SideBar from 'src/lib/SideBar.svelte';
	import Button, { buttonStories } from 'src/lib/button/Button.svelte';
	import ComponentControls from 'src/lib/componentLib/ComponentControls.svelte';

	let componentStoryBooks: ComponentStoryBooks = {
		Button: {
			component: Button,
			stories: buttonStories
		}
	};

	let currentComponentKey = Object.keys(componentStoryBooks)[0];
	let currentStoryKey = Object.keys(componentStoryBooks[currentComponentKey].stories)[0];
</script>

<svelte:head>
	<title>Component Library</title>
	<meta name="description" content="The component library for this app" />
</svelte:head>

<div class="componentLibraryContainer">
	<SideBar bind:componentStoryBooks bind:currentComponentKey bind:currentStoryKey />
	<div class="componentContainer">
		<div>
			<svelte:component
				this={componentStoryBooks[currentComponentKey].component}
				{...componentStoryBooks[currentComponentKey].stories[currentStoryKey].props}
			/>
		</div>

		<ComponentControls
			bind:componentStory={componentStoryBooks[currentComponentKey].stories[currentStoryKey]}
		/>
	</div>
</div>

<style>
	.componentLibraryContainer {
		display: grid;
		grid-template-columns: min-content 1fr;
		height: 100vh;
	}
	.componentContainer {
		margin: 16px;
		display: grid;
		grid-template-rows: 1fr min-content;
	}
</style>
