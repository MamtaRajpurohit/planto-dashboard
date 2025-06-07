"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/ui/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CreditCard, Activity, KeyRound, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const metrics = [
  { id: 1, label: "Total Developers", value: "18", icon: <Users size={28} /> },
  { id: 2, label: "Credits Used", value: "3,500", icon: <CreditCard size={28} /> },
  { id: 3, label: "Active Sessions", value: "26", icon: <Activity size={28} /> },
  { id: 4, label: "API Keys", value: "6", icon: <KeyRound size={28} /> },
];

const recentActivity = [
  { name: "Riya Sharma", action: "Pushed code to repo", time: "2 hrs ago" },
  { name: "Aditya Mehta", action: "Used 300 credits", time: "3 hrs ago" },
  { name: "Sneha Roy", action: "Generated new API key", time: "Yesterday" },
];

export default function InsightsPage() {
  const creditUsed = 3500;
  const creditTotal = 5000;
  const creditPercent = (creditUsed / creditTotal) * 100;

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#0f0c29] dark:via-[#1e1b45] dark:to-[#1a1a2e] text-gray-900 dark:text-white overflow-hidden px-6 md:px-12 py-16">

        {/* Glowing BG Animation */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent blur-3xl opacity-20 z-0"
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-12"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
            Insights & Stats
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
            Welcome to your AI team’s control center. Track usage, manage API keys, and monitor your dev squad — all in one place.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-12">
          {metrics.map(({ id, label, value, icon }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/70 dark:bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl hover:shadow-2xl transition">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-sm uppercase text-green-600 dark:text-emerald-400">
                    {label}
                  </CardTitle>
                  {icon}
                </div>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Usage & API Keys */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
          <Card className="bg-white/70 dark:bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
            <CardTitle className="text-xl font-semibold text-green-600 dark:text-emerald-400 mb-4">
              Credit Usage
            </CardTitle>
            <CardContent>
              <p className="text-2xl mb-2 text-gray-900 dark:text-white">
                {creditUsed.toLocaleString()} / {creditTotal.toLocaleString()}
              </p>
              <Progress
                value={creditPercent}
                className="!h-3 rounded-full bg-gray-300 dark:bg-white/10 [&>div]:bg-emerald-500"
              />
              <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Buy Credits <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
            <CardTitle className="text-xl font-semibold text-green-600 dark:text-emerald-400 mb-4">
              API Key Management
            </CardTitle>
            <CardContent>
              <p className="text-lg mb-4 text-gray-900 dark:text-white">
                You currently have <strong>6 API Keys</strong> in use. Rotate keys regularly for enhanced security.
              </p>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white w-full">
                Manage Keys <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/70 dark:bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl relative z-10">
          <CardTitle className="text-xl font-semibold text-lime-600 dark:text-lime-300 mb-4">
            Team Activity
          </CardTitle>
          <CardContent>
            <ul className="divide-y divide-gray-200 dark:divide-white/10">
              {recentActivity.map(({ name, action, time }, index) => (
                <li
                  key={index}
                  className="py-3 flex justify-between text-sm text-gray-800 dark:text-white/80"
                >
                  <span>
                    <strong>{name}</strong> {action}
                  </span>
                  <span className="text-xs text-gray-500">{time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

