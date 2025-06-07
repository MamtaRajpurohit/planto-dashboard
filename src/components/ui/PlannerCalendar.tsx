// src/components/PlannerCalendar.tsx
"use client";

import { Calendar as DayPicker } from "@/components/ui/calendar";
import { useTheme } from "@/hooks/useTheme";

interface PlannerCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function PlannerCalendar({
  selected,
  onSelect,
}: PlannerCalendarProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${
        isDark ? "border border-gray-700" : "border border-gray-200"
      }`}
    >
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        className="rounded-md"
      />
      <button
        onClick={() => onSelect(new Date())}
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition"
      >
        Today
      </button>
    </div>
  );
}
