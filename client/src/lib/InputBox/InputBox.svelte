<!--
  @component

  A simple input box.

	When `enter` is pressed, the `enterPressed` event is emitted.
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value: string | number = '';
  export let placeHolder = 'Example';
  export let password = false;
  export let label = '';

  /**
   * A boolean that can be used to tell the input box that the currently
   * entered value is invalid. This will update the style of the input box.
   */
  export let isInvalid = false;

  /**
   * The tags for autocomplete that will be applied to the input. This helps
   * browsers find out what the input is for.
   */
  export let autoCompleteTags = '';

  const dispatch = createEventDispatcher();

  const handleKeypress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch('enterPressed');
    }
  };

  $: inputClasses = () => {
    let inputClasses =
      'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none transition ease-in-out focus:shadow-outline';
    if (isInvalid) {
      inputClasses +=
        ' bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500';
    } else {
      inputClasses += ' text-gray-700 focus:text-gray-700 focus:bg-white focus:border-blue-600';
    }
    return inputClasses;
  };
</script>

<div>
  {#if label !== ''}
    <label for={placeHolder} class="block text-sm font-medium text-gray-600 text-left"
      >{label}</label
    >
  {/if}
  {#if password}
    <input
      class={inputClasses()}
      autocomplete={autoCompleteTags}
      placeholder={placeHolder}
      id={placeHolder}
      type="password"
      on:keypress={handleKeypress}
      bind:value
    />
  {:else if typeof value === 'number'}
    <input
      type="number"
      class={inputClasses()}
      placeholder={placeHolder}
      id={placeHolder}
      on:keypress={handleKeypress}
    />
  {:else}
    <input
      class={inputClasses()}
      autocomplete={autoCompleteTags}
      placeholder={placeHolder}
      id={placeHolder}
      on:keypress={handleKeypress}
      bind:value
    />
  {/if}
</div>
