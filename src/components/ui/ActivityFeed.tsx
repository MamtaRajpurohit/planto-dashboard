// src/components/ActivityFeed.tsx
"use client";

import { Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ActivityItem {
  timestamp: string;
  message: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card className="w-full rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-800 dark:text-gray-100">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group flex items-start space-x-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-200">{item.message}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
