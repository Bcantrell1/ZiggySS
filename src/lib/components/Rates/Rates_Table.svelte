<script>
	import Error from '$lib/components/Error.svelte';
	import { reserveUnit } from '$lib/supabase/services';
	export let units, error;

	let loading = false;
	let reservedSize = '';

	function reserveSelectedUnit(id, available, size) {
		try {
			loading = true;
			reserveUnit(id, available).then((res) => {
				if (res.data) {
					reservedSize = size;
					loading = false;
					document.getElementById('open_modal').click();
				}

				if (res.error) {
					loading = false;
					console.log('Error: ', res.error);
				}
			});
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
										reserveSelectedUnit(unit.id, unit.available, `${unit.width}X${unit.length}`)}
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
			<p class="py-4">
				Your {reservedSize} unit will be ready for claiming at the facility in person. Bring your drivers
				license for proof of Identification.
			</p>
		</div>
	</div>
</div>
