const db = require("../database/config");

const find = async weddingId => {
	try {
		return await db("guests").where({ wedding_id: weddingId });
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const findById = async id => {};
const findByFilter = async filter => {};
const add = async guest => {};
const update = async (id, guest) => {};
const remove = async id => {};

module.exports = {
	find,
	findById,
	findByFilter,
	add,
	update,
	remove,
};
