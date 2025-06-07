// src/components/OverviewCard.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor?: string; // e.g. "bg-white" or "bg-gradient-to-r from-green-400 to-blue-400"
}

export default function OverviewCard({
  title,
  value,
  icon,
  bgColor = "bg-white dark:bg-gray-800",
}: OverviewCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Card className={`${bgColor} rounded-lg`}>
        <CardHeader className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-green-50 dark:bg-green-900 text-green-500 dark:text-green-300">
            {icon}
          </div>
          <CardTitle className="text-base font-medium text-gray-800 dark:text-gray-100">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-50">
            {value}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
