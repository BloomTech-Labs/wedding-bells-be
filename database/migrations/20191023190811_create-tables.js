exports.up = function(knex) {
	return knex.schema
		.createTable("couples", table => {
			table.increments();
			table.string("spouse_one_name").notNullable();
			table.string("spouse_two_name").notNullable();
			table
				.string("email")
				.notNullable()
				.unique();
			table.string("password").notNullable();
			table
				.string("slug")
				.notNullable()
				.unique();
			table.string("jwt", 512);
		})

		.createTable("weddings", table => {
			table.increments();
			table.datetime("date");
			table.string("location");
			table.string("slug").references("couples.slug");
			table.integer("couple_id").references("couples.id");
		})

		.createTable("guests", table => {
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
		})

		.createTable("vendors", table => {
			table.increments();
			table.string("company_name").notNullable();
			table.enu("category", [
				"Photographer",
				"Venue",
				"Hair Stylist",
				"Attire",
				"Bakery",
				"Florist",
				"Musicians",
				"Stationer",
				"Jeweler",
				"Favors",
				"Rentals",
				"Transportation Service",
				"Lighting",
			]);
			table.integer("wedding_id").references("weddings.id");
		})
		.createTable("wedding_vendors", table => {
			table.integer("wedding_id").references("weddings.id");
			table.integer("vendor_id").references("vendors.id");
			table.primary(["wedding_id", "vendor_id"]);
		})
		.createTable("announcements", table => {
			table.increments();
			table.string("title").notNullable();
			table.string("announcement").notNullable();
			table.datetime("time_stamp");
			table.integer("couple_id").references("couples.id");
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("announcements")
		.dropTableIfExists("wedding_vendors")
		.dropTableIfExists("vendors")
		.dropTableIfExists("guests")
		.dropTableIfExists("weddings")
		.dropTableIfExists("couples");
};
