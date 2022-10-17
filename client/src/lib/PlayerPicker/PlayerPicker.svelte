<!--
  @component

  A component which should be used in a Modal, that can be used to
  pick a player or create a new tempPlayer.
-->
<script lang="ts">
  import type { ObjectId } from 'bson';
  import { tempPlayers } from 'src/stores/tempPlayers';
  import { user } from 'src/stores/user';
  import { users } from 'src/stores/users';
  import type Player from 'src/_shared/types/Player';
  import { createEventDispatcher } from 'svelte';
  import Button from '../Button/Button.svelte';
  import InputBox from '../InputBox/InputBox.svelte';
  import Table, { type RowData, type TableData } from '../Table/Table.svelte';

  const dispatch = createEventDispatcher<{
    createNewPlayer: { userName: string };
    chooseUser: { id: ObjectId };
    chooseTempPlayer: { id: ObjectId };
  }>();

  export let includeCurrentUser = true;

  let searchTerm = '';

  $: cleanedSearchTerm = () => {
    return searchTerm.trim().toLowerCase();
  };

  $: userMatchesSearch = () => {
    const cleanSearchTerm = cleanedSearchTerm();
    if (
      cleanSearchTerm === '' ||
      $user.userName?.toLowerCase().includes(cleanSearchTerm) ||
      $user.name?.toLowerCase().includes(cleanSearchTerm)
    ) {
      return true;
    }
    return false;
  };

  $: foundUsers = () => {
    const cleanSearchTerm = cleanedSearchTerm();
    if (cleanSearchTerm === '') {
      return [];
    }
    return $users.filter(createPlayerFilterFunction(cleanSearchTerm));
  };

  $: foundTempPlayers = () => {
    const cleanSearchTerm = cleanedSearchTerm();
    if (cleanSearchTerm === '') {
      return [];
    }
    return $tempPlayers.filter(createPlayerFilterFunction(cleanSearchTerm));
  };

  $: tableData = () => {
    const cleanSearchTerm = cleanedSearchTerm();
    let rowData: RowData[] = [];
    if (includeCurrentUser && $user && userMatchesSearch()) {
      rowData.push({
        columnVals: [$user.userName ? $user.userName : '', $user.name ? $user.name : ''],
        rowClickAction: () => {
          onChooseUser($user._id);
        }
      });
    }
    if (cleanSearchTerm !== '') {
      const foundUsersRowData: RowData[] = foundUsers().map((user) => {
        return {
          columnVals: [user.userName ? user.userName : '', user.name ? user.name : ''],
          rowClickAction: () => {
            console.log(`User with username: ${user.userName} was clicked`);
          }
        };
      });
      rowData.push(...foundUsersRowData);
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
      rowData.push(...foundTempPlayersRowData);
    }
    return {
      headers: ['Username', 'Name'],
      rows: rowData
    } as TableData;
  };

  $: buttonDisabled = () => {
    console.log('ran buttonDisabled');
    if (cleanedSearchTerm() === '') {
      return true;
    }
    if (
      foundUsers().find((user) => user.userName?.toLowerCase() === cleanedSearchTerm()) ||
      foundTempPlayers().find(
        (tempPlayer) => tempPlayer.userName?.toLowerCase() === cleanedSearchTerm()
      )
    ) {
      return true;
    }
    return false;
  };

  function createPlayerFilterFunction(cleanSearchTerm: string) {
    return (player: Partial<Player>) => {
      player.name?.toLowerCase().includes(cleanSearchTerm) ||
        player.userName?.toLowerCase().includes(cleanSearchTerm);
    };
  }

  function onCreateNewPlayer() {
    dispatch('createNewPlayer', { userName: searchTerm.trim() });
  }

  function onChooseUser(userId: ObjectId) {
    dispatch('chooseUser', { id: userId });
  }

  function onChooseTempPlayer(tempPlayerId: ObjectId) {
    dispatch('chooseTempPlayer', { id: tempPlayerId });
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
