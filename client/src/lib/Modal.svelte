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
  import { ButtonColor, RaisedHeight } from 'src/util/styleEnums';

  import svgIcons from 'src/util/svgIcons';
  import IconButton from './IconButton/IconButton.svelte';

  export let modalTitle = 'Confirm';

  /**
   * The ID of the dialog so it can be individually identified.
   */
  export let dialogId: string;

  function closeThisDialog() {
    closeDialog(dialogId);
  }
</script>

<dialog id={dialogId} class="rounded-md shadow-md flex-col pt-0">
  <div class="border-b-2 mb-2 pt-2 dialogHeader">
    <h3 class="text-lg">{modalTitle}</h3>
    <IconButton
      iconInfo={svgIcons.closeIcon}
      buttonColor={ButtonColor.transparent}
      on:click={closeThisDialog}
      raisedHeight={RaisedHeight.none}
    />
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
