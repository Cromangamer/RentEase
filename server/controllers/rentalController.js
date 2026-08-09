const Rental = require("../models/rental");
const Product = require("../models/product");

exports.createRental = async (req, res) => {
  try {
    const {
      productId,
      months,
      quantity,
      deliveryDate,
      deliveryAddress,
    } = req.body;

    if (
      !productId ||
      !months ||
      !deliveryDate ||
      !deliveryAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const rentalQuantity = quantity || 1;

    if (product.stock < rentalQuantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient product stock",
      });
    }

    if (!product.tenureOptions.includes(Number(months))) {
      return res.status(400).json({
        success: false,
        message: "Selected rental tenure is not available",
      });
    }

    const totalRent =
      product.monthlyRent * Number(months) * rentalQuantity;

    const securityDeposit =
      product.securityDeposit * rentalQuantity;

    const rental = await Rental.create({
      user: req.user.id,
      product: product._id,
      months: Number(months),
      quantity: rentalQuantity,
      deliveryDate,
      deliveryAddress,
      totalRent,
      securityDeposit,
    });

    res.status(201).json({
      success: true,
      message: "Rental request created successfully",
      rental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({
      user: req.user.id,
    })
      .populate("product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: rentals.length,
      rentals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate("product")
      .populate("user", "name email phone");

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }

    if (
      rental.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      rental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate("product")
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: rentals.length,
      rentals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateRentalStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Approved",
      "Active",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid rental status",
      });
    }

    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      });
    }

    // Approving rental → reduce stock
    if (
      status === "Approved" &&
      rental.status === "Pending"
    ) {
      const product = await Product.findById(rental.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.stock < rental.quantity) {
        return res.status(400).json({
          success: false,
          message: "Not enough stock available",
        });
      }

      product.stock -= rental.quantity;

      product.available = product.stock > 0;

      await product.save();
    }

    // Cancel approved rental → return stock
    if (
      status === "Cancelled" &&
      ["Approved", "Active"].includes(rental.status)
    ) {
      const product = await Product.findById(rental.product);

      if (product) {
        product.stock += rental.quantity;
        product.available = true;

        await product.save();
      }
    }

    rental.status = status;

    await rental.save();

    res.json({
      success: true,
      message: "Rental status updated successfully",
      rental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};