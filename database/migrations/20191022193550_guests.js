exports.up = function(knex) {
	return knex.schema.createTable("guests", table => {
		table.uuid("id").primary();
		table.string("name").notNullable();
		table.string("email").notNullable();
		table
			.boolean("is_going")
			.defaultTo(false)
			.notNullable();
		table
			.boolean("has_responded")
			.defaultTo(false)
			.notNullable();
		table
			.boolean("plus_one")
			.defaultTo(true)
			.notNullable();
		table.integer("wedding_id").references("weddings.id");
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("guests");
};
