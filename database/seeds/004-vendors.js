exports.seed = function(knex) {
  return knex("vendors").insert([
    {
      company_name: "Photos n' stuff"
    },
    {
      company_name: "Photos n' stuff"
    },
    {
      company_name: "Photos n' stuff"
    }
  ]);
};
