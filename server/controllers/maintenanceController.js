const Maintenance = require("../models/maintenance");
const Rental = require("../models/rental");

exports.createMaintenanceRequest = async (req, res) => {
  try {
    const { rentalId, issue } = req.body;

    if (!rentalId || !issue) {
      return res.status(400).json({
        success: false,
        message: "Rental and issue are required",
      });
    }

    const rental = await Rental.findById(rentalId);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }

    if (rental.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only request maintenance for your own rental",
      });
    }

    if (!["Approved", "Active"].includes(rental.status)) {
      return res.status(400).json({
        success: false,
        message: "Maintenance is only available for active rentals",
      });
    }

    const request = await Maintenance.create({
      user: req.user.id,
      rental: rentalId,
      issue,
    });

    res.status(201).json({
      success: true,
      message: "Maintenance request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyMaintenanceRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find({
      user: req.user.id,
    })
      .populate({
        path: "rental",
        populate: {
          path: "product",
        },
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllMaintenanceRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find()
      .populate("user", "name email phone")
      .populate({
        path: "rental",
        populate: {
          path: "product",
          select: "title image monthlyRent",
        },
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateMaintenanceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "In Progress",
      "Resolved",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid maintenance status",
      });
    }

    const request = await Maintenance.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Maintenance request not found",
      });
    }

    request.status = status;

    await request.save();

    res.json({
      success: true,
      message: "Maintenance status updated successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};