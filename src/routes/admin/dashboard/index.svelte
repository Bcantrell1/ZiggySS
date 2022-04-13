<script context="module">
	import { getFacilities } from '$lib/supabase/services';
	export async function load({ fetch, session, context }) {
		const { data, error } = await getFacilities();
		return {
			props: {
				facilities: data,
				error: error
			}
		};
	}
</script>

<script>
	import CreateFacility from '$lib/components/Admin/CreateFacility.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	import { goto } from '$app/navigation';

	import { user } from '$lib/store/auth';

	export let facilities;

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
		{#each facilities as facility, i}
			<div class="w-full m-2 broder-primary">
				<a
					href="{$page.url.pathname}/edit/{facility.facility_uri}"
					class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center btn btn-outline btn-primary hover:bg-primary"
				>
					<div>
						{facility.facility_city}
					</div>
				</a>
				{#if i % 2 === 0}
					<div class="divider divider-horizontal" />
				{/if}
			</div>
		{/each}
		<!-- <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">content</div> -->
	</div>
</section>
