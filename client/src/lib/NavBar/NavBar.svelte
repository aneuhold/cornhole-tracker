<!--
  @component

  A NavBar component that can be used to show the logged in status of a user
  and the menu for more options. 
-->
<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import { RaisedHeight } from 'src/util/styleEnums';
  import svgIcons from 'src/util/svgIcons';
  import { createEventDispatcher } from 'svelte';
  import Button from '../Button/Button.svelte';
</script>

<script lang="ts">
  import IconButton, { IconSize } from '../IconButton/IconButton.svelte';

  /**
   * If a username is provided, then the user is considered logged in.
   */
  export let username: string = '';

  let menuOpen = false;

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
    <div class="absolute top-2.5 right-2.5">
      <IconButton
        raisedHeight={RaisedHeight.none}
        buttonColor={false}
        iconSize={IconSize.small}
        iconInfo={svgIcons.closeIcon}
        on:click={toggleMenu}
      />
    </div>
    <div class="menuItems">
      <Button primary={true} label="Logout" on:click={onLogOutClick} />
    </div>
  </div>
{/if}

<ul class="rounded p-4 bg-blue-200 items-center gap-x-2 navBar">
  <IconButton iconInfo={svgIcons.menu} on:click={toggleMenu} raisedHeight={RaisedHeight.none} />
  <h1 class="siteTitle text-lg">Cornhole Tracker</h1>
  {#if username !== ''}
    <span class="userInfo">{username}</span>
  {:else}
    <div class="userInfo">
      <Button label="Login" primary={true} on:click={onLoginClick} />
    </div>
  {/if}
</ul>

<style>
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
