// LineChart.tsx
import React from "react";

export function LineChart({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-md ${className}`} // white bg with dark mode fallback
      style={{ height: "100%" }}
    >
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <polyline
          fill="none"
          stroke="#22c55e"  // green line
          strokeWidth={3}
          points="0,40 20,30 40,35 60,20 80,25 100,10"
        />
      </svg>
    </div>
  );
}


