<script lang="ts" context="module">
	import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
	import svgIcons from 'src/util/svgIcons';

	export type TableData = {
		headers: string[];
		rows: string[][];
	};

	export const tableStories: ComponentStories = {
		'With Small Amount of Data': {
			props: {
				tableData: {
					headers: ['Test header 1', 'Test header 2', 'Test header 3'],
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
				tableClasses: 'bg-blue-100',
				tableData: {
					headers: ['test header 1', 'test header 2', 'test header 3'],
					rows: [
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3']
					]
				}
			}
		},
		'With a lot of data': {
			props: {
				tableTitle: 'Some Test Title',
				tableClasses: 'bg-green-100',
				tableDescription: 'This is a test table with a lot of data',
				tableData: {
					headers: ['test header 1', 'test header 2', 'test header 3'],
					rows: [
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
						['data 1', 'data 2', 'data 3'],
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
	import IconButton from './IconButton.svelte';
	import Modal, { openDialog } from './Modal.svelte';

	export let tableData: TableData;

	/**
	 * Optional title for the table.
	 */
	export let tableTitle: string;

	/**
	 * The description for the table.
	 */
	export let tableDescription: string;

	/**
	 * Optional classes for the table title. This can be used to color them.
	 */
	export let tableClasses: string;

	const dialogId = crypto.randomUUID();

	function handleInfoButtonClick() {
		openDialog(dialogId);
	}
</script>

<div class={tableClasses + ' rounded-xl px-3 pb-3'}>
	<div class="tableHeader">
		{#if tableTitle}
			<h3 class="rounded-lg p-2 text-lg mr-auto">{tableTitle}</h3>
		{/if}
		{#if tableDescription}
			<div class="m-3">
				<IconButton
					primary={false}
					raised={false}
					iconHtml={svgIcons.info}
					on:click={handleInfoButtonClick}
				/>
			</div>
			<Modal {dialogId} modalTitle={tableTitle}>{tableDescription}</Modal>
		{/if}
	</div>
	<div class="scrollArea">
		<table class="table-auto table centerText bg-white rounded-lg">
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
	</div>
</div>

<style>
	.table {
		width: 100%;
	}
	.tableHeader {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: auto;
	}
	.scrollArea {
		/* To make sure that the height doesn't get too large and it scrolls. */
		max-height: 100vh;
		overflow-y: scroll;
	}
	.centerText {
		text-align: center;
	}
</style>
