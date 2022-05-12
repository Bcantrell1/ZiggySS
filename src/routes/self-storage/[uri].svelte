<script context="module">
	import { getUnitsByFacilityId, getFacilitybyUri } from '$lib/supabase/services';
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
	import Rates_Top from '$lib/components/Rates/Rates_Top.svelte';
	import Rates_Table from '$lib/components/Rates/Rates_Table.svelte';
	export let facilities, units, f_error, u_error;
	// $: console.log(facilities);
</script>

<Rates_Top {facilities} error={f_error} />

<div class="divider py-10" />

<Rates_Table {units} error={u_error} />

<div class="divider py-10" />

<section class="">
	<h2 class="text-center text-xl font-bold">About Us</h2>
	<p>{facilities[0].facility_about}</p>
</section>
