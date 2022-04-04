<script>
	import "carbon-components-svelte/css/g80.css";
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { user } from '$lib/store/auth';

	import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavDivider,
    SkipToContent,
    Content,
  } from "carbon-components-svelte";
	
  
  const signOut = async () => {
	  let { error } = await supabase.auth.signOut();
	  $user = false;
	  goto('/');
	};
	
	user.set(supabase.auth.user());
	
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
	});
	
	let isSideNavOpen = false;
	$: console.log($user);
</script>

<Header 
	company="Ziggy" 
	platformName="Self Storage" 
	persistentHamburgerMenu={true}
	bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
	  <SkipToContent />
	</svelte:fragment>
  </Header>
  
  <SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
	  <SideNavLink href="/" text="Home" />
	  <SideNavLink href="/rates" text="View rates" />
	  <SideNavLink href="/faq" text="FAQ" />
	  <SideNavLink href="/contact" text="Contact" />
	  {#if $user?.email}
		<SideNavDivider />
		<SideNavLink on:click={signOut} text="Log Out" />
	  {/if}
	</SideNavItems>
  </SideNav>

<Content>
	<slot />
</Content>