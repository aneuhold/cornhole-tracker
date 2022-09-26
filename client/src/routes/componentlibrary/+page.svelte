<script lang="ts" context="module">
	export type ComponentStoryBooks = { [componentName: string]: ComponentStoryBook };
	export type ComponentStoryBook = {
		component: any;
		stories: ComponentStories;
	};
	export type ComponentStories = { [storyName: string]: ComponentStory };
	export type ComponentStory = {
		props: { [propName: string]: any };
		listeners?: { [eventName: string]: Function };
	};
	export type CurrentStoryInfo = {
		currentComponent: string;
		currentStory: string;
	};
</script>

<script lang="ts">
	import SideBar from 'src/lib/componentLib/SideBar.svelte';
	import Button, { buttonStories } from 'src/lib/Button.svelte';
	import ComponentControls from 'src/lib/componentLib/ComponentControls.svelte';

	let componentStoryBooks: ComponentStoryBooks = {
		Button: {
			component: Button,
			stories: buttonStories
		}
	};

	let componentInstance: any;
	let currentComponentKey = Object.keys(componentStoryBooks)[0];
	let currentStoryKey = Object.keys(componentStoryBooks[currentComponentKey].stories)[0];
	let eventListenerRemovers: Function[] = [];

	$: currentComponent = componentStoryBooks[currentComponentKey].component;
	$: currentStory = componentStoryBooks[currentComponentKey].stories[currentStoryKey];

	$: if (componentInstance && currentStory.listeners) {
		// Remove any current event listeners
		if (eventListenerRemovers.length !== 0) {
			eventListenerRemovers.forEach((remove) => {
				remove();
			});
			eventListenerRemovers = [];
		}
		// Now add the new ones
		for (let [key, listener] of Object.entries(currentStory.listeners)) {
			eventListenerRemovers.push(componentInstance.$on(key, listener));
		}
	}
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
				this={currentComponent}
				{...currentStory.props}
				bind:this={componentInstance}
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
