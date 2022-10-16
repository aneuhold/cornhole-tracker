<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import svgIcons from 'src/util/svgIcons';
  import type FabDialer from './FabDialer.svelte';

  const listeners = {
    click: () => {
      console.log('Button was clicked');
    }
  };

  export const fabDialerStories: ComponentStories<FabDialer> = {
    Primary: {
      props: {
        dialerOptions: [
          {
            iconInfo: svgIcons.info,
            onClickAction: () => {
              console.log('option 1 clicked');
            }
          },
          {
            iconInfo: svgIcons.info,
            onClickAction: () => {
              console.log('option 1 clicked');
            }
          },
          {
            iconInfo: svgIcons.info,
            onClickAction: () => {
              console.log('option 1 clicked');
            }
          },
          {
            iconInfo: svgIcons.info,
            onClickAction: () => {
              console.log('option 1 clicked');
            }
          }
        ]
      },
      listeners
    }
  };
</script>
