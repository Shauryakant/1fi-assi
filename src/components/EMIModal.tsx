"use client";

import { useState } from "react";
import { X, CheckCircle2, ShieldCheck, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { IVariant, IEMIPlan } from "@/models/Product";

interface EMIModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  variant: IVariant;
  emiPlan: IEMIPlan;
}

export default function EMIModal({
  isOpen,
  onClose,
  productName,
  variant,
  emiPlan,
}: EMIModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    pan: "",
  });

  if (!isOpen) return null;

  const totalAmount = emiPlan.monthlyAmount * emiPlan.tenureMonths;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Mutual Fund Backed EMI</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {productName}
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            {variant.storage} • {variant.color} finish
          </p>
        </div>

        {!submitted ? (
          <div className="p-6 space-y-6">
            {/* EMI Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-slate-600">Selected Plan</span>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-slate-900">
                    ₹{emiPlan.monthlyAmount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {" "}x {emiPlan.tenureMonths} months
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 block">Interest Rate</span>
                  <span className="font-semibold text-slate-800">
                    {emiPlan.interestRate}% interest
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Cashback</span>
                  <span className="font-semibold text-emerald-600">
                    ₹{emiPlan.cashbackAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Mutual Fund Guarantee Note */}
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 flex items-start space-x-2.5">
                <TrendingUp className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <p className="text-xs text-purple-900 leading-relaxed font-medium">
                  Backed by your mutual fund portfolio. Keep earning market returns while enjoying zero upfront liquidation!
                </p>
              </div>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Instant Approval Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    PAN Card Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ABCDE1234F"
                    value={formData.pan}
                    onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-200 transition-all flex items-center justify-center space-x-2 group active:scale-[0.99]"
              >
                <span>Complete EMI Setup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Secure • Instant Pre-approval in 2 mins</span>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-bold text-slate-900">
              EMI Application Approved!
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>! Your mutual fund backed EMI plan for <span className="font-semibold text-slate-900">{productName} ({variant.storage})</span> has been provisionally approved.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly EMI:</span>
                <span className="font-bold text-slate-900">₹{emiPlan.monthlyAmount.toLocaleString("en-IN")} / mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tenure:</span>
                <span className="font-semibold text-slate-800">{emiPlan.tenureMonths} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cashback Credited:</span>
                <span className="font-semibold text-emerald-600">₹{emiPlan.cashbackAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
