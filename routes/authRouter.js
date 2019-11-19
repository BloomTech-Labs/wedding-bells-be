const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const secrets = require("../config/secrets");

const db = require("../database/config");

const { restricted } = require("../middleware/index.js");

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
			error:
				"`spouse_one_name`, `spouse_two_name`, `email`, and `password` are required!",
		});
	}
	// insert user with hashed password
	try {
		const newSlug = `${spouse_one_name}and${spouse_two_name}`;
		const hash = bcrypt.hashSync(password, 10);
		const [id] = await db("couples")
			.insert({
				spouse_one_name,
				spouse_two_name,
				email,
				password: hash,
				slug: newSlug,
			})
			.returning("id");
		const [couple] = await db("couples").where({ id });
		return res.status(201).json(couple);
		// error
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

// post existing user so they can login
router.post("/login", async (req, res) => {
	const { email, password, spouse_two_name, spouse_one_name } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			error: "All fields are required",
		});
	}

	try {
		const [couple] = await db("couples").where({ email });
		if (couple && bcrypt.compareSync(password, couple.password)) {
			const token = generateToken(couple);

			await db("couples")
				.where({ email })
				.update({ jwt: token });

			return res.status(200).json({
				message: `Welcome ${spouse_one_name} and ${spouse_two_name}, ${token} `,
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

// BOB!!! WHY!?
router.post("/logout", restricted, async (req, res, next) => {
	// Access to this route handler is granted if a token is supplied via the
	// `Authorization` header as enforced by the `restricted` middleware.
	// Thus, we can ensure there is a `userId` from the decodedJwt.
	const userId = req.decodedJwt.subject;
	try {
		// Invalidate the current jwt associated with this user
		await db("couples")
			.where({ id: userId })
			.update({ jwt: null });
		// Next, handle deleting sessions for this user
		if (req.session) {
			req.session.destroy(error => {
				if (error) {
					return next(error);
				} else {
					return res.redirect("/");
				}
			});
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

module.exports = router;
