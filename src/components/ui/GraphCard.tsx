// src/components/GraphCard.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface GraphCardProps {
  title: string;
  children: React.ReactNode;
}

export default function GraphCard({ title, children }: GraphCardProps) {
  return (
    <Card className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-800 dark:text-gray-100">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
