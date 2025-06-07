"use client";

import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#0f0c29] dark:via-[#1e1b45] dark:to-[#1a1a2e] flex items-center justify-center px-6 py-12 md:px-20 overflow-hidden text-gray-900 dark:text-white">
      
      {/* Animated subtle glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent opacity-20 blur-3xl z-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl shadow-xl p-12"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent tracking-tight">
          Sign in to Planto.Ai
        </h2>

        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
          <div>
            <Label htmlFor="email" className="text-gray-800 dark:text-gray-300 font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="mt-1 bg-white/80 dark:bg-gray-800/70 shadow-sm border border-white/30 dark:border-white/20 focus:ring-emerald-400 focus:border-emerald-400 rounded-lg"
            />
          </div>

          <div className="relative">
            <Label htmlFor="password" className="text-gray-800 dark:text-gray-300 font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              required
              className="mt-1 pr-24 bg-white/80 dark:bg-gray-800/70 shadow-sm border border-white/30 dark:border-white/20 focus:ring-emerald-400 focus:border-emerald-400 rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-11 text-green-600 dark:text-emerald-400 font-semibold hover:text-green-700 dark:hover:text-emerald-300 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex justify-between items-center text-sm text-green-700 dark:text-emerald-400">
            <Link href="#" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:from-emerald-600 hover:to-green-700 dark:bg-gradient-to-r dark:from-emerald-500 dark:to-green-600 dark:hover:from-emerald-600 dark:hover:to-green-700 transition"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-gray-700 dark:text-gray-300 text-sm mt-10">
          New to Planto?{" "}
          <Link href="#" className="text-green-600 dark:text-emerald-400 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
