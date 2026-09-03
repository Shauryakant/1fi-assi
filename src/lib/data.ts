import { connectToDatabase } from "./mongodb";
import ProductModel, { IProduct } from "@/models/Product";
import { initialProducts } from "./seedData";

export async function seedDatabaseIfEmpty() {
  const db = await connectToDatabase();
  if (!db) return false;

  try {
    const count = await ProductModel.countDocuments();
    if (count === 0) {
      console.log("🌱 Database is empty. Seeding initial products...");
      await ProductModel.insertMany(initialProducts);
      console.log("✅ Seeded products into MongoDB!");
    }
    return true;
  } catch (error) {
    console.error("Error checking or seeding database:", error);
    return false;
  }
}

export async function getAllProducts(): Promise<{ isDbConnected: boolean; products: IProduct[] }> {
  const db = await connectToDatabase();
  
  if (db) {
    try {
      await seedDatabaseIfEmpty();
      const products = await ProductModel.find({}).lean();
      if (products && products.length > 0) {
        return {
          isDbConnected: true,
          products: JSON.parse(JSON.stringify(products)) as IProduct[],
        };
      }
    } catch (err) {
      console.error("Failed to fetch products from MongoDB:", err);
    }
  }

  // Fallback to dynamic mock data if MongoDB is unreachable
  return {
    isDbConnected: false,
    products: initialProducts as unknown as IProduct[],
  };
}

export async function getProductBySlug(slug: string): Promise<{ isDbConnected: boolean; product: IProduct | null }> {
  const db = await connectToDatabase();

  if (db) {
    try {
      await seedDatabaseIfEmpty();
      const product = await ProductModel.findOne({ slug }).lean();
      if (product) {
        return {
          isDbConnected: true,
          product: JSON.parse(JSON.stringify(product)) as IProduct,
        };
      }
    } catch (err) {
      console.error(`Failed to fetch product '${slug}' from MongoDB:`, err);
    }
  }

  // Fallback to dynamic mock data matching slug
  const fallbackProduct = initialProducts.find((p) => p.slug === slug);
  return {
    isDbConnected: false,
    product: (fallbackProduct as unknown as IProduct) || null,
  };
}
