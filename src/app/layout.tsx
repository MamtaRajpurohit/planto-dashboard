// src/app/layout.tsx
"use client"; // Mark as a Client Component, no server‐only exports

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
import { motion, AnimatePresence } from "framer-motion";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar (fixed width on left) */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <Header />
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={Math.random()} // animate on route change
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

