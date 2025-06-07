// src/components/BillingChart.tsx
"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "@/hooks/useTheme";

interface BillingChartProps {
  data: { category: string; value: number }[];
}

export default function BillingChart({ data }: BillingChartProps) {
  const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa"];
  const { isDark } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={80}
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{
            color: isDark ? "#d1d5db" : "#374151",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
