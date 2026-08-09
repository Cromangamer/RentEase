require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/product");

const products = [
  {
    title: "Modern Queen Bed",
    category: "Furniture",
    subCategory: "Bed",
    brand: "Urban Living",
    description:
      "Comfortable queen-size bed with a modern wooden frame, perfect for apartments and bedrooms.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    monthlyRent: 899,
    securityDeposit: 3000,
    tenureOptions: [3, 6, 12],
    stock: 8,
    available: true,
  },

  {
    title: "Premium 3-Seater Sofa",
    category: "Furniture",
    subCategory: "Sofa",
    brand: "HomeComfort",
    description:
      "Stylish and comfortable three-seater sofa suitable for modern living rooms.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    monthlyRent: 1199,
    securityDeposit: 4000,
    tenureOptions: [3, 6, 12],
    stock: 6,
    available: true,
  },

  {
    title: "Study Table",
    category: "Furniture",
    subCategory: "Table",
    brand: "WorkSpace",
    description:
      "Compact study table designed for students and working professionals.",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6b1",
    monthlyRent: 499,
    securityDeposit: 1500,
    tenureOptions: [3, 6, 12],
    stock: 12,
    available: true,
  },

  {
    title: "Large Wardrobe",
    category: "Furniture",
    subCategory: "Wardrobe",
    brand: "Urban Living",
    description:
      "Spacious wardrobe with multiple shelves and hanging space.",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    monthlyRent: 699,
    securityDeposit: 2500,
    tenureOptions: [3, 6, 12],
    stock: 7,
    available: true,
  },

  {
    title: "Double Door Refrigerator",
    category: "Appliances",
    subCategory: "Refrigerator",
    brand: "Samsung",
    description:
      "Energy-efficient double door refrigerator with spacious storage.",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5",
    monthlyRent: 1499,
    securityDeposit: 5000,
    tenureOptions: [3, 6, 12],
    stock: 5,
    available: true,
  },

  {
    title: "Fully Automatic Washing Machine",
    category: "Appliances",
    subCategory: "Washing Machine",
    brand: "LG",
    description:
      "Fully automatic washing machine suitable for everyday household use.",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
    monthlyRent: 1299,
    securityDeposit: 4500,
    tenureOptions: [3, 6, 12],
    stock: 4,
    available: true,
  },

  {
    title: "Smart LED Television",
    category: "Appliances",
    subCategory: "Television",
    brand: "Sony",
    description:
      "Full HD smart LED television with streaming and entertainment features.",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    monthlyRent: 999,
    securityDeposit: 3500,
    tenureOptions: [3, 6, 12],
    stock: 9,
    available: true,
  },

  {
    title: "Microwave Oven",
    category: "Appliances",
    subCategory: "Microwave",
    brand: "IFB",
    description:
      "Compact microwave oven for quick and convenient cooking.",
    image:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d",
    monthlyRent: 599,
    securityDeposit: 2000,
    tenureOptions: [3, 6, 12],
    stock: 10,
    available: true,
  },

  {
    title: "Split Air Conditioner",
    category: "Appliances",
    subCategory: "Air Conditioner",
    brand: "Voltas",
    description:
      "Energy-efficient split AC designed for comfortable apartment living.",
    image:
      "https://images.unsplash.com/photo-1631545806609-2f2c2e6e1a31",
    monthlyRent: 1899,
    securityDeposit: 6000,
    tenureOptions: [3, 6, 12],
    stock: 3,
    available: true,
  },

  {
    title: "Water Purifier",
    category: "Appliances",
    subCategory: "Water Purifier",
    brand: "Kent",
    description:
      "Multi-stage water purification system for safe household drinking water.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    monthlyRent: 449,
    securityDeposit: 1500,
    tenureOptions: [3, 6, 12],
    stock: 8,
    available: true,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedProducts();