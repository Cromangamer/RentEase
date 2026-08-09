const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    months: {
      type: Number,
      required: true,
      enum: [3, 6, 12],
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },

    totalRent: {
      type: Number,
      required: true,
      min: 0,
    },

    securityDeposit: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Active",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rental", rentalSchema);