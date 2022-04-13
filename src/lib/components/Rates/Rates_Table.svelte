<script>
	import Error from '$lib/components/Error.svelte';
	export let units, error;
</script>

<Error {error} />
<div class="overflow-x-auto w-full rounded-box">
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
						<button class="btn btn-primary btn-lrg">Reserve</button>
					</th>
				</tr>
			{:else}
				No units available
			{/each}
		</tbody>
	</table>
</div>
