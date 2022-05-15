<script context="module">
	// Supabase Service imports
	import { getFacilities } from '$lib/supabase/services';
	// Server side rendered variables
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
	// Import user
	import { user } from '$lib/store/auth';
	// Props
	export let facilities;
</script>

<section>
	<div
		class="hero min-h-screen"
		style="background-image: url(/static/facility/adam-winger-OpV94f2edwE-unsplash.jpg);"
	>
		<div class="hero-overlay bg-opacity-60" />
		<div class="hero-content text-center text-neutral-content">
			<div class="max-w-md">
				<h2>{$user ? `Admin` : ``}</h2>
				<h1 class="mb-5 text-5xl font-bold text-shadow">Ziggy's Storage</h1>
				<p class="mb-5">
					Look no further for storage options as our simple and cheap process will get you squared
					away with any of your possible storage needs!
				</p>
				<div class="flex justify-center gap-2">
					{#each facilities as facility}
						<a href="/self-storage/{facility.facility_uri}" class="btn btn-primary lg:btn-wide"
							>{facility.facility_city}</a
						>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
