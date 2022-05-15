<script>
	// Components
	import CreateFacility from '$lib/components/Admin/CreateFacility.svelte';
	import { deleteFacility } from '$lib/supabase/services';
	// Framework Imports
	import { page } from '$app/stores';
	import { readable, get } from 'svelte/store';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	// Store
	import { user } from '$lib/store/auth';
	import supabase from '$lib/supabase';

	const facilities = readable(null, (set) => {
		supabase
			.from('facilities')
			.select('*')
			.then(({ error, data }) => set(data));

		const subscription = supabase
			.from('facilities')
			.on('*', (payload) => {
				if (payload.eventType === 'INSERT') {
					set([...get(facilities), payload.new]);
				}

				if (payload.eventType === 'DELETE') {
					const updatedFacilities = [...get(facilities)];
					const removeIndex = [...get(facilities)].map((item) => item.id).indexOf(payload.old.id);
					removeIndex >= 0 && updatedFacilities.splice(removeIndex, 1);
					set(updatedFacilities);
				}
			})
			.subscribe();

		return () => supabase.removeSubscription(subscription);
	});

	// Check if user is present
	$: if (browser) {
		if (!$user) {
			goto('/admin');
		}
	}
</script>

<section class="prose-xl mt-8">
	<div class="rounded-box text-center">
		<h1>Admin Dashboard</h1>
	</div>
	<div class="divider" />
	<br />
	<CreateFacility />
	<div class="grid grid-cols-3 justify-center w-full">
		{#if $facilities}
			{#each $facilities as facility, i}
				<div class="w-full m-2 broder-primary">
					<div class="indicator">
						<button
							on:click={() => deleteFacility(facility.id)}
							class="indicator-item badge badge-error hover:bg-red-900">Delete</button
						>
					</div>
					<a
						href="{$page.url.pathname}/overview/{facility.facility_uri}"
						class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center btn btn-outline btn-primary hover:bg-primary"
					>
						<div>
							{facility.facility_city}
						</div>
					</a>
				</div>
				{#if i % 2 === 0}
					<div class="divider w-full divider-horizontal" />
				{/if}
			{/each}
		{:else}
			<progress class="progress progress-primary h-24 w-full" />
		{/if}
	</div>
</section>
