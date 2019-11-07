require("dotenv").config();

const User = require("../models/users");

const express = require("express");

const router = express();
router.use(express.json());

// GET User table
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//POST to User table
router.post("/", async (req, res) => {
	const user = req.body;	
	try {
		if (user) {
			console.log(user);
			const newUser = await User.add(user);
			if (newUser) {
				res.status(201).json(newUser);
			} else {
				res.status(404).json({ message: "user could not be added" });
			}
		}
	} catch(err) {
		res.status(500).json({ message: err.message });
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
			res.status(404).json({ message: "could not find user" });
		}
	} catch(err) {
		res.status(500).json({ message: "failed to get user" });
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
	} catch(err) {
		res.status(500).json({ message: "failed to delete user" });
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

module.exports = router;
