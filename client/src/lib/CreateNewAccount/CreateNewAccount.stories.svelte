<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type CreateNewAccount from './CreateNewAccount.svelte';

  const listeners = {
    submit: (data: any) => {
      console.log('Submit clicked with data: ', data.detail);
    }
  };

  export const createNewAccountStories: ComponentStories<CreateNewAccount> = {
    'With Nothing Filled': {
      props: {},
      listeners
    }
  };
</script>
