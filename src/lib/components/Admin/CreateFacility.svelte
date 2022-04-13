<script>
	import { createFacility } from '$lib/supabase/services';
	
	let n_facility_uri,	
		n_facility_name,	
		n_facility_email,	
		n_facility_phone,	
		n_facility_street,	
		n_facility_city,
		n_facility_state,	
		n_facility_zip,	
		n_facility_hours,	
		n_facility_about;

	async function facilityCreate() {
		try {
			const {data, error} = await createFacility(
				{
					facility_uri: n_facility_uri,
					facility_name: n_facility_name,
					facility_email: n_facility_email,
					facility_phone: n_facility_phone,
					facility_street: n_facility_street,
					facility_city: n_facility_city,
					facility_state: n_facility_state,
					facility_zip: n_facility_zip,
					facility_hours: n_facility_hours,
					facility_about: n_facility_about
				}
			);

			if(error) {
				throw error;
			}

			if(data) {
				console.log(data);
			}

		} catch(error) {
			console.log(error);
		}
		
	}
</script>

<div data-theme="emerald" tabindex="0" class="collapse rounded-box collapse-plus mb-8">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Add Facility</div>
	<div class="collapse-content">
		<form class="pt-6 rounded-box" on:submit|preventDefault={facilityCreate}>
			<div class="grid justify-center grid-cols-2 gap-4">
				<div class="flex flex-col py-3">
					<label class="input-group input-group-vertical">
						<span>URI</span>
						<input
							type="text"
							placeholder="info@site.com"
							required
							bind:value={n_facility_uri}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3">
					<label class="input-group input-group-vertical">
						<span>Name</span>
						<input
							type="text"
							placeholder="info@site.com"
							required
							bind:value={n_facility_name}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3">
					<label class="input-group input-group-vertical">
						<span>Email</span>
						<input
							type="text"
							placeholder="info@site.com"
							required
							bind:value={n_facility_email}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3">
					<label class="input-group input-group-vertical">
						<span>Phone</span>
						<input
							type="text"
							placeholder="info@site.com"
							required
							bind:value={n_facility_phone}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3">
					<label class="input-group input-group-vertical">
						<span>Street</span>
						<input
							type="text"
							placeholder="info@site.com"
							required
							bind:value={n_facility_street}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3">
					<label class="input-group input-group-vertical">
						<span>City</span>
						<input
							type="text"
							placeholder="info@site.com"
							required
							bind:value={n_facility_city}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3">
					<label class="input-group input-group-vertical">
						<span>State</span>
						<input
							type="text"
							placeholder="info@site.com"
							required
							bind:value={n_facility_state}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3">
					<label class="input-group input-group-vertical">
						<span>Zip</span>
						<input
							type="text"
							placeholder="info@site.com"
							required
							bind:value={n_facility_zip}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3 col-span-2">
					<label class="input-group input-group-vertical">
						<span>Hours</span>
						<input
							type="text"
							placeholder="info@site.com"
							required
							bind:value={n_facility_hours}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3 col-span-2">
					<label class="input-group input-group-vertical">
						<span>About</span>
						<textarea
							bind:value={n_facility_about}
							class="textarea textarea-bordered h-40"
							placeholder="Have something to tell us?"
						/>
					</label>
				</div>
			</div>
			<div class="flex align-center justify-center py-4">
				<button type="submit" class="btn btn-wide btn-primary mt-4">Add</button>
			</div>
		</form>
	</div>
</div>
