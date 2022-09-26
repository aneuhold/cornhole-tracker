<script lang="ts">
	import Button from 'src/lib/button/Button.svelte';

	let buttonProps: { [propName: string]: any } = {
		label: 'test'
	};

	function createUpdatePropFunction(propName: string) {
		return (event: Event) => {
			buttonProps[propName] = event?.target?.value;
		};
	}
</script>

<Button {...buttonProps} />

<table class="table-auto componentLibTable">
	<thead>
		<tr>
			<th>Property Name</th>
			<th>Type</th>
			<th>Value</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(buttonProps) as prop}
			<tr>
				<td>{prop[0]}</td>
				<td>{typeof prop[1]}</td>
				<td><input on:change={createUpdatePropFunction(prop[0])} value={prop[1]} /></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.componentLibTable {
		width: 100%;
	}
</style>
