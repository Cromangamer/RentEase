const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      category,
      subCategory,
      brand,
      description,
      image,
      monthlyRent,
      securityDeposit,
      tenureOptions,
      stock,
    } = req.body;

    if (
      !title ||
      !category ||
      !subCategory ||
      !description ||
      !image ||
      monthlyRent === undefined ||
      securityDeposit === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const product = await Product.create({
      title,
      category,
      subCategory,
      brand,
      description,
      image,
      monthlyRent,
      securityDeposit,
      tenureOptions,
      stock,
      available: stock > 0,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category, subCategory } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    Object.assign(product, req.body);

    if (product.stock <= 0) {
      product.available = false;
    } else if (req.body.stock !== undefined) {
      product.available = true;
    }

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

