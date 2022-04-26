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
	export let facilities, units, f_error, u_error;
	$: console.log(facilities, units);

	const updateUnit = async (unit) => {
		try {
		} catch (error) {}
	};
</script>
