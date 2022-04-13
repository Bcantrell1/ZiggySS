<script>
	import { createFacility } from '$lib/supabase/services';
	let f_name = '';

	async function facilityCreate() {}
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
							bind:value={f_name}
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
							bind:value={f_name}
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
							bind:value={f_name}
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
							bind:value={f_name}
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
							bind:value={f_name}
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
							bind:value={f_name}
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
							bind:value={f_name}
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
							bind:value={f_name}
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
							bind:value={f_name}
							class="input input-bordered"
						/>
					</label>
				</div>
				<div class="flex flex-col py-3 col-span-2">
					<label class="input-group input-group-vertical">
						<span>About</span>
						<textarea
							bind:value={f_name}
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
