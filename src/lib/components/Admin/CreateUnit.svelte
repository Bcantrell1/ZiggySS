<script>
	// Form libraries
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	// Supabase service imports
	import { createUnit } from '$lib/supabase/services';
	// Props
	export let facility_id;

	let loading = false;
	let createError = false;
	let createComplete = false;

	// Form validation logic
	const validationSchema = yup.object().shape({
		n_unit_width: yup.number().required('Please enter a valid width'),
		n_unit_length: yup.number().required('Please enter a valid length'),
		n_unit_str_rate: yup.number().required('Please enter a standard rate'),
		n_unit_spc_rate: yup.number().required('Please enter a special rate'),
		n_unit_rented: yup.number().required('Please enter a value for current rented'),
		n_unit_available: yup.number().required('Please enter a value for current available'),
		n_unit_climate: yup.number().required('Please enter 1 or 0 for climate or not')
	});

	// Form functions and services
	const { form, errors, handleChange, handleSubmit, isSubmitting, handleReset } = createForm({
		initialValues: {
			n_unit_width: '',
			n_unit_length: '',
			n_unit_str_rate: '',
			n_unit_spc_rate: '',
			n_unit_rented: '',
			n_unit_available: '',
			n_unit_climate: ''
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				loading = true;
				const { data, error } = await createUnit({
					facility_id: facility_id,
					width: values.n_unit_width,
					length: values.n_unit_length,
					str_rate: values.n_unit_str_rate,
					spc_rate: values.n_unit_spc_rate,
					rented: values.n_unit_rented,
					available: values.n_unit_available,
					climate: values.n_unit_climate
				});
				if (error) {
					loading = false;
					createError = true;
					throw error.message;
				}

				if (data) {
					console.log(data);
					createComplete = true;
					loading = false;
				}
			} catch (error) {
				loading = false;
				console.log(error);
			}
			// Reset input values
			handleReset();
		}
	});
</script>

<div data-theme="emerald" tabindex="0" class="collapse rounded-box collapse-plus mb-8">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Create Unit</div>
	{#if loading}
		<progress class="progress progress-primary h-24 w-full" />
	{:else if createError}
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
				<span>Error! Not sure why? Give her another shot!</span>
			</div>
			<button on:click={() => !createError} class="btn btn-wide btn-error">Create Facility</button>
		</div>
	{:else if createComplete}
		<div class="alert alert-success shadow-lg">
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
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>You have created a new unit!</span>
			</div>
			<button on:click={() => (createComplete = false)} class="btn btn-wide btn-outline btn-active"
				>Create Another</button
			>
		</div>
	{:else}
		<div class="collapse-content">
			<form class="pt-6 rounded-box" on:submit={handleSubmit}>
				<div class="grid justify-center grid-cols-2 gap-4">
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Width</span>
							<input
								type="number"
								placeholder="10"
								required
								bind:value={$form.n_unit_width}
								class="input input-bordered"
							/>
							{#if $errors.n_unit_width.length > 0}
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
										<span>{$errors.n_unit_width}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Length</span>
							<input
								type="number"
								placeholder="10"
								required
								bind:value={$form.n_unit_length}
								class="input input-bordered"
							/>
							{#if $errors.n_unit_length.length > 0}
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
										<span>{$errors.n_unit_length}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Normal Rate</span>
							<input
								type="number"
								placeholder="120"
								required
								bind:value={$form.n_unit_str_rate}
								class="input input-bordered"
							/>
							{#if $errors.n_unit_str_rate.length > 0}
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
										<span>{$errors.n_unit_str_rate}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Special Rate</span>
							<input
								type="number"
								placeholder="100"
								required
								bind:value={$form.n_unit_spc_rate}
								class="input input-bordered"
							/>
							{#if $errors.n_unit_spc_rate.length > 0}
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
										<span>{$errors.n_unit_spc_rate}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Total Rented</span>
							<input
								type="number"
								placeholder="0"
								required
								bind:value={$form.n_unit_rented}
								class="input input-bordered"
							/>
							{#if $errors.n_unit_rented.length > 0}
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
										<span>{$errors.n_unit_rented}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Total Available</span>
							<input
								type="number"
								placeholder="50"
								required
								bind:value={$form.n_unit_available}
								class="input input-bordered"
							/>
							{#if $errors.n_unit_available.length > 0}
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
										<span>{$errors.n_unit_available}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3 col-span-2">
						<label class="input-group input-group-vertical">
							<span>Climate Controlled</span>
							<input
								type="number"
								placeholder="1"
								required
								bind:value={$form.n_unit_climate}
								class="input input-bordered"
							/>
							{#if $errors.n_unit_climate.length > 0}
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
										<span>{$errors.n_unit_climate}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
				</div>
				<div class="flex align-center justify-center py-4">
					<button type="submit" class="btn btn-wide btn-primary mt-4">Add</button>
				</div>
			</form>
		</div>
	{/if}
</div>
