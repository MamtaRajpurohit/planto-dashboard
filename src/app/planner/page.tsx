"use client";

import { useState } from "react";
import PlannerCalendar from "@/components/ui/PlannerCalendar";
import { motion } from "framer-motion";

export default function PlannerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#e6fff9] via-white to-[#ccf4ec] dark:from-[#0f0c29] dark:via-[#1e1b45] dark:to-[#1a1a2e] px-6 md:px-12 py-16 overflow-hidden">

      {/* ✨ Floating glow background */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent blur-3xl opacity-20 z-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400 mb-10">
           Daily Planner
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 🌿 Calendar Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Select a Date
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/50 dark:bg-white/10 p-6 backdrop-blur-lg shadow-xl">
              <div className="flex justify-center">
                <PlannerCalendar selected={selectedDate} onSelect={setSelectedDate} />
              </div>
              <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
                Selected:{" "}
                <span className="font-semibold text-green-700 dark:text-emerald-400">
                  {formattedDate}
                </span>
              </p>
            </div>
          </motion.div>

          {/* 📝 Notes Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Notes / Plans
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/50 dark:bg-white/10 p-6 h-full backdrop-blur-lg shadow-xl flex flex-col">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={10}
                placeholder="Write your plans, notes, or tasks for the day..."
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 self-end rounded-lg font-semibold bg-gradient-to-tr from-green-500 via-emerald-400 to-lime-400 text-white shadow-md hover:shadow-lg transition"
                onClick={() => alert("Saved!")}
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}


