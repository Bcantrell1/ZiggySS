<script>
	// Supabase service imports
	import { createFacility } from '$lib/supabase/services';
	// Form libraries
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	// Component variables
	let loading = false;
	let createError = false;
	let createComplete = false;
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	// Form validation logic
	const validationSchema = yup.object().shape({
		n_facility_uri: yup.string().required('Please enter a URI'),
		n_facility_name: yup.string().required('Please enter a facility name'),
		n_facility_email: yup.string().email().required('Please enter a facility email'),
		n_facility_phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
		n_facility_street: yup.string().required('Please enter an address'),
		n_facility_city: yup.string().required('Please enter an city name'),
		n_facility_state: yup.string().required('Please enter an state in any format'),
		n_facility_zip: yup.number().required('Please enter a valid zip code'),
		n_facility_hours: yup.string().required('Please enter an hour for the facility'),
		n_facility_about: yup.string().required('Please enter some information about the facility')
	});

	// Form functions and services
	const { form, errors, handleChange, handleSubmit, isSubmitting, handleReset } = createForm({
		initialValues: {
			n_facility_uri: '',
			n_facility_name: '',
			n_facility_email: '',
			n_facility_phone: '',
			n_facility_street: '',
			n_facility_city: '',
			n_facility_state: '',
			n_facility_zip: '',
			n_facility_hours: '',
			n_facility_about: ''
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				loading = true;
				const { data, error } = await createFacility({
					facility_uri: values.n_facility_uri,
					facility_name: values.n_facility_name,
					facility_email: values.n_facility_email,
					facility_phone: values.n_facility_phone,
					facility_street: values.n_facility_street,
					facility_city: values.n_facility_city,
					facility_state: values.n_facility_state,
					facility_zip: values.n_facility_zip,
					facility_hours: values.n_facility_hours,
					facility_about: values.n_facility_about
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
	<div class="collapse-title text-xl font-medium">Add Facility</div>
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
				<span>You have created a new facility!</span>
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
							<span>URI</span>
							<input
								type="text"
								placeholder="city-state-zip"
								required
								bind:value={$form.n_facility_uri}
								class="input input-bordered"
							/>
							{#if $errors.n_facility_uri.length > 0}
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
										<span>{$errors.n_facility_uri}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Name</span>
							<input
								type="text"
								placeholder="Self Storage Company"
								required
								bind:value={$form.n_facility_name}
								class="input input-bordered"
							/>
							{#if $errors.n_facility_name.length > 0}
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
										<span>{$errors.n_facility_name}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Email</span>
							<input
								type="email"
								placeholder="example@email.com"
								required
								bind:value={$form.n_facility_email}
								class="input input-bordered"
							/>
							{#if $errors.n_facility_email.length > 0}
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
										<span>{$errors.n_facility_email}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Phone</span>
							<input
								type="tel"
								placeholder="5555555555"
								required
								bind:value={$form.n_facility_phone}
								class="input input-bordered"
							/>
							{#if $errors.n_facility_phone.length > 0}
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
										<span>{$errors.n_facility_phone}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Street</span>
							<input
								type="text"
								placeholder="5555 W Street Way"
								required
								bind:value={$form.n_facility_street}
								class="input input-bordered"
							/>
							{#if $errors.n_facility_street.length > 0}
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
										<span>{$errors.n_facility_street}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>City</span>
							<input
								type="text"
								placeholder="City"
								required
								bind:value={$form.n_facility_city}
								class="input input-bordered"
							/>
							{#if $errors.n_facility_city.length > 0}
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
										<span>{$errors.n_facility_city}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>State</span>
							<input
								type="text"
								placeholder="State"
								required
								bind:value={$form.n_facility_state}
								class="input input-bordered"
							/>
							{#if $errors.n_facility_state.length > 0}
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
										<span>{$errors.n_facility_state}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Zip</span>
							<input
								type="number"
								placeholder="12345"
								required
								bind:value={$form.n_facility_zip}
								class="input input-bordered"
							/>
							{#if $errors.n_facility_zip.length > 0}
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
										<span>{$errors.n_facility_zip}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3 col-span-2">
						<label class="input-group input-group-vertical">
							<span>Hours</span>
							<input
								type="text"
								placeholder="Monday - Saturday: 9am - 5pm"
								required
								bind:value={$form.n_facility_hours}
								class="input input-bordered"
							/>
							{#if $errors.n_facility_hours.length > 0}
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
										<span>{$errors.n_facility_hours}</span>
									</div>
								</div>
							{/if}
						</label>
					</div>
					<div class="flex flex-col py-3 col-span-2">
						<label class="input-group input-group-vertical">
							<span>About</span>
							<textarea
								bind:value={$form.n_facility_about}
								class="textarea textarea-bordered h-40"
								placeholder="A litle about the facility."
							/>
							{#if $errors.n_facility_about.length > 0}
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
										<span>{$errors.n_facility_about}</span>
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
