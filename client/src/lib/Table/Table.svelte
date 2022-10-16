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
  import IconButton, { IconSize } from '../IconButton/IconButton.svelte';
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

  /**
   * A variable that stores if the options button was clicked. This is used
   * to override functionality pertaining to the row click handler.
   */
  let optionsWasClicked = false;

  const dialogId = crypto.randomUUID();

  function handleInfoButtonClick() {
    openDialog(dialogId);
  }

  function handleOptionsButtonClick() {
    optionsWasClicked = true;
    console.log('Options button clicked');
  }

  function createRowClickHandler(rowData: RowData) {
    return () => {
      if (optionsWasClicked) {
        optionsWasClicked = false;
      } else {
        rowData.rowClickAction();
      }
    };
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
      <div class="tableRowData font-bold">
        {#each tableData.headers as header}
          <span>{header}</span>
        {/each}
      </div>
    </div>
    <div class="tableRows">
      {#each tableData.rows as rowData}
        <button
          class="bg-white rounded-md shadow-md hover:shadow-lg tableRow"
          on:click={createRowClickHandler(rowData)}
        >
          <div class="tableRowData">
            {#each rowData.columnVals as columnValue}
              <span class="px-6 py-4">{columnValue}</span>
            {/each}
          </div>
          <div>
            <IconButton
              iconInfo={svgIcons.options}
              iconSize={IconSize.medium}
              primary={false}
              raisedHeight={RaisedHeight.none}
              on:click={handleOptionsButtonClick}
            />
          </div>
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
    grid-template-columns: 1fr 50px;
    align-items: center;
    padding-right: theme.$standard-spacing;

    .tableRowData {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
    }
  }

  .centerText {
    text-align: center;
  }
</style>
