exports.up = function(knex) {
	return knex.schema.createTable("wedding_vendor", table => {
		table.integer("wedding_id").references("weddings.id");
		table.integer("vendor_id").references("vendors.id");
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("wedding_vendor");
};
