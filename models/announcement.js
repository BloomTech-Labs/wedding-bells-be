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
	return db("announcements").select(
		"id",
		"title",
		"announcement",
		"time_stamp"
	);
}

function findBy(filter) {
	return db("announcements").where(filter);
}

async function add(announcement) {
	const [id] = await db("announcements")
		.insert(announcement)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("announcements")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedAnnouncement = await findById(id);
		const getAnnouncement = await db("announcements")
			.where({ id })
			.del();
		return getAnnouncement ? getAnnouncement : null;
	} catch {
		throw new Error(err);
	}
}

async function update(announcement, id) {
	try {
		const updateAnnouncement = await db("announcements")
			.where({ id })
			.update(announcement);
		return updateAnnouncement;
	} catch (err) {
		throw new Error(err);
	}
}
