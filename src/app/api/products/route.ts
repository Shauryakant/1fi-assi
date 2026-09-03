import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/data";

export async function GET() {
  try {
    const { products, isDbConnected } = await getAllProducts();
    return NextResponse.json(
      {
        success: true,
        source: isDbConnected ? "MongoDB Atlas" : "In-Memory / Fallback Data",
        count: products.length,
        data: products,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
