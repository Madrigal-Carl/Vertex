import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import { faker } from "@faker-js/faker";

import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Review from "../models/rewiew.model.js";

const MONGO_URI = process.env.MONGO_URI;

const CATEGORIES = ["Laptops", "Phones", "Tablets", "Accessories", "Audio"];

const PRODUCTS = {
  Laptops: [
    "MacBook Air M3",
    "Dell XPS 13",
    "Lenovo ThinkPad X1",
    "ASUS ROG Zephyrus",
  ],
  Phones: [
    "iPhone 16 Pro",
    "Samsung Galaxy S26",
    "Google Pixel 11",
    "Nothing Phone 4",
  ],
  Tablets: ["iPad Air", "Samsung Galaxy Tab S11", "Xiaomi Pad 8"],
  Accessories: ["USB-C Hub", "Wireless Charger", "Laptop Stand", "Power Bank"],
  Audio: [
    "AirPods Pro",
    "Sony WH-1000XM6",
    "JBL Charge 7",
    "Soundcore Liberty 5",
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected");

    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Review.deleteMany({}),
    ]);

    console.log("Collections cleared");

    // USERS
    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        fullname: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: "password123",
        isVerified: true,
        role: "customer",
      });
    }

    const createdUsers = await User.insertMany(users);

    console.log(`${createdUsers.length} users created`);

    // CATEGORIES
    const createdCategories = await Category.insertMany(
      CATEGORIES.map((name) => ({ name })),
    );

    console.log(`${createdCategories.length} categories created`);

    // PRODUCTS
    const products = [];

    for (const category of createdCategories) {
      const names = PRODUCTS[category.name];

      for (const productName of names) {
        let variants = [];

        if (category.name === "Phones" || category.name === "Tablets") {
          variants = [
            {
              sku: faker.string.alphanumeric(10).toUpperCase(),
              attributes: {
                color: "Black",
                storage: "128GB",
              },
              price: {
                original: 25000,
                discounted: 22000,
              },
            },
            {
              sku: faker.string.alphanumeric(10).toUpperCase(),
              attributes: {
                color: "Black",
                storage: "256GB",
              },
              price: {
                original: 30000,
                discounted: 27000,
              },
            },
            {
              sku: faker.string.alphanumeric(10).toUpperCase(),
              attributes: {
                color: "White",
                storage: "512GB",
              },
              price: {
                original: 40000,
                discounted: 36000,
              },
            },
          ];
        }

        if (category.name === "Laptops") {
          variants = [
            {
              sku: faker.string.alphanumeric(10).toUpperCase(),
              attributes: {
                color: "Silver",
                ram: "8GB",
                storage: "256GB SSD",
              },
              price: {
                original: 45000,
                discounted: 42000,
              },
            },
            {
              sku: faker.string.alphanumeric(10).toUpperCase(),
              attributes: {
                color: "Silver",
                ram: "16GB",
                storage: "512GB SSD",
              },
              price: {
                original: 60000,
                discounted: 55000,
              },
            },
          ];
        }

        if (category.name === "Accessories" || category.name === "Audio") {
          variants = [
            {
              sku: faker.string.alphanumeric(10).toUpperCase(),
              attributes: {
                size: "Small",
                color: "Black",
              },
              price: {
                original: 1000,
                discounted: 900,
              },
            },
            {
              sku: faker.string.alphanumeric(10).toUpperCase(),
              attributes: {
                size: "Medium",
                color: "Black",
              },
              price: {
                original: 1200,
                discounted: 1000,
              },
            },
            {
              sku: faker.string.alphanumeric(10).toUpperCase(),
              attributes: {
                size: "Large",
                color: "Black",
              },
              price: {
                original: 1500,
                discounted: 1300,
              },
            },
          ];
        }

        products.push({
          categoryId: category._id,
          name: productName,
          description: faker.commerce.productDescription(),
          variants,
          images: [
            {
              url: faker.image.urlPicsumPhotos({
                width: 600,
                height: 600,
              }),
              isPrimary: true,
            },
          ],
        });
      }
    }

    const createdProducts = await Product.insertMany(products);

    console.log(`${createdProducts.length} products created`);

    // PRODUCT REVIEWS
    const productReviews = [];

    for (const product of createdProducts) {
      const reviewCount = faker.number.int({
        min: 3,
        max: 10,
      });

      for (let i = 0; i < reviewCount; i++) {
        const randomUser =
          createdUsers[
            faker.number.int({
              min: 0,
              max: createdUsers.length - 1,
            })
          ];

        productReviews.push({
          userId: randomUser._id,

          targetType: "product",

          targetId: product._id,

          rating: faker.number.int({
            min: 3,
            max: 5,
          }),

          comment: faker.helpers.arrayElement([
            "Excellent quality product.",
            "Worth every peso.",
            "Fast delivery and great packaging.",
            "Highly recommended.",
            "Works perfectly.",
            "Good value for money.",
          ]),
        });
      }
    }

    // WEBSITE REVIEWS
    const websiteReviews = createdUsers.map((user) => ({
      userId: user._id,

      targetType: "website",

      targetId: null,

      rating: faker.number.int({
        min: 4,
        max: 5,
      }),

      comment: faker.helpers.arrayElement([
        "Easy to use website.",
        "Checkout process was smooth.",
        "Great customer support.",
        "Will order again.",
        "Very user friendly.",
      ]),
    }));

    await Review.insertMany([...productReviews, ...websiteReviews]);

    console.log(
      `${productReviews.length + websiteReviews.length} reviews created`,
    );

    console.log("Seeding completed");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
