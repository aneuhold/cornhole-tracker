<script lang="ts" context="module">
  import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';
  import type InputBox from './InputBox.svelte';

  export const inputBoxStories: ComponentStories<InputBox> = {
    Standard: {
      props: {
        value: '',
        placeHolder: 'Some example placeholder'
      }
    },
    Password: {
      props: {
        value: '',
        placeHolder: 'Password',
        password: true
      }
    }
  };
</script>
