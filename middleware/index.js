const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Guest = require("../models/guests");
const Vendor = require("../models/vendors");

const secrets = require("../config/secrets");

function restricted(req, res, next) {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
			if (err) {
				//Bad Token!
				res
					.status(401)
					.json({ message: "Houston, it appears our token is bad" });
			} else {
				//The token is a good token!
				req.decodedJwt = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ message: "Houston, we dont have any valid tokens" });
	}
}

function generateToken(user) {
	const payload = {
		subject: user.id,
		email: user.email,
		name: user.name,
	};

	const options = {
		expiresIn: "1d",
	};

	// extract the secret away so it can be required and used where needed
	return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

const findGuestById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const guest = await Guest.findById(id);
		if (!guest) {
			return res.status(404).json({
				error: `No guest exists with id ${id}!`,
			});
		} else {
			req.guest = guest;
			next();
		}
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
		throw err;
	}
};

const findVendorById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const vendor = await Vendor.findById(id);
		if (!vendor) {
			return res.status(404).json({
				error: `No vendor exists with id ${id}!`,
			});
		} else {
			req.vendor = vendor;
			next();
		}
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
		throw err;
	}
};

module.exports = {
	generateToken,
	restricted,
	findGuestById,
	findVendorById,
};
