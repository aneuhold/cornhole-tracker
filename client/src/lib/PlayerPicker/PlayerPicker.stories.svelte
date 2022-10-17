<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type PlayerPicker from './PlayerPicker.svelte';

  const listeners = {
    createNewPlayer: () => {
      console.log('Create new player clicked');
    },
    chooseUser: (data: any) => {
      console.log('Choose user activated with data: ', data.detail);
    },
    chooseTempPlayer: (data: any) => {
      console.log('Choose tempPlayer activated with data: ', data.detail);
    }
  };

  export const playerPickerStories: ComponentStories<PlayerPicker> = {
    Basic: {
      props: {},
      listeners
    }
  };
</script>
