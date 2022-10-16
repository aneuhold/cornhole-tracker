<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type InputBox from './InputBox.svelte';

  export const inputBoxStories: ComponentStories<InputBox> = {
    Standard: {
      props: {
        value: '',
        placeHolder: 'Some example placeholder',
        label: '',
        isInvalid: false
      }
    },
    Password: {
      props: {
        value: '',
        placeHolder: 'Password',
        password: true,
        label: '',
        isInvalid: false
      }
    },
    'With Label': {
      props: {
        value: '',
        placeHolder: 'Username',
        password: false,
        label: 'Username',
        isInvalid: false
      }
    },
    'Number Input': {
      props: {
        value: 32,
        placeHolder: 'Points to win',
        password: false,
        label: '',
        isInvalid: false
      }
    },
    'Invalid input': {
      props: {
        value: -1,
        placeHolder: 'Points to win',
        password: false,
        label: '',
        isInvalid: true
      }
    }
  };
</script>
