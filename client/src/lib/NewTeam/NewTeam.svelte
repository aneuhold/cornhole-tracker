<!--
  @component

  A new game component which displays the things needed to create a new team
  and validates the things entered.
-->
<script lang="ts">
  import { ButtonColor, RaisedHeight } from 'src/util/styleEnums';
  import svgIcons from 'src/util/svgIcons';
  import { createEventDispatcher } from 'svelte';
  import Button from '../Button/Button.svelte';
  import IconButton from '../IconButton/IconButton.svelte';
  import InputBox from '../InputBox/InputBox.svelte';
  import Modal, { closeDialog, openDialog } from '../Modal.svelte';

  let teamName = '';

  const dispatch = createEventDispatcher();
  const pointsToWinDialogId = 'pointsToWin';

  function onGoBack() {
    dispatch('goBack');
  }

  function handlePointsToWinClick() {
    openDialog(pointsToWinDialogId);
  }

  function closePointsToWinDialog() {
    closeDialog(pointsToWinDialogId);
  }

  /**
   * Optional click handler
   */
  function onCreateNewTeam() {
    dispatch('createNewTeam');
  }
</script>

<div class="createNewGameContainer my-6">
  <div class="text-start">
    <IconButton
      iconInfo={svgIcons.back}
      buttonColor={ButtonColor.standard}
      raisedHeight={RaisedHeight.small}
      on:click={onGoBack}
    />
  </div>

  <div class="mx-auto max-w-md flex flex-col gap-y-3">
    <h2 class="text-2xl">New Team</h2>
    <InputBox value={teamName} placeHolder="Team Name" label="Team Name" />
    <div class="mt-4">
      <Button label="Create New Team" primary={true} on:click={onCreateNewTeam} />
    </div>
  </div>
</div>

<style>
  .createNewGameContainer {
    width: 100%;
  }
</style>
