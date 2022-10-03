<script lang="ts">
  import { goto } from '$app/navigation';
  import Login, { type LoginComponentEventData } from 'src/lib/Login.svelte';
  import { user } from 'src/stores/user';

  function handleLogin(event: CustomEvent<LoginComponentEventData>) {
    console.log(`Logging in with user with username: ${event.detail.userName}`);
    user.set({ userName: event.detail.userName });
    goto('/login', { replaceState: true });
  }
</script>

<div class="loginContainer">
  <Login on:submit={handleLogin} />
</div>

<style>
  .loginContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
