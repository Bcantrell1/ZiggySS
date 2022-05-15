<script context="module">
	// Supabase Service imports
	import { getFacilitybyUri } from '$lib/supabase/services';
	// Server side rendered variables
	export async function load({ params }) {
		const { data: facilityData, error: facilityError } = await getFacilitybyUri(params.uri);
		return {
			props: {
				facilities: facilityData,
				f_error: facilityError
			}
		};
	}
</script>

<script>
	// Imported components
	import CreateUnit from '$lib/components/Admin/CreateUnit.svelte';
	import EditFacility from '$lib/components/Admin/EditFacility.svelte';
	// Supabase service imports
	import { deleteUnit, updateFacility } from '$lib/supabase/services';
	import supabase from '$lib/supabase';
	// Framework imports
	import { readable, get } from 'svelte/store';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	// Global user state
	import { user } from '$lib/store/auth';
	// Props
	export let facilities;

	// Realtime function for unit data using readable variable from framework
	const units = readable(null, (set) => {
		supabase
			.from('units')
			.select('*')
			.eq('facility_id', facilities[0].id)
			.then(({ error, data }) => set(data));

		const subscription = supabase
			.from('units')
			.on('*', (payload) => {
				console.log('Change received!', payload);
				// payload.evenType
				// payload.new
				// payload.old
				if (payload.eventType === 'INSERT') {
					set([...get(units), payload.new]);
				}

				if (payload.eventType === 'DELETE') {
					const updatedUnits = [...get(units)];
					const removeIndex = [...get(units)].map((item) => item.id).indexOf(payload.old.id);
					removeIndex >= 0 && updatedUnits.splice(removeIndex, 1);
					set(updatedUnits);
				}
			})
			.subscribe();

		return () => supabase.removeSubscription(subscription);
	});

	// Check if user is present
	$: if (browser) {
		if (!$user) {
			goto('/admin');
		}
	}
</script>

<section class="prose-xl">
	<div class="rounded-box text-center">
		<h1>{facilities[0].facility_name} Overview</h1>
	</div>
	<br />
	<div data-theme="emerald" tabindex="0" class="collapse rounded-box collapse-plus mb-8">
		<input type="checkbox" />
		<div class="collapse-title text-xl font-medium">Edit Facility Info</div>
		<div class="collapse-content">
			<p class="text-center">Edit data directly and changes will hot update!</p>
			<div class="grid justify-center grid-cols-2 gap-4">
				<div class="flex flex-col items-center">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="facility_uri">
							<span class="label-text">Facility Uri</span>
						</label>
						<input
							type="text"
							value={facilities[0].facility_uri}
							class="input input-bordered w-full max-w-xs"
							on:input={(e) => {
								facilities[0].facility_uri = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="facility_name">
							<span class="label-text">Facility Name</span>
						</label>
						<input
							type="text"
							value={facilities[0].facility_name}
							class="input input-bordered w-full max-w-xs"
							on:input={(e) => {
								facilities[0].facility_name = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="facility_email">
							<span class="label-text">Facility Email</span>
						</label>
						<input
							type="text"
							value={facilities[0].facility_email}
							class="input input-bordered w-full max-w-xs"
							on:input={(e) => {
								facilities[0].facility_email = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="facility_phone">
							<span class="label-text">Facility Phone</span>
						</label>
						<input
							type="text"
							value={facilities[0].facility_phone}
							class="input input-bordered w-full max-w-xs"
							on:input={(e) => {
								facilities[0].facility_phone = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="facility_street">
							<span class="label-text">Facility Street</span>
						</label>
						<input
							type="text"
							value={facilities[0].facility_street}
							class="input input-bordered w-full max-w-xs"
							on:input={(e) => {
								facilities[0].facility_street = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="facility_city">
							<span class="label-text">Facility City</span>
						</label>
						<input
							type="text"
							value={facilities[0].facility_city}
							class="input input-bordered w-full max-w-xs"
							on:input={(e) => {
								facilities[0].facility_city = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="facility_state">
							<span class="label-text">Facility State</span>
						</label>
						<input
							type="text"
							value={facilities[0].facility_state}
							class="input input-bordered w-full max-w-xs"
							on:input={(e) => {
								facilities[0].facility_state = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="facility_zip">
							<span class="label-text">Facility Zip</span>
						</label>
						<input
							type="text"
							value={facilities[0].facility_zip}
							class="input input-bordered w-full max-w-xs"
							on:input={(e) => {
								facilities[0].facility_zip = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<div class="form-control w-full max-w-xs">
						<label class="label" for="facility_hours">
							<span class="label-text">Facility Hours</span>
						</label>
						<input
							type="text"
							value={facilities[0].facility_hours}
							class="input input-bordered w-full max-w-xs"
							on:input={(e) => {
								facilities[0].facility_hours = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
				<div class="flex flex-col col-span-2">
					<div class="form-control">
						<label class="label" for="facility_about">
							<span class="label-text">Facility About</span>
						</label>
						<textarea
							class="textarea textarea-bordered h-40"
							value={facilities[0].facility_about}
							on:input={(e) => {
								facilities[0].facility_about = e.currentTarget.value;
								try {
									updateFacility(facilities, facilities[0].id).then((res) => {
										if (res.data) {
											console.log(res.data);
										}
										if (res.error) {
											console.log(res.error);
										}
									});
								} catch (error) {
									console.log(error);
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<br />
	<CreateUnit facility_id={facilities[0].id} />
	{#if $units}
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Size</th>
					<th>Type</th>
					<th>Details</th>
					<th>Price</th>
					<th>Rented</th>
					<th>Available</th>
					<th />
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				{#each $units as unit}
					<tr>
						<th>
							<label for="unit-size">
								<h3 class="font-bold">{unit.width}x{unit.length}</h3>
							</label>
						</th>
						<td>
							<div class="flex items-center space-x-3">
								<div>
									<div class="font-bold">Self Storage</div>
									{#if unit.climate}
										<div class="text-sm opacity-50">Climate Controlled</div>
									{/if}
								</div>
							</div>
						</td>
						<td>
							Special: 1st Month Free
							<br />
							<span class="badge badge-ghost badge-sm">Ground Floor</span>
							<span class="badge badge-ghost badge-sm">Free Lock</span>
						</td>
						<td>
							<div class="prose">
								<h2>${unit.str_rate}</h2>
							</div>
						</td>
						<td>
							<div class="prose">
								<h2>{unit.rented}</h2>
							</div>
						</td>
						<td>
							<div class="prose">
								<h2>{unit.available - unit.rented}</h2>
							</div>
						</td>
						<th>
							<button on:click={() => deleteUnit(unit.id)} class="btn btn-error btn-lrg"
								>Delete</button
							>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<progress class="progress progress-primary h-24 w-full" />
	{/if}
</section>
