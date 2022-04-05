<script>
	import 'carbon-components-svelte/css/g90.css';
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { user } from '$lib/store/auth';

	import {
		Header,
		SideNav,
		SideNavItems,
		SideNavLink,
		SkipToContent,
		Content,
		HeaderUtilities,
		HeaderAction,
		TooltipIcon,
		HeaderNav
	} from 'carbon-components-svelte';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';

	let isSideNavOpen = false;

	//Logout Controller
	const logOut = async () => {
		try {
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
			$user = false;
			goto('/');
		} catch (error) {
			console.log(error);
		}
	};

	//Setting user to current auth state
	user.set(supabase.auth.user());

	//Realtime listener for auth state change
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
	});

	// $: console.log($user);
</script>

<Header
	company="Ziggy"
	platformName="Self Storage"
	persistentHamburgerMenu={true}
	href="/"
	bind:isSideNavOpen
>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		<HeaderUtilities>
			{#if $user}
				<TooltipIcon icon={UserAvatarFilledAlt} direction="left" tooltipText="Log Out">
					<HeaderAction on:click={logOut} icon={UserAvatarFilledAlt} />
				</TooltipIcon>
			{/if}
		</HeaderUtilities>
	</HeaderNav>
</Header>
<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink href="/" text="Home" isSelected />
		<SideNavLink href="/rates" text="View rates" />
		<SideNavLink href="/faq" text="FAQ" />
		<SideNavLink href="/contact" text="Contact" />
	</SideNavItems>
</SideNav>

<Content>
	<slot />
</Content>
