require("dotenv").config();
module.exports = {
	development: {
		client: "pg",
		useNullAsDefault: true,
		connection: process.env.DB_CONNECTION_URI,
		// pool: {
		// 	afterCreate: (conn, done) => {
		// 		conn.run("PRAGMA foreign_keys = ON", done);
		// 	},
		// },
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
};
