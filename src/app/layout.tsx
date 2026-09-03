import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { connectToDatabase } from "@/lib/mongodb";

export const metadata: Metadata = {
  title: "1Fi - Mutual Fund Backed EMI Plans",
  description: "Buy premium products with zero upfront liquidation using mutual fund backed EMI plans.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isDbConnected = false;
  try {
    const db = await connectToDatabase();
    isDbConnected = !!db;
  } catch (err) {
    isDbConnected = false;
  }

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-100/60 text-slate-900 antialiased">
        <Navbar isDbConnected={isDbConnected} />
        <main className="flex-1">{children}</main>
        <footer className="py-8 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-800">1Fi SDE1 Assignment</span>
              <span>•</span>
              <span>Built with Next.js & MongoDB</span>
            </div>
            <p className="text-slate-400">
              Reference design inspired by 1Fi Mutual Fund EMI plans.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
