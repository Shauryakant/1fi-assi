import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/data";
import { IProduct, IEMIPlan } from "@/models/Product";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export const revalidate = 0; // Fetch fresh data on request

export default async function HomePage() {
  const { products, isDbConnected } = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Smart Shopping with 1Fi</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Unlock Premium Tech with <br className="hidden sm:inline" />
          <span className="text-purple-600">Mutual Fund Backed EMIs</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600">
          Get your dream smartphone or laptop with flexible 0% interest EMI options. Keep your mutual funds invested and earning returns while you pay monthly.
        </p>

        {/* Feature Badges */}
        <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>0% Interest EMI Available</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>No Portfolio Liquidation</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Up to ₹10,000 Cashback</span>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Featured Products ({products.length})
          </h2>
          <span className="text-xs text-slate-500">
            Source: {isDbConnected ? "MongoDB Atlas" : "Dynamic Fallback Data"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: IProduct) => {
            const firstVariant = product.variants[0];
            const startingEmi = product.emiPlans[product.emiPlans.length - 1]; // longest tenure = lowest monthly
            const zeroInterestEmi = product.emiPlans.find((e: IEMIPlan) => e.interestRate === 0) || product.emiPlans[0];

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between mb-3">
                    {product.tag ? (
                      <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 rounded-full text-xs font-extrabold tracking-wider uppercase border border-rose-100">
                        {product.tag}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs font-semibold text-slate-400">
                      {product.brand}
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="relative h-48 w-full my-4 flex items-center justify-center">
                    <Image
                      src={firstVariant.image}
                      alt={product.name}
                      width={220}
                      height={220}
                      className="object-contain max-h-44 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {product.description}
                  </p>

                  {/* Variants pill */}
                  <div className="mt-3 flex items-center space-x-2 text-xs text-slate-400">
                    <span>{product.variants.length} finishes available</span>
                    <span>•</span>
                    <span>{firstVariant.storage}</span>
                  </div>
                </div>

                {/* Card Bottom / Pricing */}
                <div className="pt-5 mt-5 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Starting from</span>
                      <span className="text-2xl font-bold text-slate-900">
                        ₹{firstVariant.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-medium">EMI Starts at</span>
                      <span className="text-sm font-extrabold text-purple-600">
                        ₹{startingEmi.monthlyAmount.toLocaleString("en-IN")}/mo
                      </span>
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <div className="w-full py-2.5 px-4 bg-slate-100 group-hover:bg-purple-600 group-hover:text-white text-slate-800 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5">
                    <span>View EMI Plans</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
