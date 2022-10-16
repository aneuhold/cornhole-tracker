<script lang="ts" context="module">
  import { RaisedHeight } from 'src/util/styleEnums';
  import svgIcons from 'src/util/svgIcons';

  export type TableData = {
    headers: string[];
    rows: RowData[];
  };

  export type RowData = {
    columnVals: string[];
    rowClickAction: () => void;
  };
</script>

<script lang="ts">
  import IconButton from '../IconButton/IconButton.svelte';
  import Modal, { openDialog } from '../Modal.svelte';

  export let tableData: TableData;

  /**
   * Optional title for the table.
   */
  export let tableTitle: string = '';

  /**
   * The description for the table.
   */
  export let tableDescription: string = '';

  /**
   * Optional classes for the table title. This can be used to color them.
   */
  export let tableClasses: string = '';

  const dialogId = crypto.randomUUID();

  function handleInfoButtonClick() {
    openDialog(dialogId);
  }

  function handleOptionsButtonClick(event: Event) {
    event.stopPropagation();
    console.log('this is a test');
  }
</script>

<div class={tableClasses + ' rounded-xl px-3 pb-3'}>
  <div class="tableHeader">
    {#if tableTitle !== ''}
      <h3 class="rounded-lg p-2 text-lg mr-auto">{tableTitle}</h3>
    {/if}
    {#if tableDescription !== ''}
      <div class="m-3">
        <IconButton
          primary={false}
          raisedHeight={RaisedHeight.none}
          iconInfo={svgIcons.info}
          on:click={handleInfoButtonClick}
        />
      </div>
      <Modal {dialogId} modalTitle={tableTitle}>{tableDescription}</Modal>
    {/if}
  </div>
  <div class="scrollArea tableContent">
    <div class="tableDataHeaders tableRow">
      {#each tableData.headers as header}
        <span>{header}</span>
      {/each}
    </div>
    <div class="tableRows">
      {#each tableData.rows as rowData}
        <button
          class="bg-white rounded-md shadow-md hover:shadow-lg tableRow"
          on:click={rowData.rowClickAction}
        >
          {#each rowData.columnVals as columnValue}
            <span class="px-6 py-4">{columnValue}</span>
          {/each}
          <IconButton iconInfo={svgIcons.options} on:click={handleOptionsButtonClick} />
        </button>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @use '../../globalStyles/theme.scss' as theme;

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
    max-height: 75vh;
    overflow-y: auto;
  }
  .tableContent {
    display: flex;
    flex-direction: column;
  }
  .tableRows {
    display: flex;
    flex-direction: column;
    row-gap: theme.$standard-spacing;
    padding-top: theme.$standard-spacing;
    padding-bottom: theme.$standard-spacing;
  }
  .tableRow {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }
  .centerText {
    text-align: center;
  }
</style>