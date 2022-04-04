<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/store/auth';
	import supabase from '$lib/supabase';

	import {
    FluidForm,
    TextInput,
	Button
  } from "carbon-components-svelte";

	let email = '';

	const logIn = async () => {
		try {
			const { user: userDetails, error } = await supabase.auth.signIn({
				email: email
			});

			if (error) throw error;
			$user = userDetails;
			alert('Check your email for a magic link! 🧙🏼‍♂️');
		} catch (error) {
			console.log(error);
		}
	};

	if ($user) {
		goto('/admin/dashboard');
	}
</script>

<FluidForm>
	<h1>Admin Login</h1>
	<TextInput labelText="Email" placeholder="Enter your email..." required bind:value={email} />
	<Button on:click={logIn}>Login</Button>
</FluidForm>