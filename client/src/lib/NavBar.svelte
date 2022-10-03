<!--
  @component

  A NavBar component that can be used to show the logged in status of a user
  and the menu for more options. 
-->
<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import svgIcons from 'src/util/svgIcons';
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  const listeners = {
    loginClick: () => {
      console.log('Login button was clicked');
    },
    logout: () => {
      console.log('Logout clicked');
    }
  };

  export const navBarStories: ComponentStories = {
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

<script lang="ts">
  import IconButton from './IconButton.svelte';

  /**
   * If a username is provided, then the user is considered logged in.
   */
  export let username: string;

  let menuOpen = false;

  const menuItemClasses =
    'flex items-center p-2 text-base font-normal text-gray-700 rounded-lg hover:bg-gray-100';

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  const dispatch = createEventDispatcher();

  /**
   * Optional click handler
   */
  function onLoginClick() {
    dispatch('loginClick');
  }

  function onLogOutClick() {
    dispatch('logout');
  }
</script>

<!-- drawer component -->
{#if menuOpen}
  <div
    class="fixed z-40 h-screen p-4 overflow-y-auto w-80 bg-blue-300 transition"
    tabindex="-1"
    aria-labelledby="drawer-label"
  >
    <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-black">
      Cornhole Tracker
    </h5>
    <button
      type="button"
      class="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center text-gray-700"
      on:click={toggleMenu}
    >
      {@html svgIcons.closeIcon}
      <span class="sr-only">Close menu</span>
    </button>
    <div class="menuItems">
      <Button primary={true} label="Logout" on:click={onLogOutClick} />
    </div>
  </div>
{/if}

<ul class="rounded p-4 bg-blue-200 items-center gap-x-2 navBar">
  <IconButton iconHtml={svgIcons.menu} on:click={toggleMenu} />
  <h1 class="site-title text-lg">Cornhole Tracker</h1>
  {#if username}
    <span class="userInfo">{username}</span>
  {:else}
    <div class="userInfo">
      <Button label="Login" primary={true} on:click={onLoginClick} />
    </div>
  {/if}
</ul>

<style lang="scss">
  .navBar {
    display: grid;
    grid-template-areas: 'menu-button site-title user-info';
    grid-template-columns: min-content max-content 1fr;
  }

  .siteTitle {
    white-space: nowrap;
    grid-area: site-title;
  }

  .userInfo {
    grid-area: user-info;
    justify-self: end;
  }

  .menuItems {
    display: flex;
    flex-direction: column;
  }
</style>
