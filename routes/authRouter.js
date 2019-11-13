const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const secrets = require("../config/secrets");

function generateToken(user) {
	const payload = {
		subject: user.id,
		email: user.email,
		spouse_one_name: user.spouse_one_name,
		spouse_two_name: user.spouse_two_name,
	};

	const options = {
		expiresIn: "1d",
	};

	// extract the secret away so it can be required and used where needed
	return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

// post user w/ hashed password to register

// post existing user so they can login

module.exports = router;
