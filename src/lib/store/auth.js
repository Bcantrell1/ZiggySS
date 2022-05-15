import { writable } from 'svelte/store';
import supabase from '$lib/supabase';
// State creation for user variable
export const user = writable(supabase.auth.user() || false);
