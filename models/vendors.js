const db = require("../database/config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update,
};

function find() {
	return db("vendors").select("id", "company_name", "category");
}

function findBy(filter) {
	return db("vendors").where(filter);
}

async function add(vendor) {
	const [id] = await db("vendors")
		.insert(vendor)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("vendors")
		.select("id", "company_name")
		.where({ id })
		.first();
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

async function update(vendor, id) {
	try {
		const updateVendor = await db("vendors")
			.where({ id })
			.update(vendor);
		return updateVendor;
	} catch (err) {
		throw new Error(err);
	}
}
