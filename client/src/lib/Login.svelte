<script lang="ts" context="module">
	import type { ComponentStories } from 'src/routes/componentlibrary/+page.svelte';

	const listeners = {
		submit: (data: any) => {
			console.log('Submit clicked with data: ', data.detail);
		},
		createAccount: (data: any) => {
			console.log('Create account clicked with data: ', data.detail);
		}
	};

	export const loginStories: ComponentStories = {
		'With Nothing Filled': {
			props: {},
			listeners
		}
	};
</script>

<script lang="ts">
	import svgIcons from 'src/util/svgIcons';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import IconButton from './IconButton.svelte';
	import InputBox from './InputBox.svelte';

	let emailAddress = '';
	let password = '';

	const dispatch = createEventDispatcher();

	/**
	 * Optional click handler
	 */
	function onSubmit() {
		dispatch('submit', { emailAddress, password });
	}

	function onCreateAccount() {
		dispatch('createAccount', { emailAddress, password });
	}
</script>

<div class="mb-12 md:mb-0 mx-auto loginContainer max-w-md">
	<form>
		<div class="flex flex-row items-center justify-center">
			<p class="text-lg mb-0 mr-4">Sign in with</p>
			<IconButton iconHtml={svgIcons.facebook} />
			<IconButton iconHtml={svgIcons.twitter} />
			<IconButton iconHtml={svgIcons.linkedIn} />
		</div>

		<div
			class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
		>
			<p class="text-center font-semibold mx-4 mb-0">Or</p>
		</div>

		<div class="px-4 py-2">
			<InputBox autoCompleteTags="username" placeHolder="Email address" bind:value={emailAddress} />
		</div>

		<div class="px-4 py-2">
			<InputBox
				autoCompleteTags="current-password"
				placeHolder="Password"
				password={true}
				bind:value={password}
			/>
		</div>

		<div class="text-center mt-2">
			<Button label="Login" on:click={onSubmit} primary={true} />
			<p class="text-sm font-semibold mt-2 pt-1 mb-0">
				Don't have an account?
				<button
					on:click={onCreateAccount}
					class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
				>
					Register
				</button>
			</p>
		</div>
	</form>
</div>

<style>
	.loginContainer {
		width: 100%;
	}
</style>
