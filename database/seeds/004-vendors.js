exports.seed = function(knex) {
  return knex("vendors").insert([
    {
      company_name: "Photos n' stuff",
      category: "Photographer"
    },
    {
      company_name: "Lucy's Hair Styling",
      category: "Hair Stylist"
    },
    {
      company_name: "Suger Butter Flour",
      category: "Bakery"
    }
  ]);
};
