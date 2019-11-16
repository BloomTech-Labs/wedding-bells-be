const jwt = require("jsonwebtoken");
const Guest = require("../models/guests");
const Vendor = require("../models/vendors");
const db = require("../database/config");
const secrets = require("../config/secrets");

// function restricted(req, res, next) {
// 	const token = req.headers.authorization;

// 	if (token) {
// 		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
// 			if (err) {
// 				//Bad Token!
// 				res
// 					.status(401)
// 					.json({ message: "Houston, it appears our token is bad" });
// 			} else {
// 				//The token is a good token!
// 				req.decodedJwt = decodedToken;
// 				next();
// 			}
// 		});
// 	} else {
// 		res.status(401).json({ message: "Houston, we dont have any valid tokens" });
// 	}
// }

async function restricted(req, res, next) {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(400).json({
			error: "Missing token from `Authorization` header!",
		});
	}
	try {
		const [user] = await db("couples").where({ jwt: token });
		console.log(user);
		if (!user && token) {
			return res.status(401).json({
				error: "Invalid token, please try again after re-logging in.",
			});
		} else {
			jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
				if (error) {
					switch (error.name) {
						case "TokenExpiredError":
						case "JsonWebTokenError":
							return res.status(401).json({ ...error });
						default:
							return res.status(401).json({
								error: "Could not verify JWT token. Re-login and try again.",
							});
					}
				} else {
					//The token is a good token!
					req.decodedJwt = decodedToken;
					next();
				}
			});
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
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
	restricted,
	findGuestById,
	findVendorById,
};
