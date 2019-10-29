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
	return db("couples").select("id", "email");
}

function findBy(filter) {
	return db("couples").where(filter);
}

async function add(user) {
	const [id] = await db("couples").insert(user);

	return findById(id);
}

function findById(id) {
	return db("couples")
		.select("id", "email")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedUser = await findById(id);
		const getUser = await db("couples")
			.where({ id })
			.del();
		return getUser ? getUser : null;
	} catch {
		throw new Error(err);
	}
}

async function update(user, id) {
	try {
		const updateUser = await db("users")
			.where({ id })
			.update(user);
		return updateUser;
	} catch (err) {
		throw new Error(err);
	}
}
