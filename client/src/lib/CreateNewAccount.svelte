<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';

  const listeners = {
    submit: (data: any) => {
      console.log('Submit clicked with data: ', data.detail);
    }
  };

  export const createNewAccountStories: ComponentStories = {
    'With Nothing Filled': {
      props: {},
      listeners
    }
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import InputBox from './InputBox.svelte';

  let userName = '';
  let password1 = '';
  let password2 = '';
  $: passwordsMatch = password1 === password2 && password1 !== '';

  const dispatch = createEventDispatcher();

  /**
   * Optional click handler
   */
  function onSubmit() {
    if (passwordsMatch) {
      dispatch('submit', { userName, password1 });
    }
  }
</script>

<div class="mx-auto createAccountContainer max-w-md my-6">
  <form>
    <h2 class="text-lg">Create a new account</h2>
    <div
      class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
    />

    <div class="px-4 py-2">
      <InputBox autoCompleteTags="username" placeHolder="Username" bind:value={userName} />
    </div>

    <div class="px-4 py-2">
      <InputBox
        autoCompleteTags="current-password"
        placeHolder="Password"
        password={true}
        bind:value={password1}
      />
    </div>

    <div class="px-4 py-2">
      <InputBox
        autoCompleteTags="current-password"
        placeHolder="Retype Password"
        password={true}
        bind:value={password2}
      />
    </div>

    <div class="text-center mt-2">
      <Button
        disabled={!passwordsMatch}
        label="Create Account"
        on:click={onSubmit}
        primary={true}
      />
    </div>
  </form>
</div>

<style>
  .createAccountContainer {
    width: 100%;
  }
</style>
