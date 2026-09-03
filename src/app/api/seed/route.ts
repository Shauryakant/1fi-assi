import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import { initialProducts } from "@/lib/seedData";

export async function POST() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not connect to MongoDB Atlas. Check your MONGODB_URI.",
        },
        { status: 500 }
      );
    }

    // Clear existing products and re-seed
    await ProductModel.deleteMany({});
    const inserted = await ProductModel.insertMany(initialProducts);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully seeded MongoDB database with sample products and EMI plans!",
        count: inserted.length,
        data: inserted,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}
