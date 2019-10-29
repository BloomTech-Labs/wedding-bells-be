require("dotenv").config();
module.exports = {
	development: {
		client: "pg",
		useNullAsDefault: true,
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: true
		},
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
	production: {
		client: 'pg',
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: true
		},
		migrations: {
			directory: './database/migrations',
		},
		seeds: {
			directory: './database/seeds',
		},
	},
};

