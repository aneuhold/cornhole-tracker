<!--
  @component

  A material design FAB button with a dialer functionality. 

  Code copied from [here](https://jh3y.medium.com/how-to-create-the-speed-dial-style-floating-action-button-from-material-design-b30d49f9a0ff)
  then modified.
-->
<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import svgIcons from 'src/util/svgIcons';

  const listeners = {
    click: () => {
      console.log('Button was clicked');
    }
  };

  export const fabDialerStories: ComponentStories = {
    Primary: {
      props: {
        dialerOptions: [
          {
            iconHtml: svgIcons.info,
            onClickAction: () => {
              console.log('option 1 clicked');
            }
          },
          {
            iconHtml: svgIcons.info,
            onClickAction: () => {
              console.log('option 1 clicked');
            }
          },
          {
            iconHtml: svgIcons.info,
            onClickAction: () => {
              console.log('option 1 clicked');
            }
          },
          {
            iconHtml: svgIcons.info,
            onClickAction: () => {
              console.log('option 1 clicked');
            }
          }
        ]
      },
      listeners
    }
  };

  export type DialerOptions = DialerOption[];
  export type DialerOption = {
    iconHtml: string;
    onClickAction: () => void;
  };
</script>

<script lang="ts">
  import IconButton from './IconButton.svelte';

  export let dialerOptions: DialerOptions;

  let dialerOpen = false;
  let dialerHasBeenOpened = false;

  $: fabButtonClasses = () => {
    const baseClass = 'fabButton';
    if (dialerHasBeenOpened && !dialerOpen) {
      return `${baseClass} closeFabButtonAnimation`;
    } else if (dialerOpen) {
      return `${baseClass} openFabButtonAnimation`;
    }
    return baseClass;
  };

  $: optionsContainerClasses = () => {
    const baseClass = 'fabOptions';
    if (dialerOpen) {
      return `${baseClass} showOptions`;
    }
    return baseClass;
  };

  function onClick() {
    dialerHasBeenOpened = true;
    dialerOpen = !dialerOpen;
  }
</script>

<div class="fabContainer">
  <div class={fabButtonClasses()}>
    <IconButton iconHtml={svgIcons.addMedium} on:click={onClick} />
  </div>

  <div class={optionsContainerClasses()}>
    {#each dialerOptions as option}
      <div class="fabOption">
        <IconButton iconHtml={option.iconHtml} on:click={option.onClickAction} />
      </div>
    {/each}
  </div>
</div>

<style>
  .fabContainer {
    position: fixed;
    bottom: 36px;
    right: 36px;
  }
  .fabOptions {
    display: flex;
    flex-direction: column-reverse;
    /* Not really sure what the wizardry below is doing */
    position: absolute;
    bottom: 100%;
    margin-bottom: 10px;
    /* Okay end of wizardry */
  }
  .openFabButtonAnimation {
    transition: transform 0.1s linear;
    transform: rotate(45deg);
  }
  .closeFabButtonAnimation {
    transition: transform 0.1s linear;
    transform: rotate(0deg);
  }
  .fabOption {
    transform: scale(0);
    display: none;
  }
  .fabOptions.showOptions .fabOption {
    display: block;
    animation-name: enter;
    animation-fill-mode: forwards;
    animation-duration: 0.1s;
    transform-origin: bottom center;
  }
  .fabOptions.showOptions .fabOption:nth-of-type(1) {
    animation-delay: 0.1s;
  }
  .fabOptions.showOptions .fabOption:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  .fabOptions.showOptions .fabOption:nth-of-type(3) {
    animation-delay: 0.3s;
  }
  .fabOptions.showOptions .fabOption:nth-of-type(4) {
    animation-delay: 0.4s;
  }
  .fabOptions.showOptions .fabOption:nth-of-type(5) {
    animation-delay: 0.5s;
  }
  .fabOptions.showOptions .fabOption:nth-of-type(6) {
    animation-delay: 0.6s;
  }

  @keyframes enter {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(0.8);
    }
  }
</style>
