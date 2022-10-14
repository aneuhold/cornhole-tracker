<!--
  @component

  A material design FAB button with a dialer functionality. 

  Code copied from [here](https://jh3y.medium.com/how-to-create-the-speed-dial-style-floating-action-button-from-material-design-b30d49f9a0ff).
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
        label: 'Primary Button',
        primary: true
      },
      listeners
    }
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  /**
   * If the button should be the primary color
   */
  export let primary = false;

  export let disabled = false;

  const plusIconHtml = svgIcons.info;

  $: buttonClasses = () => {
    let returnString = 'font-bold py-2 px-4 rounded-full';
    if (primary) {
      returnString += ' bg-blue-500 text-white';
      if (!disabled) {
        returnString += ' hover:bg-blue-700';
      }
    } else {
      returnString +=
        ' bg-transparent text-blue-700 font-semibold border-blue-500 hover:border-transparent';
      if (!disabled) {
        returnString += ' hover:bg-blue-500 hover:text-white';
      }
    }
    if (disabled) {
      returnString += ' opacity-50 cursor-not-allowed';
    } else {
      returnString += ' active:bg-blue-800 shadow-md';
    }
    return returnString;
  };

  const dispatch = createEventDispatcher();

  /**
   * Optional click handler
   */
  function onClick(event: Event) {
    if (!disabled) {
      dispatch('click', event);
    }
  }
</script>

<div class="mdl-button--fab_flinger-container" id="fab_ctn">
  <button
    class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
    id="fab_btn"><i>{@html plusIconHtml}</i></button
  >
  <div class="mdl-button--fab_flinger-options">
    <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"
      ><i class="material-icons">{@html plusIconHtml}</i></button
    >
    <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
      <i class="material-icons">{@html plusIconHtml}</i>
    </button>
    <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
      <i class="material-icons">{@html plusIconHtml}</i>
    </button>
  </div>
</div>

<style>
  .mdl-button--fab_flinger-container {
    position: fixed;
    bottom: 100px;
    right: 100px;
  }

  .mdl-button--fab_flinger-container.is-showing-options > button i {
    -webkit-transition: -webkit-transform 0.1s linear;
    transition: transform 0.1s linear;
    -webkit-transform: translate(-12px, -12px) rotate(45deg);
    -ms-transform: translate(-12px, -12px) rotate(45deg);
    transform: translate(-12px, -12px) rotate(45deg);
  }

  .mdl-button--fab_flinger-container.is-showing-options .mdl-button--fab_flinger-options {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -webkit-flex-direction: column-reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .mdl-button--fab_flinger-container.is-showing-options .mdl-button--fab_flinger-options button {
    display: block;
    -webkit-animation-name: enter;
    animation-name: enter;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-duration: 0.1s;
    animation-duration: 0.1s;
    -webkit-transform-origin: bottom center;
    -ms-transform-origin: bottom center;
    transform-origin: bottom center;
  }

  .mdl-button--fab_flinger-container.is-showing-options
    .mdl-button--fab_flinger-options
    button:nth-of-type(1) {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .mdl-button--fab_flinger-container.is-showing-options
    .mdl-button--fab_flinger-options
    button:nth-of-type(2) {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .mdl-button--fab_flinger-container.is-showing-options
    .mdl-button--fab_flinger-options
    button:nth-of-type(3) {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .mdl-button--fab_flinger-container.is-showing-options
    .mdl-button--fab_flinger-options
    button:nth-of-type(4) {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .mdl-button--fab_flinger-container.is-showing-options
    .mdl-button--fab_flinger-options
    button:nth-of-type(5) {
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }

  .mdl-button--fab_flinger-container.is-showing-options
    .mdl-button--fab_flinger-options
    button:nth-of-type(6) {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }

  .mdl-button--fab_flinger-container .mdl-button--fab_flinger-options {
    position: absolute;
    bottom: 100%;
    margin-bottom: 10px;
  }

  .mdl-button--fab_flinger-container .mdl-button--fab_flinger-options button {
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    display: none;
  }

  @-webkit-keyframes enter {
    from {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    to {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
    }
  }

  @keyframes enter {
    from {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    to {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
    }
  }
</style>
