const db = require("add db here");

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update,
};

function find() {
	return db("users").select("id", "username");
}

function findBy(filter) {
	return db("users").where(filter);
}

async function add(user) {
	const [id] = await db("users").insert(user);

	return findById(id);
}

function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedUser = await findById(id);
		const getUser = await db("users")
			.where({ id })
			.del();
		return getUser ? getUser : null;
	} catch {
		throw new Error(err);
	}
}

async function update(exercise, id) {
	try {
		const updateUser = await db("users")
			.where({ id })
			.update(exercise);
		return updateUser;
	} catch (err) {
		throw new Error(err);
	}
}
