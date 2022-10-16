<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type Button from './Button.svelte';

  const listeners = {
    click: () => {
      console.log('Button was clicked');
    }
  };

  export const buttonStories: ComponentStories<Button> = {
    Primary: {
      props: {
        label: 'Primary Button',
        primary: true
      },
      listeners
    },
    'Non Primary': {
      props: {
        label: 'Secondary Button'
      },
      listeners
    },
    'Disabled Primary': {
      props: {
        label: 'Disabled Button',
        disabled: true,
        primary: true
      },
      listeners
    },
    'Disabled Secondary': {
      props: {
        label: 'Disabled Button',
        disabled: true,
        primary: false
      },
      listeners
    }
  };
</script>
