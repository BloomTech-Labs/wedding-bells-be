exports.seed = function(knex) {
	return knex("weddings").insert([
		{
			date: "2020-09-21 16:00:00",
			location: "River Uplands Farm",
			couple_id: 1,
			slug: "BreyandAbby",
		},
		{
			date: "2020-06-28 19:10:25",
			location: "",
			couple_id: 2,
			slug: "KimandJohn",
		},
		{
			date: "2020-07-15 19:10:25",
			location: "Chapel",
			couple_id: 3,
			slug: "SarahandMike",
		},
	]);
};
