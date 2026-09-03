"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Catalog", href: "/" },
    { name: "iPhone 17 Pro", href: "/products/iphone-17-pro" },
    { name: "Samsung S24 Ultra", href: "/products/samsung-s24-ultra" },
    { name: "MacBook Pro", href: "/products/macbook-pro-m3" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Navigation */}
        <div className="flex items-center space-x-8">
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

      </div>
    </header>
  );
}
