<script lang="ts" context="module">
  export type ComponentStoryBooks = { [componentName: string]: ComponentStoryBook };
  export type ComponentStoryBook = {
    component: any;
    stories: ComponentStories;
  };
  export type ComponentStories = { [storyName: string]: ComponentStory };
  export type ComponentStory = {
    props: { [propName: string]: any };
    listeners?: { [eventName: string]: Function };
  };
  export type CurrentStoryInfo = {
    currentComponent: string;
    currentStory: string;
  };
</script>

<script lang="ts">
  import SideBar from 'src/lib/componentLib/SideBar.svelte';
  import Button, { buttonStories } from 'src/lib/Button.svelte';
  import ComponentControls from 'src/lib/componentLib/ComponentControls.svelte';
  import InputBox, { inputBoxStories } from 'src/lib/InputBox.svelte';
  import Login, { loginStories } from 'src/lib/Login.svelte';
  import IconButton, { iconButtonStories } from 'src/lib/IconButton.svelte';
  import NavBar, { navBarStories } from 'src/lib/NavBar.svelte';
  import Table, { tableStories } from 'src/lib/Table.svelte';
  import CreateNewAccount, { createNewAccountStories } from 'src/lib/CreateNewAccount.svelte';
  import NewGame, { createNewGameStories } from 'src/lib/NewGame.svelte';

  let componentStoryBooks: ComponentStoryBooks = {
    NewGame: {
      component: NewGame,
      stories: createNewGameStories
    },
    NavBar: {
      component: NavBar,
      stories: navBarStories
    },
    Login: {
      component: Login,
      stories: loginStories
    },
    CreateNewAccount: {
      component: CreateNewAccount,
      stories: createNewAccountStories
    },
    IconButton: {
      component: IconButton,
      stories: iconButtonStories
    },
    Button: {
      component: Button,
      stories: buttonStories
    },
    InputBox: {
      component: InputBox,
      stories: inputBoxStories
    },
    Table: {
      component: Table,
      stories: tableStories
    }
  };

  let componentInstance: any;
  let currentComponentKey = Object.keys(componentStoryBooks)[0];
  let currentStoryKey = Object.keys(componentStoryBooks[currentComponentKey].stories)[0];
  let eventListenerRemovers: Function[] = [];

  $: currentComponent = componentStoryBooks[currentComponentKey].component;
  $: currentStory = componentStoryBooks[currentComponentKey].stories[currentStoryKey];

  $: if (componentInstance && currentStory.listeners) {
    // Remove any current event listeners
    if (eventListenerRemovers.length !== 0) {
      eventListenerRemovers.forEach((remove) => {
        remove();
      });
      eventListenerRemovers = [];
    }
    // Now add the new ones
    for (let [key, listener] of Object.entries(currentStory.listeners)) {
      eventListenerRemovers.push(componentInstance.$on(key, listener));
    }
  }
</script>

<svelte:head>
  <title>Component Library</title>
  <meta name="description" content="The component library for this app" />
</svelte:head>

<div class="componentLibraryContainer">
  <SideBar bind:componentStoryBooks bind:currentComponentKey bind:currentStoryKey />
  <div class="componentContainer">
    <div>
      <svelte:component
        this={currentComponent}
        {...currentStory.props}
        bind:this={componentInstance}
      />
    </div>
    <ComponentControls
      bind:componentStory={componentStoryBooks[currentComponentKey].stories[currentStoryKey]}
    />
  </div>
</div>

<style>
  .componentLibraryContainer {
    display: grid;
    grid-template-columns: min-content 1fr;
    height: 100vh;
  }
  .componentContainer {
    margin: 16px;
    display: grid;
    grid-template-rows: 1fr min-content;
  }
</style>
