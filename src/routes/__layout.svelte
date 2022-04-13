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
	import '../app.css';

	import Header from '$lib/components/Header/index.svelte';
	import Footer from '$lib/components/Footer/index.svelte';

	import supabase from '$lib/supabase';
	import { user } from '$lib/store/auth';

	export let facilities;

	user.set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
	});

	// $: console.log($user);
</script>

<div class="flex flex-col flex-grow h-screen">
	<Header {facilities} />
	<main class="container h-screen mx-auto px-4">
		<slot {facilities} />
	</main>
	<Footer />
</div>
