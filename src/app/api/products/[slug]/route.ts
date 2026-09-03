import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const { product, isDbConnected } = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with slug '${slug}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        source: isDbConnected ? "MongoDB Atlas" : "In-Memory / Fallback Data",
        data: product,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch product";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
