<script context="module">
	import { getUnitsByFacilityId, getFacilitybyUri, editUnit } from '$lib/supabase/services';

	// SSR
	export async function load({ params }) {
		const { data: facilityData, error: facilityError } = await getFacilitybyUri(params.uri);
		// const { data: unitData, error: unitError } = await getUnitsByFacilityId(facilityData[0]?.id);
		return {
			props: {
				facilities: facilityData,
				// units: unitData,
				f_error: facilityError
				// u_error: unitError
			}
		};
	}
</script>

<script>
	import CreateUnit from '$lib/components/Admin/CreateUnit.svelte';
	import { deleteUnit } from '$lib/supabase/services';
	import { readable, get } from 'svelte/store';
	import supabase from '$lib/supabase';
	import { browser } from '$app/env';
	import { user } from '$lib/store/auth';
	import { goto } from '$app/navigation';

	export let facilities;

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

	$: if (browser) {
		if (!$user) {
			goto('/admin');
		}
	}
</script>

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
