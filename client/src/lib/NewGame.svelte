<!--
  @component

  A new game component which displays the things needed to create a new game
  and validates the things entered.
-->
<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';

  const listeners = {
    goBack: () => {
      console.log('Go back clicked');
    },
    createNewGame: (data: any) => {
      console.log('Create new game clicked with data: ', data.detail);
    }
  };

  export const createNewGameStories: ComponentStories = {
    'With Nothing Filled': {
      props: {},
      listeners
    }
  };

  export type LoginComponentEventData = {
    userName: string;
    password: string;
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import InputBox from './InputBox.svelte';

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
