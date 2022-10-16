<script lang="ts" context="module">
  import type { ComponentProps, SvelteComponent } from 'svelte';
  export type ComponentStoryBooks = {
    [componentName: string]: ComponentStoryBook<SvelteComponent>;
  };
  export type ComponentStoryBook<TComponent extends SvelteComponent> = {
    component: any;
    stories: ComponentStories<TComponent>;
  };
  export type ComponentStories<TComponent extends SvelteComponent> = {
    [storyName: string]: ComponentStory<TComponent>;
  };
  export type ComponentStory<TComponent extends SvelteComponent> = {
    props: ComponentProps<TComponent>;
    listeners?: { [eventName: string]: Function };
  };
  export type CurrentStoryInfo = {
    currentComponent: string;
    currentStory: string;
  };
</script>

<script lang="ts">
  import SideBar from 'src/lib/componentLib/SideBar.svelte';
  import Button from 'src/lib/Button/Button.svelte';
  import ComponentControls from 'src/lib/componentLib/ComponentControls.svelte';
  import InputBox from 'src/lib/InputBox/InputBox.svelte';
  import Login from 'src/lib/Login/Login.svelte';
  import IconButton from 'src/lib/IconButton/IconButton.svelte';
  import NavBar from 'src/lib/NavBar/NavBar.svelte';
  import Table from 'src/lib/Table/Table.svelte';
  import CreateNewAccount from 'src/lib/CreateNewAccount/CreateNewAccount.svelte';
  import NewGame from 'src/lib/NewGame/NewGame.svelte';
  import FabDialer from 'src/lib/FabDialer/FabDialer.svelte';
  import { tableStories } from 'src/lib/Table/Table.stories.svelte';
  import { createNewAccountStories } from 'src/lib/CreateNewAccount/CreateNewAccount.stories.svelte';
  import { iconButtonStories } from 'src/lib/IconButton/IconButton.stories.svelte';
  import { fabDialerStories } from 'src/lib/FabDialer/FabDialer.stories.svelte';
  import { createNewGameStories } from 'src/lib/NewGame/NewGame.stories.svelte';
  import { navBarStories } from 'src/lib/NavBar/NavBar.stories.svelte';
  import { loginStories } from 'src/lib/Login/Login.stories.svelte';
  import { buttonStories } from 'src/lib/Button/Button.stories.svelte';
  import { inputBoxStories } from 'src/lib/InputBox/InputBox.stories.svelte';
  import TeamPicker from 'src/lib/TeamPicker/TeamPicker.svelte';
  import { teamPickerStories } from 'src/lib/TeamPicker/TeamPicker.stories.svelte';

  let componentStoryBooks: ComponentStoryBooks = {
    TeamPicker: {
      component: TeamPicker,
      stories: teamPickerStories
    },
    Table: {
      component: Table,
      stories: tableStories
    },
    FabDialer: {
      component: FabDialer,
      stories: fabDialerStories
    },
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
