<script>
	import { goto } from '$app/navigation';

	import { user } from '$lib/store/auth';
	import supabase from '$lib/supabase';

	$: console.log($user);
</script>

<section class="container">
	<h4>Welcome {$user?.email ? $user.email : ''}</h4>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</section>
