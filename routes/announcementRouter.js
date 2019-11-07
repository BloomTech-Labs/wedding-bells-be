require("dotenv").config();

const Announcement = require("../models/announcement");

const express = require("express");

const router = express();
router.use(express.json());

// GET Announcement table
router.get("/", async (req, res) => {
	try {
		const announcement = await Announcement.find();
		res.json(announcement);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//POST to Announcement table
router.post("/", async (req, res) => {
	const announcement = req.body;
	try {
		if (announcement) {
			const newAnnouncement = await Announcement.add(announcement);
			if (newAnnouncement) {
				res.status(201).json(newAnnouncement);
			} else {
				res.status(404).json({ message: "announcement could not be added" });
			}
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET Announcement table with ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const announcement = await Announcement.findById(id);

		if (announcement) {
			res.json(announcement);
		} else {
			res.status(404).json({ message: "could not find announcement" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to get announcement" });
	}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await Announcement.remove(id);

		if (deleted) {
			res.json({ removed: deleted });
		} else {
			res
				.status(404)
				.json({ message: "could not find announcement with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to delete announcement" });
	}
});

// EDIT Announcement with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const announcement = await Announcement.findById(id);

		if (announcement) {
			const updatedAnnouncement = await Announcement.update(changes, id);

			res.json(updatedAnnouncement);
		} else {
			res
				.status(404)
				.json({ message: "could not find announcement with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to update announcement" });
	}
});

module.exports = router;
