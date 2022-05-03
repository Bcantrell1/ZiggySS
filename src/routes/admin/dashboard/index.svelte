<script>
	// Components
	import CreateFacility from '$lib/components/Admin/CreateFacility.svelte';
	// Framework Imports
	import { page } from '$app/stores';
	import { readable, get } from 'svelte/store';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	// Store
	import { user } from '$lib/store/auth';
	import supabase from '$lib/supabase';
	// SSR output
	// export let facilities;

	const facilities = readable(null, (set) => {
		supabase
			.from('facilities')
			.select('*')
			.then(({ error, data }) => set(data));

		const subscription = supabase
			.from('facilities')
			.on('INSERT', (payload) => {
				// payload.evenType
				// payload.new
				// payload.old
				set([...get(facilities), payload.new]);
			})
			.subscribe();

		return () => supabase.removeSubscription(subscription);
	});

	// Check for authorized user
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
	<div class="flex justify-center w-full">
		{#if $facilities}
			{#each $facilities as facility, i}
				<div class="w-full m-2 broder-primary">
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
					<div class="divider divider-horizontal" />
				{/if}
			{/each}
		{:else}
			<progress class="progress progress-primary h-24 w-full" />
		{/if}
		<!-- <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">content</div> -->
	</div>
</section>
