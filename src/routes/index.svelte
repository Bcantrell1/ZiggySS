<script>
	import { user } from '$lib/store/auth';

	$: console.log($user);
</script>

<section>
	<h4>Welcome {$user?.email ? $user.email : ''}</h4>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</section>
