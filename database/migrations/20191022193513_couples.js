exports.up = function(knex) {
	return knex.schema.createTable("couples", table => {
		table.increments();
		table.string("spouse_one_name").notNullable();
		table.string("spouse_two_name").notNullable();
		table
			.string("email")
			.notNullable()
			.unique();
		table.string("password").notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("couples");
};
