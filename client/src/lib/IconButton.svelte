<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import svgIcons from 'src/util/svgIcons';

  const listeners = {
    click: () => {
      console.log('Icon Button was clicked');
    }
  };

  export const iconButtonStories: ComponentStories = {
    Twitter: {
      props: {
        iconHtml: svgIcons.twitter
      },
      listeners
    },
    'Non Primary': {
      props: {
        iconHtml: svgIcons.twitter,
        primary: false
      },
      listeners
    }
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let iconHtml: string;

  export let primary = true;

  export let raised = true;

  const dispatch = createEventDispatcher();

  const standardIconButtonClasses =
    'inline-block p-3 font-medium text-xs leading-tight uppercase rounded-full focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mx-1';

  const raisedClasses = raised ? 'shadow-md hover:shadow-lg' : '';

  const colorClasses = primary
    ? 'active:bg-blue-800 fill-white bg-blue-500 hover:bg-blue-700'
    : 'active:bg-gray-800 border-blue-500 fill-blue-500 bg-white hover:border-transparent hover:bg-gray-300';

  /**
   * Optional click handler
   */
  function onClick(event: Event) {
    dispatch('click', event);
  }
</script>

<button
  type="button"
  class={standardIconButtonClasses + ' ' + colorClasses + ' ' + raisedClasses}
  on:click={onClick}
>
  {@html iconHtml}
</button>
