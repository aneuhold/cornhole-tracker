<!--
  @component

  A Modal that can be used to display information or get info from the user.
  Content can be provided as a slot to this component.
-->
<script lang="ts" context="module">
	export interface DialogElement extends HTMLElement {
		close: () => void;
		showModal: () => void;
	}

	export function closeDialog(dialogId: string) {
		const dialogElement = document.getElementById(dialogId) as DialogElement;
		dialogElement.close();
	}

	export function openDialog(dialogId: string) {
		const dialogElement = document.getElementById(dialogId) as DialogElement;
		dialogElement.showModal();
	}
</script>

<script lang="ts">
	import svgIcons from 'src/util/svgIcons';

	export let modalTitle = 'Confirm';

	/**
	 * The ID of the dialog so it can be individually identified.
	 */
	export let dialogId: string;

	function closeThisDialog() {
		closeDialog(dialogId);
	}
</script>

<dialog id={dialogId} class="rounded-md shadow-md flex-col">
	<div class="border-b-2 mb-2 dialogHeader">
		<h3 class="text-lg">{modalTitle}</h3>

		<button
			type="button"
			class="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 items-center text-gray-700"
			on:click={closeThisDialog}
		>
			{@html svgIcons.closeIcon}
			<span class="sr-only">Close dialog</span>
		</button>
	</div>
	<slot />
</dialog>

<style>
	.dialogHeader {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: auto min-content;
		align-items: center;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
</style>
