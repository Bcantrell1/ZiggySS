<script>
	import { user } from '$lib/store/auth';

	$: console.log($user);
</script>

<section>
	<h4>Welcome {$user ? `Admin` : ``}</h4>
</section>
