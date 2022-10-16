<!--
  @component

  A component which should be used in a Modal, that can be used to
  pick a team.
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '../Button/Button.svelte';
  import Table, { type TableData } from '../Table/Table.svelte';

  const dispatch = createEventDispatcher();

  const tableData: TableData = {
    rows: [
      {
        columnVals: ['test', 'test'],
        rowClickAction: () => {
          console.log('row clicked');
        }
      }
    ]
  };

  /**
   * Optional click handler
   */
  function onCreateNewTeam() {
    dispatch('createNewTeam');
  }
</script>

<div class="flex flex-col gap-y-2">
  <Table {tableData} tableClasses="bg-gray-100" />
  <div class="text-left">
    <Button label="Create New Team" on:click={onCreateNewTeam} />
  </div>
</div>

<style>
</style>
