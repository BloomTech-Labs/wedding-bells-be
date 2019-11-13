require("dotenv").config();

const User = require("../models/users");

const express = require("express");

const router = express();
router.use(express.json());

const restricted = require("../middleware/index.js");

// GET User table
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET USER table with ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: "could not find user " });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to get user" });
	}
});

//POST to User table
router.post("/", async (req, res) => {
	const user = req.body;
	if (
		Object.entries(user).length === 0 ||
		!user.spouse_one_name ||
		!user.spouse_two_name ||
		!user.email ||
		!user.password
	) {
		return res.status(400).json({
			error:
				"Missing one or more required properties: spouse_one_name, spouse_two_name, email, password",
		});
	}
	try {
		if (user) {
			const newUser = await User.add(user);
			if (newUser) {
				res.status(201).json(newUser);
			}
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// EDIT USER with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const user = await User.findById(id);

		if (user) {
			const updatedUser = await User.update(changes, id);

			res.status(200).json(updatedUser);
		} else {
			res.status(404).json({ message: "could not find user with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to update user" });
	}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deleted = await User.remove(id);

		if (deleted) {
			res.status(200).json({ removed: deleted });
		} else {
			res.status(404).json({ message: "could not find user with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to delete user" });
	}
});

module.exports = router;
