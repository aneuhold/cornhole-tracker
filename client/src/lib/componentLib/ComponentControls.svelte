<script lang="ts">
	import type { ComponentStory } from 'src/routes/componentlibrary/+layout.svelte';

	export let componentStory: ComponentStory;

	function createStringHandler(propName: string) {
		return (event: Event) => {
			const element = event.target as HTMLInputElement;
			componentStory.props[propName] = element.value;
		};
	}

	function createBooleanHandler(propName: string) {
		return (event: Event) => {
			const element = event.target as HTMLInputElement;
			componentStory.props[propName] = element.checked;
		};
	}

	const stringInputClasses =
		'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
</script>

<table class="table-auto componentLibTable centerText">
	<thead>
		<tr class="border-b">
			<th>Property Name</th>
			<th>Type</th>
			<th>Value</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(componentStory.props) as [propName, propValue]}
			<tr class="border-b">
				<td class="px-6 py-4">{propName}</td>
				<td>{typeof propValue}</td>
				<td>
					{#if typeof propValue === 'string'}
						<input
							class={stringInputClasses}
							on:input={createStringHandler(propName)}
							value={propValue}
						/>
					{:else if typeof propValue === 'boolean'}
						<input type="checkbox" on:click={createBooleanHandler(propName)} checked={propValue} />
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.componentLibTable {
		width: 100%;
	}
	.centerText {
		text-align: center;
	}
</style>
