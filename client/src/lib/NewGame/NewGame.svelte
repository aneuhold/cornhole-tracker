<!--
  @component

  A new game component which displays the things needed to create a new game
  and validates the things entered.
-->
<script lang="ts">
  import { RaisedHeight } from 'src/util/styleEnums';
  import svgIcons from 'src/util/svgIcons';
  import { createEventDispatcher } from 'svelte';
  import IconButton from '../IconButton/IconButton.svelte';
  import InputBox from '../InputBox/InputBox.svelte';
  import Modal from '../Modal.svelte';

  let gameName = '';
  let pointsToWin = 21;

  const dispatch = createEventDispatcher();

  function onGoBack() {
    dispatch('goBack');
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
    <IconButton iconInfo={svgIcons.back} primary={false} raisedHeight={RaisedHeight.small} />
  </div>

  <div class="mx-auto max-w-md">
    <h2 class="text-2xl">New Game</h2>
    <InputBox value={gameName} placeHolder="Game Name" label="Game Name" />
    <div class="flex-row">
      <span>Points to win: </span>
    </div>
  </div>
  <Modal dialogId="pointsToWin" modalTitle="Points to Win">
    <InputBox value={pointsToWin} />
  </Modal>
</div>

<style>
  .createNewGameContainer {
    width: 100%;
  }
</style>
