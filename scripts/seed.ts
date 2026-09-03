import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Simple helper to load .env.local variables
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...values] = trimmed.split("=");
        if (key && values.length > 0) {
          process.env[key.trim()] = values.join("=").trim();
        }
      }
    }
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is missing in .env.local!");
  process.exit(1);
}

const VariantSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    color: { type: String, required: true },
    colorCode: { type: String, required: true },
    storage: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const EMIPlanSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    tenureMonths: { type: Number, required: true },
    monthlyAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    cashbackAmount: { type: Number, default: 0 },
    cashbackDescription: { type: String, default: "" },
    isPopular: { type: Boolean, default: false },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tag: { type: String, default: "" },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    variants: [VariantSchema],
    emiPlans: [EMIPlanSchema],
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const seedData = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    tag: "NEW",
    brand: "Apple",
    category: "Smartphones",
    description: "The ultimate iPhone with titanium design, revolutionary camera system, and powerful A19 Pro chip.",
    variants: [
      {
        id: "iph17p-256-orange",
        color: "Cosmic Orange",
        colorCode: "#e87a3e",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "iph17p-256-titanium",
        color: "Natural Titanium",
        colorCode: "#d5d3ce",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "iph17p-256-navy",
        color: "Deep Navy",
        colorCode: "#2c384e",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "iph17p-512-orange",
        color: "Cosmic Orange",
        colorCode: "#e87a3e",
        storage: "512GB",
        mrp: 154900,
        price: 147400,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
      },
    ],
    emiPlans: [
      {
        id: "emi-3m",
        tenureMonths: 3,
        monthlyAmount: 44967,
        interestRate: 0,
        cashbackAmount: 7500,
        cashbackDescription: "Additional cashback of ₹7,500",
        isPopular: false,
      },
      {
        id: "emi-6m",
        tenureMonths: 6,
        monthlyAmount: 22483,
        interestRate: 0,
        cashbackAmount: 7500,
        cashbackDescription: "Additional cashback of ₹7,500",
        isPopular: true,
      },
      {
        id: "emi-12m",
        tenureMonths: 12,
        monthlyAmount: 11242,
        interestRate: 0,
        cashbackAmount: 7500,
        cashbackDescription: "Additional cashback of ₹7,500",
        isPopular: false,
      },
      {
        id: "emi-24m",
        tenureMonths: 24,
        monthlyAmount: 5621,
        interestRate: 0,
        cashbackAmount: 7500,
        cashbackDescription: "Additional cashback of ₹7,500",
        isPopular: false,
      },
      {
        id: "emi-36m",
        tenureMonths: 36,
        monthlyAmount: 4297,
        interestRate: 10.5,
        cashbackAmount: 7500,
        cashbackDescription: "Additional cashback of ₹7,500",
        isPopular: false,
      },
      {
        id: "emi-48m",
        tenureMonths: 48,
        monthlyAmount: 3385,
        interestRate: 10.5,
        cashbackAmount: 7500,
        cashbackDescription: "Additional cashback of ₹7,500",
        isPopular: false,
      },
      {
        id: "emi-60m",
        tenureMonths: 60,
        monthlyAmount: 2842,
        interestRate: 10.5,
        cashbackAmount: 7500,
        cashbackDescription: "Additional cashback of ₹7,500",
        isPopular: false,
      },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    tag: "BESTSELLER",
    brand: "Samsung",
    category: "Smartphones",
    description: "Galaxy AI is here. Epic camera with 200MP sensor, built-in S Pen, and Titanium frame.",
    variants: [
      {
        id: "s24u-256-gray",
        color: "Titanium Gray",
        colorCode: "#64676b",
        storage: "256GB",
        mrp: 139999,
        price: 129999,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "s24u-256-violet",
        color: "Titanium Violet",
        colorCode: "#55476a",
        storage: "256GB",
        mrp: 139999,
        price: 129999,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
      },
    ],
    emiPlans: [
      {
        id: "s24u-emi-3m",
        tenureMonths: 3,
        monthlyAmount: 43333,
        interestRate: 0,
        cashbackAmount: 6000,
        cashbackDescription: "Additional cashback of ₹6,000",
        isPopular: false,
      },
      {
        id: "s24u-emi-6m",
        tenureMonths: 6,
        monthlyAmount: 21667,
        interestRate: 0,
        cashbackAmount: 6000,
        cashbackDescription: "Additional cashback of ₹6,000",
        isPopular: true,
      },
      {
        id: "s24u-emi-12m",
        tenureMonths: 12,
        monthlyAmount: 10833,
        interestRate: 0,
        cashbackAmount: 6000,
        cashbackDescription: "Additional cashback of ₹6,000",
        isPopular: false,
      },
    ],
  },
  {
    name: "MacBook Pro 16-inch M3",
    slug: "macbook-pro-m3",
    tag: "PRO PERFORMANCE",
    brand: "Apple",
    category: "Laptops",
    description: "Mind-blowing performance with Apple M3 Max silicon, Liquid Retina XDR display, and up to 22 hours battery life.",
    variants: [
      {
        id: "mbp-512-black",
        color: "Space Black",
        colorCode: "#2e3034",
        storage: "512GB SSD",
        mrp: 219900,
        price: 199900,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
      },
    ],
    emiPlans: [
      {
        id: "mbp-emi-6m",
        tenureMonths: 6,
        monthlyAmount: 33317,
        interestRate: 0,
        cashbackAmount: 10000,
        cashbackDescription: "Additional cashback of ₹10,000",
        isPopular: true,
      },
      {
        id: "mbp-emi-12m",
        tenureMonths: 12,
        monthlyAmount: 16658,
        interestRate: 0,
        cashbackAmount: 10000,
        cashbackDescription: "Additional cashback of ₹10,000",
        isPopular: false,
      },
    ],
  },
];

async function main() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI as string);
  console.log("Connected successfully!");

  console.log("Clearing existing products collection...");
  await Product.deleteMany({});

  console.log("Inserting seed data...");
  const inserted = await Product.insertMany(seedData);
  console.log(`✅ Successfully seeded ${inserted.length} products with EMI plans!`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
