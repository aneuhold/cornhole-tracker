<!--
  @component

  A simple input box.

	When `enter` is pressed, the `enterPressed` event is emitted.
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value = '';
  export let placeHolder = 'Example';
  export let password = false;

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

  const inputClasses =
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:shadow-outline transition ease-in-out';
</script>

{#if password}
  <input
    class={inputClasses}
    autocomplete={autoCompleteTags}
    placeholder={placeHolder}
    type="password"
    on:keypress={handleKeypress}
    bind:value
  />
{:else}
  <input
    class={inputClasses}
    autocomplete={autoCompleteTags}
    placeholder={placeHolder}
    on:keypress={handleKeypress}
    bind:value
  />
{/if}
