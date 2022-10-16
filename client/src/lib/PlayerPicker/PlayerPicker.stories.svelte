<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type PlayerPicker from './PlayerPicker.svelte';

  const listeners = {
    createNewPlayer: () => {
      console.log('Create new player clicked');
    }
  };

  export const playerPickerStories: ComponentStories<PlayerPicker> = {
    Basic: {
      props: {},
      listeners
    }
  };
</script>
