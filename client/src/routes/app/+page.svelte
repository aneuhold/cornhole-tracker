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

  const myTeams: TableData = {
    headers: ['Name', '# Completed Rounds'],
    rows: [
      ['Game 1', '3'],
      ['Game 2', '3'],
      ['Game 3', '6'],
      ['Game 4', '1']
    ]
  };

  const myCompetition: TableData = {
    headers: ['Name', '# Completed Rounds'],
    rows: [
      ['Game 1', '3'],
      ['Game 2', '3'],
      ['Game 3', '6'],
      ['Game 4', '1']
    ]
  };
</script>

<div class="appTableContainer">
  <Table
    tableDescription="Your games that aren't currently finished"
    tableData={currentlyRunningGames}
    tableTitle="Currently Running Games"
    tableClasses="bg-green-300"
  />

  <Table
    tableDescription="The teams you are on"
    tableData={currentlyRunningGames}
    tableTitle="My Teams"
    tableClasses="bg-blue-300"
  />

  <Table
    tableDescription="Teams that you have created or used in the past"
    tableData={currentlyRunningGames}
    tableTitle="My Competition"
    tableClasses="bg-yellow-300"
  />
</div>

<style>
  .appTableContainer {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin: 0.5rem;
  }
</style>
