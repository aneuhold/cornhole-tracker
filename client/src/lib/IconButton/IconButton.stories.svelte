<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import { ButtonColor, RaisedHeight } from 'src/util/styleEnums';
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
        buttonColor: ButtonColor.primary,
        iconSize: IconSize.medium
      },
      listeners
    },
    'Non Primary': {
      props: {
        iconInfo: svgIcons.twitter,
        buttonColor: ButtonColor.standard,
        iconSize: IconSize.medium
      },
      listeners
    },
    Transparent: {
      props: {
        iconInfo: svgIcons.twitter,
        buttonColor: ButtonColor.transparent,
        iconSize: IconSize.medium
      },
      listeners
    },
    Small: {
      props: {
        iconInfo: svgIcons.twitter,
        buttonColor: ButtonColor.standard,
        iconSize: IconSize.small
      },
      listeners
    },
    Medium: {
      props: {
        iconInfo: svgIcons.twitter,
        buttonColor: ButtonColor.standard,
        iconSize: IconSize.medium
      },
      listeners
    },
    Large: {
      props: {
        iconInfo: svgIcons.twitter,
        buttonColor: ButtonColor.standard,
        iconSize: IconSize.large
      },
      listeners
    },
    'No raised height': {
      props: {
        iconInfo: svgIcons.twitter,
        buttonColor: ButtonColor.standard,
        raisedHeight: RaisedHeight.none,
        iconSize: IconSize.medium
      },
      listeners
    },
    'Small raised height': {
      props: {
        iconInfo: svgIcons.twitter,
        buttonColor: ButtonColor.standard,
        raisedHeight: RaisedHeight.small,
        iconSize: IconSize.medium
      },
      listeners
    },
    'High raised height': {
      props: {
        iconInfo: svgIcons.twitter,
        buttonColor: ButtonColor.standard,
        raisedHeight: RaisedHeight.high,
        iconSize: IconSize.medium
      },
      listeners
    }
  };
</script>
