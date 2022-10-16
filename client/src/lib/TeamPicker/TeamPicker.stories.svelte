<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type TeamPicker from './TeamPicker.svelte';

  const listeners = {
    createNewTeam: () => {
      console.log('Create new team clicked: ');
    }
  };

  export const teamPickerStories: ComponentStories<TeamPicker> = {
    Basic: {
      props: {},
      listeners
    }
  };
</script>
