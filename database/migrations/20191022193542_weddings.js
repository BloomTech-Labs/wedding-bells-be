exports.up = function(knex) {
	return knex.schema.createTable("weddings", table => {
		table.increments();
		table
			.string("slug")
			.notNullable()
			.unique();
		table.datetime("date");
		table.string("location");
		table.integer("couple_id").references("couples.id");
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("weddings");
};
