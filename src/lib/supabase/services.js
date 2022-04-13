import supabase from '.';

export async function logOut() {
	const { error } = await supabase.auth.signOut();
	return { data: !error, error };
}

export async function createFacility({ content, user }) {
	const { data, error } = await supabase.from('facilities').insert({ content, user });
	return { data, error };
}

export async function getFacilities() {
	let { data, error } = await await supabase
		.from('facilities')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		return { data, error };
	}

	data = await Promise.all(
		data.map(async (unit) => {
			return { ...unit };
		})
	);
	return { data, error };
}

export async function getFacilitybyUri(facility_uri) {
	let { data, error } = await await supabase
		.from('facilities')
		.select(`*`)
		.eq('facility_uri', facility_uri);

	if (error) {
		return { data, error };
	}

	data = await Promise.all(
		data.map(async (unit) => {
			return { ...unit };
		})
	);
	return { data, error };
}

// export async function editFacility({ content, user }) {}

// export async function deleteFacility({ content, user }) {}

// export async function getFacilities() {}

export async function getUnits() {
	let { data, error } = await await supabase
		.from('units')
		.select('*')
		.order('width', { ascending: false });

	if (error) {
		return { data, error };
	}

	data = await Promise.all(
		data.map(async (unit) => {
			return { ...unit };
		})
	);
	return { data, error };
}

export async function getUnitsByFacilityId(facility_id) {
	let { data, error } = await await supabase
		.from('units')
		.select(`*`)
		.eq('facility_id', facility_id);

	if (error) {
		return { data, error };
	}

	data = await Promise.all(
		data.map(async (unit) => {
			return { ...unit };
		})
	);
	return { data, error };
}

// export async function createUnit({ facility_id, user, content }) {
// 	const { data, error } = await supabase.from('units').insert({ content, user });
// 	return { data, error };
// }

// export async function editUnit({ content, user }) {}

// export async function deleteUnit({ content, user }) {}

// export async function reserveUnit({ content }) {}
