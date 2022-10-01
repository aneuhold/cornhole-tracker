<script lang="ts" context="module">
	import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';

	export type TableData = {
		headers: string[];
		rows: string[][];
	};

	export const tableStories: ComponentStories = {
		'With Small Amount of Data': {
			props: {
				tableData: {
					headers: ['test header 1', 'test header 2', 'test header 3'],
					rows: [
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3']
					]
				}
			}
		},
		'With Title': {
			props: {
				tableTitle: 'Some Test Title',
				tableTitleClasses: 'bg-blue-100',
				tableData: {
					headers: ['test header 1', 'test header 2', 'test header 3'],
					rows: [
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3']
					]
				}
			}
		}
	};
</script>

<script lang="ts">
	export let tableData: TableData;

	/**
	 * Optional title for the table.
	 */
	export let tableTitle: string;

	/**
	 * Optional classes for the table title. This can be used to color them.
	 */
	export let tableTitleClasses: string;
</script>

<div />
{#if tableTitle}
	<h3 class={tableTitleClasses + ' rounded-lg p-2 text-lg'}>{tableTitle}</h3>
{/if}
<table class="table-auto table centerText bg-slate-200 rounded-lg">
	<thead>
		<tr class="border-b border-black">
			{#each tableData.headers as header}
				<th>{header}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each tableData.rows as rowData}
			<tr class="border-b border-black">
				{#each rowData as rowValue}
					<td class="px-6 py-4">{rowValue}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.table {
		width: 100%;
	}
	.centerText {
		text-align: center;
	}
</style>
