const express = require("express");

const router = express.Router();

const {
  createMaintenanceRequest,
  getMyMaintenanceRequests,
  getAllMaintenanceRequests,
  updateMaintenanceStatus,
} = require("../controllers/maintenanceController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", auth, createMaintenanceRequest);

router.get("/my", auth, getMyMaintenanceRequests);

router.get("/", auth, admin, getAllMaintenanceRequests);

router.patch("/:id/status", auth, admin, updateMaintenanceStatus);

module.exports = router;