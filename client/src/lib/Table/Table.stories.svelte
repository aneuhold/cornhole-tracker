<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type { RowData, TableData } from './Table.svelte';

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
