<script>
	import '../app.css';

	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { user } from '$lib/store/auth';

	const signOut = async () => {
		let { error } = await supabase.auth.signOut();
		$user = false;
		goto('/');
	};

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
	});

	$: console.log($user);
</script>

<header>
	<nav class="container">
		<ul class="navbar">
			<li class="logo">Ziggy's Storage</li>
			<li><a href="/">Home</a></li>
			<li><a href="/rates">View Rates</a></li>
			<li><a href="/faq">Faq</a></li>
			<li><a href="/contact">Contact</a></li>
			{#if $user?.email}
				<li><a href="/admin/dashboard">Admin Dashboard</a></li>
				<li><a href="#" on:click={signOut}>Logout</a></li>
			{/if}
		</ul>
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="container footer">
	<p>&copy; 2020</p>
</footer>

<style>
	.navbar {
		box-sizing: border-box;
		margin-bottom: 50px;
		padding: 0;
		height: 80px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 3rem;
		border-radius: 10px;
		background-color: #e0e0e0;
		box-shadow: 15px 15px 50px #b9b9b9, -15px -15px 30px #ffffff;
		user-select: none;
	}

	.footer {
		bottom: 0;
	}

	.logo {
		margin-right: auto;
		font-size: 1.5rem;
		color: var(--accent-color);
	}

	ul {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style-type: none;
	}
	li a {
		color: gray;
		margin: 0 10px;
		padding: 10px 15px;
		border-radius: 10px;
		width: auto;
		text-align: center;
		text-decoration: none;
	}
	li a:hover {
		color: #505050;
		box-shadow: 5px 5px 15px #b9b9b9, -5px -5px 15px #ffffff;
	}
</style>
