<script lang="ts">
	import type { ComponentStoryBooks } from 'src/routes/componentlibrary/+page.svelte';

	export let currentComponentKey: string;

	/**
	 * The list of links that should be displayed.
	 */
	export let currentStoryKey: string;

	/**
	 * Can be used to bind to to determine what has been clicked.
	 */
	export let componentStoryBooks: ComponentStoryBooks;

	const linkClasses =
		'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700';

	function createClickHandler(componentName: string, storyName: string) {
		return () => {
			currentComponentKey = componentName;
			currentStoryKey = storyName;
		};
	}
</script>

<template>
	<aside class="w-64" aria-label="Sidebar">
		<div class="overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
			<ul class="space-y-2">
				{#each Object.entries(componentStoryBooks) as [componentName, storyBook]}
					<li>
						<span class={linkClasses}>{componentName}</span>
						<ul>
							{#each Object.keys(storyBook.stories) as storyName}
								<li>
									<button
										on:click={createClickHandler(componentName, storyName)}
										class={linkClasses}
									>
										<span class="ml-3">{`- ${storyName}`}</span>
									</button>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
</template>
