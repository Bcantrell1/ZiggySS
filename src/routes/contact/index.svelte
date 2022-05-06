<script>
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import supabase from '$lib/supabase';
	let apiResult = null;

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const validationSchema = yup.object().shape({
		first: yup.string().required('Please enter a first name'),
		last: yup.string().required('Please enter a last name'),
		phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
		email: yup.string().email().required('Please enter a valid email'),
		message: yup.string().required('Please enter a message')
	});

	const { form, errors, handleChange, handleSubmit, isSubmitting, handleReset } = createForm({
		initialValues: {
			first: '',
			last: '',
			phone: '',
			email: '',
			message: ''
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				delete values['undefined'];
				const result = await supabase.from('contact').insert(values);
				if (result.data != null) {
					apiResult = true;
					document.getElementById('open_modal').click();
				} else {
					console.log(result.error);
					apiResult = false;
				}
			} catch (error) {
				apiResult = false;
			}
			handleReset();
		}
	});
</script>

<section class="prose-xl h-full flex flex-col justify-center">
	<div class="rounded-box text-center">
		<h1>Contact Us</h1>
	</div>
	<label for="my-modal-3" id="open_modal" />

	<input type="checkbox" id="my-modal-3" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box relative">
			<label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">x</label>
			<h3 class="text-lg font-bold">Thank you for reaching out!</h3>
			<p class="py-4">
				Your message has been recieved and we will contact you soon about your request or inquiry!
			</p>
		</div>
	</div>
	{#if apiResult != null}
		{#if apiResult != true}
			<div class="alert alert-warning shadow-lg mt-2">
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
					<span>Error! An internal server error has occurred.</span>
				</div>
			</div>
		{/if}
	{/if}
	<form class="pt-6 rounded-box" on:submit={handleSubmit}>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col py-3">
				<input
					type="text"
					placeholder="First"
					bind:value={$form.first}
					on:change={handleChange}
					class="input input-bordered w-full"
				/>
				{#if $errors.first.length > 0}
					<div class="alert alert-warning shadow-lg mt-2">
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
							<span>{$errors.first}</span>
						</div>
					</div>
				{/if}
			</div>
			<div class="flex flex-col py-3">
				<input
					type="text"
					placeholder="Last"
					bind:value={$form.last}
					on:change={handleChange}
					class="input input-bordered w-full"
				/>
				{#if $errors.last.length > 0}
					<div class="alert alert-warning shadow-lg mt-2">
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
							<span>{$errors.last}</span>
						</div>
					</div>
				{/if}
			</div>
			<div class="flex flex-col py-3">
				<input
					type="text"
					placeholder="Phone"
					bind:value={$form.phone}
					on:change={handleChange}
					class="input input-bordered w-full"
				/>
				{#if $errors.phone.length > 0}
					<div class="alert alert-warning shadow-lg mt-2">
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
							<span>{$errors.phone}</span>
						</div>
					</div>
				{/if}
			</div>
			<div class="flex flex-col py-3">
				<input
					type="text"
					placeholder="Email"
					bind:value={$form.email}
					on:change={handleChange}
					class="input input-bordered w-full"
				/>
				{#if $errors.email.length > 0}
					<div class="alert alert-warning shadow-lg mt-2">
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
							<span>{$errors.email}</span>
						</div>
					</div>
				{/if}
			</div>
			<div class="flex flex-col py-3 col-span-2">
				<textarea
					class="textarea textarea-bordered h-40"
					placeholder="Have something to tell us?"
					bind:value={$form.message}
					on:change={handleChange}
				/>
				{#if $errors.message.length > 0}
					<div class="alert alert-warning shadow-lg mt-2">
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
							<span>{$errors.message}</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="flex align-center justify-center py-4">
			<button type="submit" class="btn btn-primary btn-wide"> Submit </button>
		</div>
	</form>
</section>
