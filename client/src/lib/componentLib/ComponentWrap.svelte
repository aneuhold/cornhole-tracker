<script lang="ts">
	export let component: ConstructorOfATypedSvelteComponent;
</script>

<template>
	<svelte:component this={component} />
	<p>This will be some controls for the component</p>
</template>
