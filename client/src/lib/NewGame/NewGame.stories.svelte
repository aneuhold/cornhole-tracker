<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type NewGame from './NewGame.svelte';

  const listeners = {
    goBack: () => {
      console.log('Go back clicked');
    },
    createNewGame: (data: any) => {
      console.log('Create new game clicked with data: ', data.detail);
    }
  };

  export const createNewGameStories: ComponentStories<NewGame> = {
    'With Nothing Filled': {
      props: {},
      listeners
    }
  };
</script>
