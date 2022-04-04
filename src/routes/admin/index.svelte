<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/store/auth';
	import supabase from '$lib/supabase';

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

<section class="container">
	<h1>Admin Login</h1>

	<label for="">
		Email:
		<input class="form-control" bind:value={email} type="email" placeholder="email@email.com" />
	</label>

	<button on:click={logIn}>Login</button>
</section>

<style>
	label {
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		box-sizing: border-box;
	}

	input {
		font-size: 1rem;
		border-radius: 0.55rem;
		box-shadow: inset 2px 2px 5px var(--primary-color), inset -3px -3px 7px #fff;
	}

	.form-control {
		isplay: block;
		width: 100%;
		height: calc(1.5em + 1.2rem + 0.0625rem);
		padding: 0.6rem 0.75rem;
		font-size: 1rem;
		font-weight: 300;
		line-height: 1.5;
		color: #44476a;
		background-color: #e6e7ee;
		background-clip: padding-box;
		border: 0.0625rem solid #d1d9e6;
		border-radius: 0.55rem;
		box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;
		transition: all 0.3s ease-in-out;
	}
</style>
