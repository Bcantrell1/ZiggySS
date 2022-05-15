<script>
	// Components
	import Error from '$lib/components/Error.svelte';
	// Services
	import { reserveUnit } from '$lib/supabase/services';
	// Props
	export let units, error;
	// Component variables
	let loading = false;
	let reservedSize = '';
	let reservationId = '';

	// Create UUID for reservation id
	function uuidv4() {
		return ([1e7] + -1e3 + -4e3).replace(/[018]/g, (c) =>
			(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
		);
	}

	// Handle reservation from client
	function reserveSelectedUnit(id, available, rented, size) {
		try {
			loading = true;
			reserveUnit(id, available, rented).then((res) => {
				// If Successful
				if (res.data) {
					reservedSize = size;
					reservationId = uuidv4();
					loading = false;
					document.getElementById('open_modal').click();
				}
				// If Error
				if (res.error) {
					loading = false;
					console.log('Error: ', res.error);
				}
			});
			// Server error
		} catch (error) {
			loading = false;
			console.log(error);
		}
	}
</script>

<Error {error} />
<div class="overflow-x-auto w-full rounded-box">
	{#if !loading}
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
					{#if unit.available >= 1}
						<tr>
							<th>
								<label for="unit-size">
									<h3 class="font-bold">{unit.width}x{unit.length}</h3>
								</label>
							</th>
							<td>
								<div class="flex items-center space-x-3">
									<div class="avatar">
										<div class="mask w-12 h-12">
											<img src="/static/icons/parcel-box-package.svg" alt="" />
										</div>
									</div>
									<div>
										<div class="font-bold">Self Storage</div>
										{#if unit.climate}
											<div class="text-sm opacity-50">Climate Controlled</div>
										{:else}
											<div class="text-sm opacity-50">Standard</div>
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
								<button
									on:click={() =>
										reserveSelectedUnit(
											unit.id,
											unit.available,
											unit.rented,
											`${unit.width}X${unit.length}`
										)}
									class="btn btn-primary btn-lrg">Reserve</button
								>
							</th>
						</tr>
					{/if}
				{:else}
					No units available
				{/each}
			</tbody>
		</table>
	{:else}
		<progress class="progress progress-primary h-24 w-full" />
	{/if}

	<label for="my-modal-3" id="open_modal" />

	<input type="checkbox" id="my-modal-3" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box relative">
			<label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">x</label>
			<h3 class="text-lg font-bold">Congratulations! Your unit has been reserved</h3>
			<h3 class="text-md font-normal">Confirmation ID: {reservationId}</h3>
			<p class="py-4">
				Your {reservedSize} unit will be ready for claiming at the facility in person. Bring your drivers
				license for proof of Identification, and the above confirmation id.
			</p>
		</div>
	</div>
</div>
