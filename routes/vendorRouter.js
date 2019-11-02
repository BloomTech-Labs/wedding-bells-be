require("dotenv").config();

const Vendor = require("../models/vendors");

const express = require("express");

const router = express();
router.use(express.json());

// GET VENDOR table
router.get("/", async (req, res) => {
	try {
		const vendors = await Vendor.find();
		res.json(vendors);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//POST to VENDOR table
router.post("/", async (req, res) => {
	const vendor = req.body;
	try {
		if (vendor) {
			const newVendor = await Vendor.add(vendor);
			if (newVendor) {
				res.status(201).json(newVendor);
			} else {
				res.status(404).json({ message: "vendor could not be added" });
			}
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET VENDOR table with ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const vendor = await Vendor.findById(id);

		if (vendor) {
			res.json(vendor);
		} else {
			res.status(404).json({ message: "could not find vendor" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to get vendor" });
	}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await Vendor.remove(id);

		if (deleted) {
			res.json({ removed: deleted });
		} else {
			res.status(404).json({ message: "could not find vendor with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to delete vendor" });
	}
});

// EDIT VENDOR with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const vendor = await Vendor.findById(id);

		if (vendor) {
			const updatedVendor = await Vendor.update(changes, id);
			res.json(updatedVendor);
		} else {
			res.status(404).json({ message: "could not find vendor with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to update vendor" });
	}
});

module.exports = router;