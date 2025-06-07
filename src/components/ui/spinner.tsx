// src/components/ui/spinner.tsx
"use client";

import { motion } from "framer-motion";

export function Spinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const dims = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-8 w-8" : "h-6 w-6";
  return (
    <motion.div
      className={`border-2 border-t-2 border-gray-300 rounded-full ${dims} border-t-green-600 ${className}`}
      animate={{ rotate: 360 }}
      transition={{ loop: Infinity, ease: "linear", duration: 0.8 }}
    />
  );
}
