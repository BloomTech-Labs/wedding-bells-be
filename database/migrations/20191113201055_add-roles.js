exports.up = function(knex) {
	return knex.schema.table("couples", table => {
		table.string("role");
	});
};

exports.down = function(knex) {
	return knex.schema.table("couples", table => {
		table.dropColumn;
	});
};
