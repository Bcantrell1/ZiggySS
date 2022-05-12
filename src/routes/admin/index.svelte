<script>
	// Framework Imports
	import { goto } from '$app/navigation';
	import { user } from '$lib/store/auth';

	// DB services
	import supabase from '$lib/supabase';

	// 3rd party libs
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';

	// Component variables
	let loginError = false;
	let loading = false;

	const validationSchema = yup.object().shape({
		email: yup.string().email().required('Please enter a valid email')
	});

	const { form, errors, handleChange, handleSubmit, isSubmitting, handleReset } = createForm({
		initialValues: {
			email: ''
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				loginError = false;
				loading = true;
				const { user: userDetails, error } = await supabase.auth.signIn({
					email: values.email
				});
				if (error) {
					loginError = true;
					loading = false;
					throw error.message;
				}
				$user = userDetails;
				loading = false;
				document.getElementById('open_modal').click();
			} catch (error) {
				loginError = true;
				console.log(error);
			}
		}
	});

	// Take admin user to dashboard no need for login
	if ($user) {
		goto('/admin/dashboard');
	}
</script>

<section class="prose-xl h-full flex flex-col justify-center">
	<div class="hero-body">
		<div class="content">
			{#if loading}
				<progress class="progress progress-primary h-24 w-full" />
			{:else if loginError}
				<div class="alert alert-error shadow-lg">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
						<span>Error! You can only send a magic link once every 2 minutes. ⏲</span>
					</div>
					<button on:click={() => goto('/admin')} class="btn btn-wide btn-error">Retry</button>
				</div>
			{:else}
				<form class="pt-6 rounded-box" on:submit={handleSubmit}>
					<h1 class="text-center">Admin Login</h1>
					<div class="flex flex-col justify-center items-center">
						<label class="input-group w-96 input-group-vertical">
							<span>Email</span>
							<input
								type="text"
								placeholder="info@site.com"
								required
								bind:value={$form.email}
								class="input input-bordered"
							/>
						</label>
						{#if $errors.email.length > 0}
							<div class="alert w-96 alert-warning shadow-lg mt-2">
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="stroke-current flex-shrink-0 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										on:click={() => ($errors.email = '')}
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/></svg
									>
									<span>{$errors.email}</span>
								</div>
							</div>
						{/if}
						<div class="flex align-center justify-center py-4">
							<button type="submit" class="btn btn-wide btn-primary mt-4">Login</button>
						</div>
					</div>
				</form>
			{/if}

			<!-- <a id="open_modal" href="#basic-modal" /> -->
			<label for="my-modal-3" id="open_modal" />

			<!-- {#if open} -->
			<input type="checkbox" id="my-modal-3" class="modal-toggle" />
			<div class="modal">
				<div class="modal-box relative">
					<label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<h3 class="text-lg font-bold">Did you see that?</h3>
					<p class="py-4">
						Of course you didnt... it was magic! 🧙🏼‍♂️ check your email for a magic link!
					</p>
				</div>
			</div>
			<!-- {/if} -->
		</div>
	</div>
</section>
