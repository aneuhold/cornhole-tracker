<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type NewTeam from './NewTeam.svelte';

  const listeners = {
    goBack: () => {
      console.log('Go back clicked');
    },
    createNewTeam: (data: any) => {
      console.log('Create new team clicked with data: ', data.detail);
    }
  };

  export const createNewTeamStories: ComponentStories<NewTeam> = {
    'With Nothing Filled': {
      props: {},
      listeners
    }
  };
</script>
