
exports.seed = function(knex) {
  return knex("weddings").insert([
    {
      slug: "Brey&Abby",
      // date: 2020-09-21,
      location: "River Uplands Farm",
      couple_id: 1
    },
    {
      slug: "Kim&John",
      // date: 2020-05-18,
      location: "",
      couple_id: 2
    },
    {
      slug: "Sarah&Mike",
      // date: 2020-07-07,
      location: "Chapel",
      couple_id: 3
    },
  ]);
};
