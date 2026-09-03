"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ShieldCheck, Sparkles, ChevronRight, Layers } from "lucide-react";
import { IProduct, IVariant, IEMIPlan } from "@/models/Product";
import EMIModal from "./EMIModal";

interface ProductCardViewProps {
  product: IProduct;
}

export default function ProductCardView({ product }: ProductCardViewProps) {
  // State for active variant & selected EMI plan
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedEmiPlanId, setSelectedEmiPlanId] = useState<string>(
    product.emiPlans[1]?.id || product.emiPlans[0]?.id
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentVariant: IVariant =
    product.variants[selectedVariantIndex] || product.variants[0];
  
  const selectedEmiPlan: IEMIPlan =
    product.emiPlans.find((p) => p.id === selectedEmiPlanId) ||
    product.emiPlans[0];

  // Group variants by storage and color for easy picking
  const availableStorages = Array.from(
    new Set(product.variants.map((v) => v.storage))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
      
      {/* Outer Card Container */}
      <div className="bg-slate-100/70 p-4 sm:p-8 rounded-[36px] border border-slate-200/80 shadow-sm">
        
        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Product Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between h-full min-h-[540px]">
            <div>
              {/* Product Tag */}
              {product.tag && (
                <span className="text-[13px] font-bold text-rose-500 uppercase tracking-widest block mb-1">
                  {product.tag}
                </span>
              )}

              {/* Title & Storage */}
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-slate-500 mt-0.5">
                {currentVariant.storage}
              </p>

              {/* Storage Variant Selectors (If multiple storages exist) */}
              {availableStorages.length > 1 && (
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-xs font-semibold text-slate-400 mr-1">Storage:</span>
                  {availableStorages.map((storage) => {
                    const variantForStorage = product.variants.find((v) => v.storage === storage);
                    const isSelected = currentVariant.storage === storage;
                    return (
                      <button
                        key={storage}
                        onClick={() => {
                          const idx = product.variants.findIndex((v) => v.storage === storage);
                          if (idx !== -1) setSelectedVariantIndex(idx);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {storage}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Product Image */}
              <div className="relative my-8 flex items-center justify-center h-64 sm:h-72 w-full group">
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-20 transition-all group-hover:opacity-30"
                  style={{ backgroundColor: currentVariant.colorCode || "#e87a3e" }}
                />
                
                {/* Visual Phone Display matching reference finish */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src={currentVariant.image}
                    alt={`${product.name} - ${currentVariant.color}`}
                    width={320}
                    height={320}
                    priority
                    className="object-contain max-h-64 sm:max-h-72 drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Color Swatch Finishes */}
            <div className="pt-4 border-t border-slate-100 flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-slate-400 mb-3">
                Available in {product.variants.length} finishes
              </span>
              <div className="flex items-center space-x-3">
                {product.variants.map((variant, idx) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantIndex(idx)}
                    title={`${variant.color} (${variant.storage})`}
                    className={`relative w-7 h-7 rounded-full transition-all flex items-center justify-center p-0.5 ${
                      selectedVariantIndex === idx
                        ? "ring-2 ring-purple-600 ring-offset-2 scale-110"
                        : "hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span
                      className="w-full h-full rounded-full border border-slate-300/50 shadow-inner"
                      style={{ backgroundColor: variant.colorCode }}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-700 mt-2">
                {currentVariant.color}
              </span>
            </div>
          </div>


          {/* RIGHT COLUMN: Price & EMI Plans List */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Price Header */}
            <div className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-slate-200/60 flex flex-col sm:flex-row sm:items-baseline justify-between">
              <div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ₹{currentVariant.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-lg font-medium text-slate-400 line-through">
                    ₹{currentVariant.mrp.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-600 mt-1">
                  EMI plans backed by mutual funds
                </p>
              </div>

              {/* Discount Tag */}
              <div className="mt-2 sm:mt-0 inline-flex items-center space-x-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold self-start">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save ₹{(currentVariant.mrp - currentVariant.price).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* EMI Options List */}
            <div className="space-y-3">
              {product.emiPlans.map((plan) => {
                const isSelected = selectedEmiPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedEmiPlanId(plan.id)}
                    className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
                      isSelected
                        ? "bg-white border-purple-600 shadow-md ring-2 ring-purple-600/20"
                        : "bg-white/90 border-slate-200/90 hover:border-slate-300 hover:bg-white shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      
                      {/* Left: Monthly installment & Tenure */}
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-purple-600 border-purple-600 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div>
                          <div className="text-base sm:text-lg font-bold text-slate-900">
                            ₹{plan.monthlyAmount.toLocaleString("en-IN")}{" "}
                            <span className="text-slate-600 font-normal text-sm sm:text-base">
                              x {plan.tenureMonths} months
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Interest Rate Badge */}
                      <div className="text-right">
                        <span className="text-sm font-semibold text-slate-800">
                          {plan.interestRate === 0 ? "0% interest" : `${plan.interestRate}% interest`}
                        </span>
                      </div>
                    </div>

                    {/* Cashback Subtext (in green as per reference image) */}
                    {plan.cashbackDescription && (
                      <div className="mt-2 ml-8 text-xs font-semibold text-emerald-600 flex items-center space-x-1">
                        <span>{plan.cashbackDescription}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Bar / Proceed Button */}
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center space-x-2 group active:scale-[0.99]"
              >
                <span>
                  Proceed with ₹{selectedEmiPlan.monthlyAmount.toLocaleString("en-IN")}/mo Plan
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Footer */}
            <div className="flex items-center justify-center space-x-6 text-xs font-medium text-slate-400 pt-2">
              <div className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Zero Pre-payment Penalty</span>
              </div>
              <div className="flex items-center space-x-1">
                <Layers className="w-4 h-4 text-purple-600" />
                <span>Mutual Fund Lien Backed</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* EMI Application Modal */}
      <EMIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        variant={currentVariant}
        emiPlan={selectedEmiPlan}
      />
    </div>
  );
}
