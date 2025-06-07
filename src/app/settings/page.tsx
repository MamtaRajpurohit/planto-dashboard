"use client";

import SettingsForm from "@/components/ui/SettingsForm";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-6 py-10 md:px-20 flex justify-center items-start">
      <motion.div
        className="w-full max-w-4xl bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-2xl border border-emerald-500 dark:border-emerald-600 p-10 sm:p-14 mt-12"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-10 tracking-tight">
          Account Settings
        </h2>
        <SettingsForm />
      </motion.div>
    </div>
  );
}




