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
router.post("/register", async (req, res) => {
	const { spouse_one_name, spouse_two_name, email, password } = req.body;
	// catch if empty field
	if (!spouse_one_name || !spouse_two_name || !email || !password) {
		return res.status(400).json({
			error: "`spouse_one_name`, `spouse_two_name`, `email`, and `password` are required!"
		});
	}
	// insert user with hashed password
	try {
		const hash = bcrypt.hashSync(password, 10);
		const [id] = await db("couples").insert({
			spouse_one_name,
			spouse_two_name,
			email,
			password: hash,
		});
		const [couple] = await db("couples").where({ id });
		return res.status(201).json(couple);
	// error
	} catch (error) {
		res.status(500).json({
			error: error.message
		});
	}
});

// post existing user so they can login

module.exports = router;
