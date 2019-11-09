const db = require("../database/config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update,
};

function find(weddingId) {
	return db("vendors").where({ wedding_id: weddingId });
}

function findBy(filter) {
	return db("vendors").where(filter);
}

async function add(vendor, weddingId) {
	const [id] = await db("vendors")
		.insert({ ...vendor, wedding_id: weddingId })
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("vendors").where({ id });
}

async function remove(id) {
	try {
		deletedVendor = await findById(id);
		const getVendor = await db("vendors")
			.where({ id })
			.del();
		return getVendor ? getVendor : null;
	} catch {
		throw new Error(err);
	}
}

async function update(id, updates) {
	try {
		const updateVendor = await db("vendors")
			.where({ id })
			.update(updates);
		return updateVendor;
	} catch (err) {
		throw new Error(err);
	}
}
