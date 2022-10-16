<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import { RaisedHeight } from 'src/util/styleEnums';
  import svgIcons from 'src/util/svgIcons';
  import type IconButton from './IconButton.svelte';
  import { IconSize } from './IconButton.svelte';

  const listeners = {
    click: () => {
      console.log('Icon Button was clicked');
    }
  };

  export const iconButtonStories: ComponentStories<IconButton> = {
    Twitter: {
      props: {
        iconInfo: svgIcons.twitter,
        primary: true,
        iconSize: IconSize.medium
      },
      listeners
    },
    'Non Primary': {
      props: {
        iconInfo: svgIcons.twitter,
        primary: false,
        iconSize: IconSize.medium
      },
      listeners
    },
    Small: {
      props: {
        iconInfo: svgIcons.twitter,
        primary: true,
        iconSize: IconSize.small
      },
      listeners
    },
    Medium: {
      props: {
        iconInfo: svgIcons.twitter,
        primary: true,
        iconSize: IconSize.medium
      },
      listeners
    },
    Large: {
      props: {
        iconInfo: svgIcons.twitter,
        primary: true,
        iconSize: IconSize.large
      },
      listeners
    },
    'No raised height': {
      props: {
        iconInfo: svgIcons.twitter,
        primary: false,
        raisedHeight: RaisedHeight.none,
        iconSize: IconSize.medium
      },
      listeners
    },
    'Small raised height': {
      props: {
        iconInfo: svgIcons.twitter,
        primary: false,
        raisedHeight: RaisedHeight.small,
        iconSize: IconSize.medium
      },
      listeners
    },
    'High raised height': {
      props: {
        iconInfo: svgIcons.twitter,
        primary: false,
        raisedHeight: RaisedHeight.high,
        iconSize: IconSize.medium
      },
      listeners
    }
  };
</script>
