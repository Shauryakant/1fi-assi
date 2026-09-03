import { getProductBySlug } from "@/lib/data";
import ProductCardView from "@/components/ProductCardView";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-4">
      {/* Back Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-sm transition-all hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Main Product EMI Card View */}
      <ProductCardView product={product} />
    </div>
  );
}
