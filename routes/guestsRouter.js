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

router.get("/:id", async (req, res) => {});
router.post("/", async (req, res) => {});
router.put("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => {});

module.exports = router;
