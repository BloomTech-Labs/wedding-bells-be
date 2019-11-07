const router = require("express").Router({ mergeParams: true });
const uuid = require("uuidv4").default;
const Guest = require("../models/guests");

router.get("/", async (req, res) => {
	const { weddingId } = req.params;
	try {
		const guests = await Guest.find(weddingId);
		res.status(200).json(guests);
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

router.get("/:id", async (req, res) => {
	const { id, weddingId } = req.params;
	try {
		const guest = await Guest.findById(id);
		if (!guest) {
			return res.status(404).json({
				error: `No guest exists with id ${id}!`,
			});
		} else {
			res.status(200).json(guest);
		}
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

router.post("/", async (req, res) => {
	const { weddingId } = req.params;
	const guest = req.body;
	if (Object.entries(guest).length === 0 || !guest.name || !guest.email) {
		return res.status(400).json({
			error: "Missing one or more required properties: name, email",
		});
	}
	try {
		const newGuest = await Guest.add({ id: uuid(), ...guest }, weddingId);
		res.status(201).json(newGuest);
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

router.put("/:id", async (req, res) => {
	const { id, weddingId } = req.params;
	const updates = req.body;
	try {
		const guest = await Guest.findById(id);
		if (!guest) {
			return res.status(404).json({
				error: `No guest exists with id ${id}!`,
			});
		} else {
			await Guest.update(id, updates);
			res.status(204).end();
		}
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = router;
