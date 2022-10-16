<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type Login from './Login.svelte';

  const listeners = {
    submit: (data: any) => {
      console.log('Submit clicked with data: ', data.detail);
    },
    createAccount: (data: any) => {
      console.log('Create account clicked with data: ', data.detail);
    }
  };

  export const loginStories: ComponentStories<Login> = {
    'With Nothing Filled': {
      props: {},
      listeners
    }
  };
</script>
