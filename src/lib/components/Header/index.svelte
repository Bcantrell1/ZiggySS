<script>
	import { page } from '$app/stores';
	import { user } from '$lib/store/auth';
	import { logOut } from '$lib/supabase/services';
	export let facilities;
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</div>
			<ul
				data-theme="emerald"
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52"
			>
				<li><a class:active={$page.url.pathname === '/'} href="/">Home</a></li>
				{#if facilities.length > 1}
					<li tabindex="0">
						<a>
							Locations
							<svg
								class="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
							>
						</a>
						<ul class="p-2 bg-base-100">
							{#each facilities as facility}
								<li>
									<a
										class:active={$page.url.pathname === `/self-storage/${facility.facility_uri}`}
										href="/self-storage/{facility.facility_uri}"
										>{facility.facility_city}, {facility.facility_state}</a
									>
								</li>
							{/each}
						</ul>
					</li>
				{:else}
					<li>
						<a
							class:active={$page.url.pathname === `/self-storage/${facilities[0].facility_uri}`}
							href="/self-storage/{facilities[0].facility_uri}">View Rates</a
						>
					</li>
				{/if}
				<li><a class:active={$page.url.pathname === '/about'} href="/about">About</a></li>
				<li><a class:active={$page.url.pathname === '/faq'} href="/faq">Faq</a></li>
				<li><a class:active={$page.url.pathname === '/contact'} href="/contact">Contact</a></li>
				{#if $user}
					<li>
						<a class:active={$page.url.pathname === '/admin/dashboard'} href="/admin/dashboard"
							>Admin</a
						>
					</li>
					<li><button on:click={logOut}>Log Out</button></li>
				{/if}
			</ul>
		</div>
		<div class="flex">
			<a href="/" class="btn btn-ghost normal-case text-xl">
				<img src="/static/Logo_ZSS.svg" width="44px" alt="" />
				Ziggy's Storage</a
			>
		</div>
	</div>
	<div class="navbar-end hidden lg:flex">
		<ul class="menu menu-horizontal  p-0">
			<li><a class:active={$page.url.pathname === '/'} href="/">Home</a></li>
			{#if facilities.length > 1}
				<li tabindex="0">
					<a>
						Locations
						<svg
							class="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
						>
					</a>
					<ul class="p-2 bg-base-100 z-10">
						{#each facilities as facility}
							<li>
								<a
									class:active={$page.url.pathname === `/self-storage/${facility.facility_uri}`}
									href="/self-storage/{facility.facility_uri}"
									>{facility.facility_city}, {facility.facility_state}</a
								>
							</li>
						{/each}
					</ul>
				</li>
			{:else}
				<li>
					<a
						class:active={$page.url.pathname === `/self-storage/${facilities[0].facility_uri}`}
						href="/self-storage/{facilities[0].facility_uri}">View Rates</a
					>
				</li>
			{/if}
			<li><a class:active={$page.url.pathname === '/about'} href="/about">About</a></li>
			<li><a class:active={$page.url.pathname === '/faq'} href="/faq">Faq</a></li>
			<li><a class:active={$page.url.pathname === '/contact'} href="/contact">Contact</a></li>
			<li>
				<a class:active={$page.url.pathname.includes('/admin/dashboard')} href="/admin/dashboard"
					>Admin</a
				>
			</li>
		</ul>
	</div>
	{#if $user}
		<div class="navbar-end">
			<button on:click={logOut} class="btn btn-error">Log Out</button>
		</div>
	{/if}
</div>
