<script context="module">
	// Supabase service imports
	import { getFacilities } from '$lib/supabase/services';
	// Server side function and variable creation
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
	import '../app.css';
	// Component imports
	import Header from '$lib/components/Header/index.svelte';
	import Footer from '$lib/components/Footer/index.svelte';
	// Supabase import for auth listener
	import supabase from '$lib/supabase';
	// Readable variable for app admin userr
	import { user } from '$lib/store/auth';
	// Props
	export let facilities;

	// Setting user readable to auth state of user
	user.set(supabase.auth.user());
	// Listen for auth change and set user if a change occurs
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
	});
</script>

<div class="flex flex-col flex-grow h-screen">
	<Header {facilities} />
	<main class="container h-screen mx-auto px-4">
		<!-- Where routes will be rendered -->
		<slot {facilities} />
	</main>
	<Footer />
</div>
