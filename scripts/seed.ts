import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { initialProducts } from "../src/lib/seedData";

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

async function main() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI as string);
  console.log("Connected successfully!");

  console.log("Clearing existing products collection...");
  await Product.deleteMany({});

  console.log("Inserting seed data from seedData.ts...");
  const inserted = await Product.insertMany(initialProducts);
  console.log(`✅ Successfully seeded ${inserted.length} products with multiple variants and EMI plans!`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
