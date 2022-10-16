<!--
  @component

  A new game component which displays the things needed to create a new game
  and validates the things entered.
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import InputBox from '../InputBox/InputBox.svelte';

  let gameName = '';

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

<div class="mx-auto createNewGameContainer max-w-md my-6">
  <h2>New Game</h2>
  <span>Points to win: </span>
  <span>Game Name</span>
  <InputBox value={gameName} />
</div>

<style>
  .createNewGameContainer {
    width: 100%;
  }
</style>
