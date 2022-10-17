<script lang="ts">
  import Login, { type LoginComponentEventData } from 'src/lib/Login/Login.svelte';
  import { user } from 'src/stores/user';
  import { RoutePath, routeTo } from 'src/util/routing';
  import User from 'src/_shared/types/User';

  function handleLogin(event: CustomEvent<LoginComponentEventData>) {
    console.log(`Logging in with user with username: ${event.detail.userName}`);
    user.set(new User(event.detail.userName));
    routeTo(RoutePath.app);
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
