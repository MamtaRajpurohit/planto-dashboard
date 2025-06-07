"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/ui/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Rocket, Zap, Activity, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

export default function OverviewPage() {
  const [userName] = useState("User");
  const [stats] = useState({
    projects: 24,
    hours: 118,
    overdue: 5,
    creditsUsed: 3500,
    creditsTotal: 5000,
    apiKeys: 7,
    teamProgress: 75,
  });

  const creditPercent = (stats.creditsUsed / stats.creditsTotal) * 100;

  useEffect(() => {
    // fetch real data…
  }, []);

  return (
    <Layout>
      <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#0f0c29] dark:via-[#1e1b45] dark:to-[#1a1a2e] text-gray-900 dark:text-white overflow-hidden">
        {/* Animated Glow Background */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent opacity-20 blur-3xl z-0"
        />

        {/* HERO */}
        <section className="relative z-10 py-24 px-6 md:px-16">
<motion.div
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="flex items-center gap-80 mb-6"
>
  <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
    Welcome back, {userName}!
  </h1>
 <img
    src="/planto-logo.png"
    alt="Planto Logo"
    className="w-20 h-20 md:w-24 md:h-24 object-contain invert dark:invert-0"
    
    draggable={false}
  />
</motion.div>



          <div className="flex gap-4 mt-8">
            <Button className="bg-green-500 hover:bg-green-600 text-white shadow-lg">
              View Usage
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
              Manage Team
            </Button>
          </div>
        </section>

        {/* DASHBOARD CARDS */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Projects", value: stats.projects, icon: <Rocket size={32} /> },
              { label: "Hours Coded", value: stats.hours, icon: <Activity size={32} /> },
              { label: "Overdues", value: stats.overdue, icon: <Zap size={32} /> },
              { label: "API Keys", value: stats.apiKeys, icon: <KeyRound size={32} /> },
            ].map(({ label, value, icon }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/70 dark:bg-white/5 border border-white/10 dark:border-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl hover:shadow-2xl transition">
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

          {/* CREDIT & TEAM PROGRESS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/70 dark:bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
              <CardTitle className="text-xl font-semibold text-green-600 dark:text-emerald-400 mb-4">
                Credit Usage
              </CardTitle>
              <CardContent>
                <p className="text-2xl mb-2 text-gray-900 dark:text-white">
                  {stats.creditsUsed.toLocaleString()} / {stats.creditsTotal.toLocaleString()}
                </p>
                <Progress
                  value={creditPercent}
                  className="!h-3 rounded-full bg-gray-300 dark:bg-white/10 [&>div]:bg-emerald-500"
                />
                <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                  Buy More Credits
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
              <CardTitle className="text-xl font-semibold text-green-600 dark:text-emerald-400 mb-4">
                Team Progress
              </CardTitle>
              <CardContent>
                <p className="text-lg mb-2">Sprint Completion</p>
                <Progress
                  value={stats.teamProgress}
                  className="!h-3 rounded-full bg-gray-300 dark:bg-white/10 [&>div]:bg-lime-500"
                />
                <p className="mt-2 text-gray-800 dark:text-white/90 text-lg">
                  {stats.teamProgress}% complete
                </p>
              </CardContent>
            </Card>
          </div>

          {/* DEADLINES */}
          <Card className="bg-white/70 dark:bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
            <CardTitle className="text-xl font-semibold text-lime-600 dark:text-lime-300 mb-4">
              Upcoming Deadlines
            </CardTitle>
            <CardContent>
              <ul className="space-y-2 text-gray-800 dark:text-white/80">
                <li> Design review – June 15</li>
                <li> Code freeze – June 20</li>
                <li> Client presentation – June 25</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
 