<script lang="ts" context="module">
  import { RaisedHeight } from 'src/util/styleEnums';
  import type { SvgIconInfo } from 'src/util/svgIcons';

  export enum IconSize {
    /**
     * 20px x 20px
     */
    small,
    medium,
    large
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let iconInfo: SvgIconInfo;

  export let primary = true;

  export let raisedHeight: RaisedHeight = RaisedHeight.small;

  export let iconSize: IconSize = IconSize.medium;

  const dispatch = createEventDispatcher();

  $: buttonClasses = () => {
    let iconButtonClasses =
      'inline-block font-medium text-xs leading-tight uppercase rounded-full focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out';
    // Size related classes
    switch (iconSize) {
      case IconSize.small:
        iconButtonClasses += ' p-2';
        break;
      case IconSize.medium:
      case IconSize.large:
        iconButtonClasses += ' p-3';
        break;
    }
    // Color related classes
    if (primary) {
      iconButtonClasses += ' active:bg-blue-800 fill-white bg-blue-500 hover:bg-blue-700';
    } else {
      iconButtonClasses +=
        ' active:bg-gray-800 border-blue-500 fill-blue-500 bg-white hover:border-transparent hover:bg-gray-300';
    }
    // Height related classes
    switch (raisedHeight) {
      case RaisedHeight.none:
        break;
      case RaisedHeight.small:
        iconButtonClasses += ' shadow-md hover:shadow-lg';
        break;
      case RaisedHeight.high:
        iconButtonClasses += ' shadow-lg hover:shadow-xl';
        break;
    }
    return iconButtonClasses;
  };

  $: iconDimension = () => {
    switch (iconSize) {
      case IconSize.small:
        return '15';
      case IconSize.medium:
        return '20';
      case IconSize.large:
        return '30';
    }
  };

  /**
   * Optional click handler
   */
  function onClick(event: Event) {
    dispatch('click', event);
  }
</script>

<button type="button" class={buttonClasses()} on:click={onClick}>
  <svg
    height={iconDimension()}
    width={iconDimension()}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={iconInfo.viewBox}
  >
    {@html iconInfo.path}
  </svg>
  <span class="sr-only">Close menu</span>
</button>
