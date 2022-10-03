<script lang="ts">
  import { user } from 'src/stores/user';
  import { onMount } from 'svelte';

  // Checking the username happens in onMount so that the window is
  // available.
  onMount(async () => {
    // Return the unsubscribe function that is returned, because that is called
    // in an onDestroy when the component goes away.
    return user.subscribe((updatedUser) => {
      if (!updatedUser.userName) {
        window.location.href = '/login';
      } else {
        window.location.href = '/app';
      }
    });
  });
</script>
