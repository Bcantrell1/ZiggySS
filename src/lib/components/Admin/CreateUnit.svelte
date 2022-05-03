<script>
	import { createUnit } from '$lib/supabase/services';
	export let facility_id;

	let n_unit_width,
		n_unit_length,
		n_unit_str_rate,
		n_unit_spc_rate,
		n_unit_rented,
		n_unit_available,
		n_unit_climate;

	let loading = false;
	let createError = false;
	let createComplete = false;

	async function unitCreate() {
		try {
			loading = true;
			const { data, error } = await createUnit({
				facility_id: facility_id,
				width: n_unit_width,
				length: n_unit_length,
				str_rate: n_unit_str_rate,
				spc_rate: n_unit_spc_rate,
				rented: n_unit_rented,
				available: n_unit_available,
				climate: n_unit_climate
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
			console.log(error);
		}
	}
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
			<form class="pt-6 rounded-box" on:submit|preventDefault={unitCreate}>
				<div class="grid justify-center grid-cols-2 gap-4">
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Width</span>
							<input
								type="text"
								placeholder="10"
								required
								bind:value={n_unit_width}
								class="input input-bordered"
							/>
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Length</span>
							<input
								type="text"
								placeholder="10"
								required
								bind:value={n_unit_length}
								class="input input-bordered"
							/>
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Normal Rate</span>
							<input
								type="text"
								placeholder="120"
								required
								bind:value={n_unit_str_rate}
								class="input input-bordered"
							/>
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Special Rate</span>
							<input
								type="text"
								placeholder="100"
								required
								bind:value={n_unit_spc_rate}
								class="input input-bordered"
							/>
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Total Rented</span>
							<input
								type="text"
								placeholder="0"
								required
								bind:value={n_unit_rented}
								class="input input-bordered"
							/>
						</label>
					</div>
					<div class="flex flex-col py-3">
						<label class="input-group input-group-vertical">
							<span>Total Available</span>
							<input
								type="text"
								placeholder="50"
								required
								bind:value={n_unit_available}
								class="input input-bordered"
							/>
						</label>
					</div>
					<div class="flex flex-col py-3 col-span-2">
						<label class="input-group input-group-vertical">
							<span>Climate Controlled</span>
							<input
								type="text"
								placeholder="1"
								required
								bind:value={n_unit_climate}
								class="input input-bordered"
							/>
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
