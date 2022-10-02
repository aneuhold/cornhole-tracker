<script lang="ts">
  import '../app.css';
  import '../globalStyles/global.scss';
</script>

<main>
  <slot />
</main>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
  }
</style>
