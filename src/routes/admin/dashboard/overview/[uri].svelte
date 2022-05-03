<script context="module">
	import { getUnitsByFacilityId, getFacilitybyUri, editUnit } from '$lib/supabase/services';

	// SSR
	export async function load({ params }) {
		const { data: facilityData, error: facilityError } = await getFacilitybyUri(params.uri);
		const { data: unitData, error: unitError } = await getUnitsByFacilityId(facilityData[0]?.id);
		return {
			props: {
				facilities: facilityData,
				units: unitData,
				f_error: facilityError,
				u_error: unitError
			}
		};
	}
</script>

<script>
	import CreateUnit from '$lib/components/Admin/CreateUnit.svelte';
	import { deleteUnit } from '$lib/supabase/services';
	export let facilities, units, f_error, u_error;

	console.log(facilities);

	const updateUnit = async (unit) => {
		try {
		} catch (error) {}
	};
</script>

{#if units.length > 0}
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Size</th>
				<th>Type</th>
				<th>Details</th>
				<th>Price</th>
				<th />
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each units || [] as unit}
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
					<th>
						<button on:click={() => deleteUnit(unit.id)} class="btn btn-error btn-lrg"
							>Delete</button
						>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
	<CreateUnit facility_id={facilities[0].id} />
{:else}
	<CreateUnit facility_id={facilities[0].id} />
{/if}
