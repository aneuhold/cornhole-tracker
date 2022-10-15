<script lang="ts" context="module">
  import type { ComponentStories, ComponentStory } from 'src/routes/componentlibrary/+page.svelte';
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

  function generateTableData(numHeaders: number, numRows: number): TableData {
    const headers: string[] = [];
    for (let i = 0; i < numHeaders; i++) {
      headers.push(`Test Header ${i + 1}`);
    }
    const rows: RowData[] = [];
    for (let row = 0; row < numRows; row++) {
      const columnVals: string[] = [];
      for (let column = 0; column < numHeaders; column++) {
        columnVals.push(`data ${column + 1}`);
      }
      rows.push({
        columnVals: columnVals,
        rowClickAction: () => {
          console.log(`row ${row} clicked`);
        }
      });
    }
    return {
      headers: headers,
      rows: rows
    };
  }

  export const tableStories: ComponentStories = {
    'With Small Amount of Data': {
      props: {
        tableData: generateTableData(3, 4)
      }
    },
    'With Title': {
      props: {
        tableTitle: 'Some Test Title',
        tableClasses: 'bg-blue-100',
        tableData: generateTableData(3, 5)
      }
    },
    'With a lot of data': {
      props: {
        tableTitle: 'Some Test Title',
        tableClasses: 'bg-green-100',
        tableDescription: 'This is a test table with a lot of data',
        tableData: generateTableData(3, 22)
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
  export let tableClasses: string = '';

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
          raisedHeight={RaisedHeight.none}
          iconHtml={svgIcons.info}
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
        <div class="bg-white rounded-md shadow-md tableRow">
          {#each rowData.columnVals as columnValue}
            <span class="px-6 py-4">{columnValue}</span>
          {/each}
        </div>
      {/each}
    </div>
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
  .tableContent {
    display: flex;
    flex-direction: column;
  }
  .tableRows {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
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
