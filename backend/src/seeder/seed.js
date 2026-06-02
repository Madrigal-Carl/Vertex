import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config();

import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Variant from "../models/variant.model.js";
import Inventory from "../models/inventory.model.js";
import Review from "../models/review.model.js";

const MONGO_URI = process.env.MONGO_URI;

const CATEGORIES = [
  "Laptops",
  "Phones",
  "Tablets",
  "Accessories",
  "Audio",
  "Gaming",
];
const PRODUCTS = {
  Laptops: [
    "MacBook Air M3",
    "Dell XPS 13",
    "Lenovo ThinkPad X1",
    "ASUS ROG Zephyrus",
    "HP Spectre x360",
  ],
  Phones: [
    "iPhone 16 Pro",
    "Samsung Galaxy S26",
    "Google Pixel 11",
    "Nothing Phone 4",
    "OnePlus 14",
  ],
  Tablets: [
    "iPad Air",
    "Samsung Galaxy Tab S11",
    "Xiaomi Pad 8",
    "OnePlus Pad 3",
    "Lenovo Tab Extreme",
  ],
  Accessories: [
    "USB-C Hub",
    "Wireless Charger",
    "Laptop Stand",
    "Power Bank",
    "Mechanical Keyboard",
  ],
  Audio: [
    "AirPods Pro",
    "Sony WH-1000XM6",
    "JBL Charge 7",
    "Soundcore Liberty 5",
    "Bose QuietComfort Ultra",
  ],
  Gaming: [
    "PlayStation 5",
    "Xbox Series X",
    "Nintendo Switch OLED",
    "Steam Deck OLED",
    "ASUS ROG Ally",
  ],
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected");

    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Variant.deleteMany({}),
      Inventory.deleteMany({}),
      Review.deleteMany({}),
    ]);

    console.log("Collections cleared");

    // ================= USERS =================

    const users = await User.insertMany(
      Array.from({ length: 10 }).map(() => ({
        fullname: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: "password123",
        isVerified: true,
        role: "customer",
      })),
    );

    console.log(`${users.length} users created`);

    // ================= CATEGORIES =================

    const categories = await Category.insertMany(
      CATEGORIES.map((name) => ({ name })),
    );

    console.log(`${categories.length} categories created`);

    // ================= PRODUCTS =================

    const products = [];
    const variants = [];
    const inventoryItems = [];

    for (const category of categories) {
      const productNames = PRODUCTS[category.name];

      if (!productNames) continue;

      for (const productName of productNames) {
        const imageCount = faker.number.int({
          min: 3,
          max: 4,
        });

        const product = await Product.create({
          categoryId: category._id,
          name: productName,
          description: faker.commerce.productDescription(),

          discount: faker.helpers.arrayElement([0, 5, 10, 15, 20]),

          images: Array.from({ length: imageCount }).map((_, index) => ({
            url: faker.image.urlPicsumPhotos({
              width: 600,
              height: 600,
            }),
            isPrimary: index === 0,
          })),
        });

        products.push(product);

        let variantDefinitions = [];

        // ================= PHONES / TABLETS =================

        if (category.name === "Phones" || category.name === "Tablets") {
          variantDefinitions = [
            {
              attributes: {
                color: "Black",
                storage: "128GB",
              },
              price: 25000,
            },
            {
              attributes: {
                color: "Black",
                storage: "256GB",
              },
              price: 30000,
            },
            {
              attributes: {
                color: "White",
                storage: "512GB",
              },
              price: 40000,
            },
          ];
        }

        // ================= LAPTOPS =================

        if (category.name === "Laptops") {
          variantDefinitions = [
            {
              attributes: {
                color: "Silver",
                ram: "8GB",
                storage: "256GB SSD",
              },
              price: 45000,
            },
            {
              attributes: {
                color: "Silver",
                ram: "16GB",
                storage: "512GB SSD",
              },
              price: 65000,
            },
          ];
        }

        // ================= ACCESSORIES / AUDIO =================

        if (category.name === "Accessories" || category.name === "Audio") {
          variantDefinitions = [
            {
              attributes: {
                color: "Black",
                size: "Small",
              },
              price: 1000,
            },
            {
              attributes: {
                color: "Black",
                size: "Medium",
              },
              price: 1500,
            },
            {
              attributes: {
                color: "Black",
                size: "Large",
              },
              price: 2000,
            },
          ];
        }

        // ================= GAMING =================

        if (category.name === "Gaming") {
          variantDefinitions = [
            {
              attributes: {
                color: "Black",
                edition: "Standard",
              },
              price: 25000,
            },
            {
              attributes: {
                color: "Black",
                edition: "Bundle",
              },
              price: 30000,
            },
            {
              attributes: {
                color: "White",
                edition: "Limited",
              },
              price: 35000,
            },
          ];
        }

        // ================= VARIANTS =================

        for (const definition of variantDefinitions) {
          const variant = await Variant.create({
            productId: product._id,

            sku: faker.string.alphanumeric(10).toUpperCase(),

            attributes: definition.attributes,

            price: definition.price,
          });

          variants.push(variant);

          // ================= INVENTORY =================

          const stockCount = faker.number.int({
            min: 5,
            max: 20,
          });

          const inventory = Array.from({
            length: stockCount,
          }).map(() => ({
            variantId: variant._id,

            serialNumber: faker.string.uuid(),

            status: faker.helpers.weightedArrayElement([
              {
                weight: 80,
                value: "available",
              },
              {
                weight: 10,
                value: "reserved",
              },
              {
                weight: 10,
                value: "sold",
              },
            ]),
          }));

          const createdInventory = await Inventory.insertMany(inventory);

          inventoryItems.push(...createdInventory);
        }
      }
    }

    console.log(`${products.length} products created`);
    console.log(`${variants.length} variants created`);
    console.log(`${inventoryItems.length} inventory items created`);

    // ================= PRODUCT REVIEWS =================

    const productReviews = [];

    for (const product of products) {
      const reviewCount = faker.number.int({
        min: 3,
        max: 10,
      });

      for (let i = 0; i < reviewCount; i++) {
        const user =
          users[
            faker.number.int({
              min: 0,
              max: users.length - 1,
            })
          ];

        productReviews.push({
          userId: user._id,
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

    const websiteReviews = users.map((user) => ({
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
