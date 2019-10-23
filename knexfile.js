module.exports = {
	development: {
		client: "pg",
		useNullAsDefault: true,
		connection: "postgres://localhost/wedding_bells_db",
		pool: {
			afterCreate: (conn, done) => {
				conn.run("PRAGMA foreign_keys = ON", done);
			},
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
};
