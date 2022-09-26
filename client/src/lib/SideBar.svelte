<script lang="ts" context="module">
	export type Link = {
		href: string;
		text: string;
	};
</script>

<script lang="ts">
	export let links: Link[];
	const linkClasses =
		'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700';
</script>

<template>
	<aside class="w-64" aria-label="Sidebar">
		<div class="overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
			<ul class="space-y-2">
				{#each links as link}
					<li>
						<a href={link.href} class={linkClasses}>
							<span class="ml-3">{link.text}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
</template>
