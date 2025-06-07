"use client";

import React from "react";
import {
  ChartBarIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const mockBudgets = [
  {
    category: "Marketing",
    amount: 1500,
    spent: 500,
    icon: <ChartBarIcon className="w-6 h-6 text-pink-400 group-hover:text-pink-500 transition" />,
  },
  {
    category: "Development",
    amount: 2500,
    spent: 800,
    icon: <CodeBracketIcon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-500 transition" />,
  },
  {
    category: "Operations",
    amount: 1200,
    spent: 400,
    icon: <Cog6ToothIcon className="w-6 h-6 text-amber-400 group-hover:text-yellow-500 transition" />,
  },
  {
    category: "Customer Support",
    amount: 800,
    spent: 300,
    icon: <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-emerald-400 group-hover:text-green-500 transition" />,
  },
];

export default function BudgetingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#e6fff9] via-white to-[#ccf4ec] dark:from-[#0f0c29] dark:via-[#1e1b45] dark:to-[#1a1a2e] px-6 md:px-12 py-20 overflow-hidden transition-colors duration-300">

      {/* 🌌 Animated Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent blur-3xl z-0"
      />

      <h1 className="relative z-10 text-5xl font-black bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-transparent bg-clip-text drop-shadow-lg">
        Budget Breakdown
      </h1>

      <div className="relative z-10 grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
        {mockBudgets.map(({ category, amount, spent, icon }) => {
          const percentage = Math.min(100, Math.round((spent / amount) * 100));
          let barColor =
            percentage < 50
              ? "from-green-400 to-green-600"
              : percentage < 80
              ? "from-yellow-400 to-yellow-600"
              : "from-red-400 to-red-600";

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-white/50 dark:bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white/70 dark:bg-gray-800 shadow-inner">
                    {icon}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {category}
                  </h2>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  ${spent} / ${amount}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full bg-gradient-to-r ${barColor} rounded-full shadow-inner`}
                  style={{ width: `${percentage}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              {/* Labels */}
              <div className="mt-3 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{percentage}% used</span>
                <span>{100 - percentage}% left</span>
              </div>

              {/* Tooltip */}
              <div className="absolute top-3 right-3 text-xs bg-black/80 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none backdrop-blur">
                {category} usage details
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
