import supabase from '.';

//! Auth Functions
export async function logOut() {
	const { error } = await supabase.auth.signOut();
	return { data: !error, error };
}

//! Facility Functions
export async function createFacility(content) {
	const { data, error } = await supabase.from('facilities').insert(content);
	return { data, error };
}

export async function getFacilities() {
	let { data, error } = await supabase
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
	let { data, error } = await supabase
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

export async function deleteFacility(id) {
	const { data, error } = await supabase.from('facilities').delete().eq('id', id);

	return { data, error };
}

//! Units Functions
export async function getUnits() {
	let { data, error } = await supabase
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
	let { data, error } = await supabase.from('units').select(`*`).eq('facility_id', facility_id);

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

export async function editUnit({ unit, facility_id }) {
	let { data, error } = await supabase
		.from('units')
		.update({
			available: unit.available,
			climate: unit.climate,
			facility_id: facility_id,
			id: unit.id,
			length: unit.length,
			rented: unit.rented,
			spc_rate: unit.spc_rate,
			str_rate: unit.str_rate,
			unit_id: unit.unit_id,
			width: unit.width
		})
		.eq('facility_id', facility_id);

	return { data, error };
}

// TODO Units Functions
export async function createUnit(content) {
	const { data, error } = await supabase.from('units').insert(content);
	return { data, error };
}

export async function deleteUnit(id) {
	const { data, error } = await supabase.from('units').delete().eq('id', id);

	return { data, error };
}

export async function reserveUnit(unitId, available) {
	const { data, error } = await supabase
		.from('units')
		.update({ available: available - 1 })
		.match({ id: unitId });
	return { data, error };
}
