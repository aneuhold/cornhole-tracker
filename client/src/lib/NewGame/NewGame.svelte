<!--
  @component

  A new game component which displays the things needed to create a new game
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

  let gameName = '';
  let pointsToWin = 21;

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
  function onCreateNewGame() {
    dispatch('createNewGame');
  }
</script>

<div class="createNewGameContainer my-6">
  <div class="text-start">
    <IconButton
      iconInfo={svgIcons.back}
      buttonColor={ButtonColor.standard}
      raisedHeight={RaisedHeight.small}
    />
  </div>

  <div class="mx-auto max-w-md flex flex-col gap-y-3">
    <h2 class="text-2xl">New Game</h2>
    <InputBox value={gameName} placeHolder="Game Name" label="Game Name" />
    <div class="flex-row">
      <span>Points to win: </span>
      <Button label={pointsToWin} on:click={handlePointsToWinClick} />
    </div>
  </div>
  <Modal dialogId={pointsToWinDialogId} modalTitle="Points to Win">
    <div class="flex flex-col gap-y-3">
      <InputBox
        bind:value={pointsToWin}
        placeHolder="Points to Win"
        on:enterPressed={closePointsToWinDialog}
      />
      <div>
        <Button label="Done" on:click={closePointsToWinDialog} />
      </div>
    </div>
  </Modal>
</div>

<style>
  .createNewGameContainer {
    width: 100%;
  }
</style>
