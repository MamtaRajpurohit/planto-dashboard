"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CurrencyDollarIcon, ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";

type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: number;
  date: Date;
  description: string;
};

export default function BillingPage() {
  const [credits, setCredits] = useState(1200);
  const [buyAmount, setBuyAmount] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "t1",
      type: "credit",
      amount: 500,
      date: new Date("2025-05-10T12:00:00Z"),
      description: "Bought 500 credits",
    },
    {
      id: "t2",
      type: "debit",
      amount: 200,
      date: new Date("2025-05-15T09:30:00Z"),
      description: "Used 200 credits for API calls",
    },
  ]);

  const handleBuyCredits = () => {
    if (buyAmount > 0) {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "credit",
        amount: buyAmount,
        date: new Date(),
        description: `Bought ${buyAmount} credits`,
      };

      setCredits((prev) => prev + buyAmount);
      setTransactions((prev) => [newTransaction, ...prev]);
      setBuyAmount(0);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-transparent bg-clip-text drop-shadow-lg">
            Billing & Credits
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your credit balance, purchase more, and track usage.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              Credit Balance
            </h2>
            <CurrencyDollarIcon className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-5xl font-bold text-green-600 dark:text-green-400">
            {credits} <span className="text-xl font-normal">credits</span>
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-xl font-semibold mb-4">Buy More Credits</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              min={1}
              value={buyAmount || ""}
              onChange={(e) => setBuyAmount(Number(e.target.value))}
              placeholder="Enter credits to buy"
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              disabled={buyAmount <= 0}
              onClick={handleBuyCredits}
              className={`px-6 py-3 rounded-md text-white font-semibold transition duration-300 ${
                buyAmount > 0
                  ? "bg-green-600 hover:bg-green-700 shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Buy Credits
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-xl font-semibold mb-6">Transaction History</h2>

          {transactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No transactions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-sm font-semibold">Date</th>
                    <th className="px-6 py-3 text-sm font-semibold">Description</th>
                    <th className="px-6 py-3 text-sm font-semibold">Type</th>
                    <th className="px-6 py-3 text-sm font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(({ id, date, description, type, amount }) => (
                    <motion.tr
                      key={id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4">
                        {date.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">{description}</td>
                      <td className="px-6 py-4 capitalize flex items-center gap-2">
                        {type === "credit" ? (
                          <ArrowUpCircleIcon className="w-5 h-5 text-green-500" />
                        ) : (
                          <ArrowDownCircleIcon className="w-5 h-5 text-red-500" />
                        )}
                        {type}
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-semibold ${
                          type === "credit"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {type === "credit" ? "+" : "-"}
                        {amount}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}


