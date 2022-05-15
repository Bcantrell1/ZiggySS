<script>
	import { updateFacility } from '$lib/supabase/services';
	export let facilities, value, facility_id;
</script>

<div class="flex flex-col py-1 items-center">
	<input
		type="text"
		{value}
		class="input input-bordered w-full max-w-xs"
		on:input={(e) => {
			value = e.currentTarget.value;
			try {
				updateFacility(facilities, facility_id).then((res) => {
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
