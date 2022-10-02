<script lang="ts">
  import Table, { type TableData } from '$lib/Table.svelte';

  const currentlyRunningGames: TableData = {
    headers: ['Name', '# Completed Rounds'],
    rows: [
      ['Game 1', '3'],
      ['Game 2', '3'],
      ['Game 3', '6'],
      ['Game 4', '1']
    ]
  };
</script>

<div class="flex-col m-2">
  <Table
    tableDescription="Your games that aren't currently finished"
    tableData={currentlyRunningGames}
    tableTitle="Currently Running Games"
    tableClasses="bg-green-300"
  />
</div>
