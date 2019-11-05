const router = require("express").Router({ mergeParams: true });
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
	try {
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
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
