const express = require("express");

const router = express.Router();

const {
  createRental,
  getMyRentals,
  getRentalById,
  getAllRentals,
  updateRentalStatus,
} = require("../controllers/rentalController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", auth, createRental);

router.get("/my", auth, getMyRentals);

router.get("/:id", auth, getRentalById);

router.get("/", auth, admin, getAllRentals);

router.patch("/:id/status", auth, admin, updateRentalStatus);

module.exports = router;