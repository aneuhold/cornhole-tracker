<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';

  const listeners = {
    click: () => {
      console.log('Button was clicked');
    }
  };

  export const buttonStories: ComponentStories = {
    Primary: {
      props: {
        label: 'Primary Button',
        primary: true
      },
      listeners
    },
    'Non Primary': {
      props: {
        label: 'Secondary Button'
      },
      listeners
    },
    'Disabled Primary': {
      props: {
        label: 'Disabled Button',
        disabled: true,
        primary: true
      },
      listeners
    },
    'Disabled Secondary': {
      props: {
        label: 'Disabled Button',
        disabled: true,
        primary: false
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

  /**
   * Button contents
   */
  export let label = 'Button';

  export let disabled = false;

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

<button {disabled} type="button" class={buttonClasses()} on:click={onClick}>
  {label}
</button>
