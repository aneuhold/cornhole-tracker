<!--
  @component

  A component which should be used in a Modal, that can be used to
  pick a player or create a new tempPlayer.
-->
<script lang="ts">
  import { tempPlayers } from 'src/stores/tempPlayers';
  import { user } from 'src/stores/user';
  import { users } from 'src/stores/users';
  import { createEventDispatcher } from 'svelte';
  import Button from '../Button/Button.svelte';
  import InputBox from '../InputBox/InputBox.svelte';
  import Table, { type RowData, type TableData } from '../Table/Table.svelte';

  const dispatch = createEventDispatcher();

  let searchTerm = '';

  $: cleanedSearchTerm = () => {
    return searchTerm.trim().toLowerCase();
  };

  $: foundUsers = () => {
    const cleanSearchTerm = cleanedSearchTerm();
    if (cleanSearchTerm === '') {
      return [];
    }
    return $users.filter(
      (user) =>
        user.name?.toLowerCase().includes(cleanSearchTerm) ||
        user.userName?.toLowerCase().includes(cleanSearchTerm)
    );
  };

  $: foundTempPlayers = () => {
    const cleanSearchTerm = cleanedSearchTerm();
    if (cleanSearchTerm === '') {
      return [];
    }
    return $tempPlayers.filter(
      (tempPlayer) =>
        tempPlayer.name?.toLowerCase().includes(cleanSearchTerm) ||
        tempPlayer.userName?.toLowerCase().includes(cleanSearchTerm)
    );
  };

  $: tableData = () => {
    const cleanSearchTerm = cleanedSearchTerm();
    let rowData: RowData[] = [];
    if (cleanSearchTerm !== '') {
      const foundUsersRowData: RowData[] = foundUsers().map((user) => {
        return {
          columnVals: [user.userName ? user.userName : '', user.name ? user.name : ''],
          rowClickAction: () => {
            console.log(`User with username: ${user.userName} was clicked`);
          }
        };
      });
      const foundTempPlayersRowData: RowData[] = foundTempPlayers().map((tempPlayer) => {
        return {
          columnVals: [
            tempPlayer.userName ? tempPlayer.userName : '',
            tempPlayer.name ? tempPlayer.name : ''
          ],
          rowClickAction: () => {
            console.log(`tempPlayer with username: ${tempPlayer.userName} was clicked`);
          }
        };
      });
      rowData = [...foundUsersRowData, ...foundTempPlayersRowData];
    }
    return {
      headers: ['Username', 'Name'],
      rows: rowData
    } as TableData;
  };

  console.log($users);
  console.log($user);

  $: buttonDisabled = () => {
    console.log('ran buttonDisabled');
    if (cleanedSearchTerm() === '') {
      return true;
    }
    return false;
  };

  function onCreateNewPlayer() {
    dispatch('createNewPlayer');
  }
</script>

<div class="flex flex-col gap-y-2">
  <Table tableData={tableData()} tableClasses="bg-gray-100" />
  <InputBox bind:value={searchTerm} placeHolder="Search" />
  <div class="text-left">
    <Button label="Create New Player" on:click={onCreateNewPlayer} disabled={buttonDisabled()} />
  </div>
</div>

<style>
</style>
