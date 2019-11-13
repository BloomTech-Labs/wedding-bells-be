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
router.post("/login", async (req, res) => {
	const { email, password, spouse_two_name, spouse_one_name } = req.body;
	if (!email || !password || !spouse_one_name || !spouse_two_name) {
		return res.status(400).json({
			error: "All fields are required",
		});
	}

	try {
		const [couple] = await db("couples").where({ email });
		if (couple && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			await db("couples")
				.where({ email })
				.update({ jwt: token });
			return res.status(200).json({
				message: `Welcome ${spouse_one_name} and ${spouse_two_name}, token `,
			});
		} else {
			return res.status(401).json({
				error:
					"You're killing me smalls! You need to provide matching and existing credentials",
			});
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

module.exports = router;
