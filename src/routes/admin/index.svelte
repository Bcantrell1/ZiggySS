<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/store/auth';
	import supabase from '$lib/supabase';

	import {
		FluidForm,
		TextInput,
		Button,
		Modal,
		InlineNotification,
		Loading
	} from 'carbon-components-svelte';

	let email = '';
	let open = false;
	let loginError = false;
	let loading = false;

	const logIn = async () => {
		try {
			loginError = false;
			loading = true;
			const { user: userDetails, error } = await supabase.auth.signIn({
				email: email
			});

			if (error) {
				loginError = true;
				loading = false;
				throw error.message;
			}
			$user = userDetails;
			loading = false;
			open = true;
		} catch (error) {
			console.log(error);
		}
	};

	if ($user) {
		goto('/admin/dashboard');
	}
</script>

{#if loading}
	<Loading />
{/if}

<FluidForm>
	<h1>Admin Login</h1>
	<TextInput labelText="Email" placeholder="Enter your email..." required bind:value={email} />
	<Button on:click={logIn}>Login</Button>
</FluidForm>

{#if loginError}
	<InlineNotification title="Error:" subtitle="Please enter a valid email" />
{/if}

{#if open}
	<Modal
		bind:open
		modalHeading="Magic has happened!"
		primaryButtonText="Confirm"
		secondaryButtonText="Cancel"
		on:click:button--secondary={() => (open = false)}
		on:click:button--primary={() => (open = false)}
	>
		<p>Please check your email for a link. 🧙🏼‍♂️</p>
	</Modal>
{/if}
