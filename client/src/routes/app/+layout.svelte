<script lang="ts">
  import NavBar from 'src/lib/NavBar.svelte';
  import { userInfo } from 'stores/userInfo';
  import { onDestroy } from 'svelte';

  let userName: string;

  const unsubscibeFromUserInfo = userInfo.subscribe((updatedUser) => {
    if (updatedUser?.userName) {
      userName = updatedUser.userName;
    }
  });

  onDestroy(unsubscibeFromUserInfo);
</script>

<svelte:head>
  <title>Cornhole Tracker</title>
  <meta name="description" content="App for keeping track of cornhole scores" />
</svelte:head>

<NavBar username={userName} />

<slot />
