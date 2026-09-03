"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface NavbarProps {
  isDbConnected?: boolean;
}

export default function Navbar({ isDbConnected = true }: NavbarProps) {
  const pathname = usePathname();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const navLinks = [
    { name: "Catalog", href: "/" },
    { name: "iPhone 17 Pro", href: "/products/iphone-17-pro" },
    { name: "Samsung S24 Ultra", href: "/products/samsung-s24-ultra" },
    { name: "MacBook Pro", href: "/products/macbook-pro-m3" },
  ];

  const handleSeed = async () => {
    setIsSeeding(true);
    setSeedMessage(null);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedMessage("Seeded DB!");
        setTimeout(() => setSeedMessage(null), 3000);
        window.location.reload();
      } else {
        setSeedMessage("Seed failed");
      }
    } catch (e) {
      setSeedMessage("Error");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              1Fi
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                1Fi<span className="text-purple-600">.</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Mutual Fund EMI
              </span>
            </div>
          </Link>

          {/* Dynamic Nav Links with Active Focus Highlight */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-purple-700 bg-purple-50 font-bold shadow-xs border border-purple-100/50"
                      : "hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Database Status & Seeder Button */}
        <div className="flex items-center space-x-3">
          {/* Status Badge */}
          <div
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              isDbConnected
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
            title={
              isDbConnected
                ? "Connected to MongoDB Atlas Database"
                : "Using Fallback Dynamic Dataset"
            }
          >
            {isDbConnected ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">MongoDB Atlas Connected</span>
                <span className="sm:hidden">MongoDB</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Mock DB Mode</span>
              </>
            )}
          </div>

          {/* Seed DB Action */}
          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? "animate-spin" : ""}`} />
            <span>{isSeeding ? "Seeding..." : seedMessage || "Re-seed DB"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
