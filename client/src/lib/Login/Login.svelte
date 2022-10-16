<!--
  @component

  A component that shows a login prompt for the user.
-->
<script lang="ts" context="module">
  export type LoginComponentEventData = {
    userName: string;
    password: string;
  };
</script>

<script lang="ts">
  import svgIcons from 'src/util/svgIcons';
  import { createEventDispatcher } from 'svelte';
  import Button from '../Button/Button.svelte';
  import IconButton from '../IconButton/IconButton.svelte';
  import InputBox from '../InputBox/InputBox.svelte';

  let userName = '';
  let password = '';

  const dispatch = createEventDispatcher<{
    submit: LoginComponentEventData;
    createAccount: LoginComponentEventData;
  }>();

  /**
   * Optional click handler
   */
  function onSubmit() {
    dispatch('submit', { userName, password });
  }

  function onCreateAccount() {
    dispatch('createAccount', { userName, password });
  }
</script>

<div class="mx-auto loginContainer max-w-md my-6">
  <form>
    <div class="flex flex-row items-center justify-center">
      <p class="text-lg mb-0 mr-4">Sign in with</p>
      <IconButton iconInfo={svgIcons.facebook} />
      <IconButton iconInfo={svgIcons.twitter} />
      <IconButton iconInfo={svgIcons.linkedIn} />
    </div>

    <div
      class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
    >
      <p class="text-center font-semibold mx-4 mb-0">Or</p>
    </div>

    <div class="px-4 py-2">
      <InputBox autoCompleteTags="username" placeHolder="Username" bind:value={userName} />
    </div>

    <div class="px-4 py-2">
      <InputBox
        autoCompleteTags="current-password"
        placeHolder="Password"
        password={true}
        on:enterPressed={onSubmit}
        bind:value={password}
      />
    </div>

    <div class="text-center mt-2">
      <Button label="Login" on:click={onSubmit} primary={true} />
      <p class="text-sm font-semibold mt-2 pt-1 mb-0">
        Don't have an account?
        <a
          href="/createaccount"
          on:click={onCreateAccount}
          class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
        >
          Register
        </a>
      </p>
    </div>
  </form>
</div>

<style>
  .loginContainer {
    width: 100%;
  }
</style>
