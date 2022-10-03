<script lang="ts">
  import NavBar from 'src/lib/NavBar.svelte';
  import { user } from 'src/stores/user';
  import { onDestroy } from 'svelte';

  let userName: string;

  const unsubscibeFromUserInfo = user.subscribe((updatedUser) => {
    if (updatedUser?.userName) {
      userName = updatedUser.userName;
    }
  });

  function handleLogout() {
    user.set({});
    window.location.href = '/login';
  }

  onDestroy(unsubscibeFromUserInfo);
</script>

<svelte:head>
  <title>Cornhole Tracker</title>
  <meta name="description" content="App for keeping track of cornhole scores" />
</svelte:head>

<NavBar username={userName} on:logout={handleLogout} />

<slot />
