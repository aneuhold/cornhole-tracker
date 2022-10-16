<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type NavBar from './NavBar.svelte';

  const listeners = {
    loginClick: () => {
      console.log('Login button was clicked');
    },
    logout: () => {
      console.log('Logout clicked');
    }
  };

  export const navBarStories: ComponentStories<NavBar> = {
    'Logged In': {
      props: {
        username: 'Some User'
      }
    },
    'Not Logged In': {
      props: {},
      listeners
    }
  };
</script>
