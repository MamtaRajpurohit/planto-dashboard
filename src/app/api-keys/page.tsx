"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCopy, Trash2, PlusCircle, Eye, EyeOff, Download } from "lucide-react";

type ApiKey = {
  id: string;
  key: string;
  createdAt: Date;
  expiresAt?: Date;
};

function maskKey(key: string) {
  return key.slice(0, 4) + "••••••••" + key.slice(-4);
}

function getKeyStatus(expiry?: Date) {
  if (!expiry) return "Permanent";
  const now = new Date();
  return now > expiry ? "Expired" : "Active";
}

// Minimal Card components (you can replace with your actual ones)
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl " +
        className
      }
    >
      {children}
    </div>
  );
}
function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={"text-green-600 dark:text-emerald-400 font-semibold text-lg mb-3 " + className}>{children}</h3>;
}
function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-900 dark:text-white">{children}</div>;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [search, setSearch] = useState("");
  const [copySuccessId, setCopySuccessId] = useState<string | null>(null);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulated default keys
    setApiKeys([
      {
        id: "1",
        key: "1234abcd5678efgh",
        createdAt: new Date("2024-04-01"),
        expiresAt: new Date("2025-06-30"),
      },
      {
        id: "2",
        key: "9876wxyz4321mnop",
        createdAt: new Date("2024-05-10"),
      },
    ]);
  }, []);

  const createApiKey = () => {
    const newKey = Math.random().toString(36).slice(2, 18);
    const newApiKey: ApiKey = {
      id: Date.now().toString(),
      key: newKey,
      createdAt: new Date(),
    };
    setApiKeys((prev) => [newApiKey, ...prev]);
    setCopySuccessId(newApiKey.id);
    setTimeout(() => setCopySuccessId(null), 2500);
  };

  const deleteApiKey = (id: string) => {
    if (confirm("Are you sure you want to delete this API key?")) {
      setApiKeys((prev) => prev.filter((key) => key.id !== id));
    }
  };

  const copyToClipboard = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopySuccessId(id);
    setTimeout(() => setCopySuccessId(null), 2500);
  };

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const downloadBackup = () => {
    const json = JSON.stringify(apiKeys, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "api-keys-backup.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredKeys = apiKeys.filter(({ key }) =>
    key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#0f0c29] dark:via-[#1e1b45] dark:to-[#1a1a2e] text-gray-900 dark:text-white px-6 py-10">
      {/* Background subtle glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent opacity-10 blur-3xl pointer-events-none z-0"
      />

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-10"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          API Keys
        </h1>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={createApiKey}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 transition text-white font-semibold py-3 px-5 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <PlusCircle size={22} />
            New Key
          </button>
          <button
            onClick={downloadBackup}
            className="inline-flex items-center gap-2 border border-green-600 dark:border-green-400 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 transition py-3 px-5 rounded-xl shadow-md"
          >
            <Download size={20} />
            Backup
          </button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-5xl mx-auto mb-12"
      >
        <input
          type="text"
          placeholder="Search API key..."
          className="w-full max-w-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-5 py-3 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Keys List or empty */}
      <motion.div
        className="max-w-5xl mx-auto space-y-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {filteredKeys.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-24 text-xl font-medium">
            No API keys match your search.
          </p>
        ) : (
          filteredKeys.map(({ id, key, createdAt, expiresAt }) => {
            const status = getKeyStatus(expiresAt);
            const isRevealed = revealedIds.has(id);

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * Number(id) }}
              >
                <Card>
                  <CardTitle>
                    {isRevealed ? (
                      <span className="font-mono text-lg tracking-wide break-all">{key}</span>
                    ) : (
                      <span className="font-mono text-lg tracking-wide">
                        {maskKey(key)}
                      </span>
                    )}
                  </CardTitle>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Created:{" "}
                      {createdAt.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {expiresAt && <> | Expires: {expiresAt.toLocaleDateString()}</>}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        status === "Expired"
                          ? "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : status === "Active"
                          ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {status}
                    </span>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-5">
                      <button
                        onClick={() => toggleReveal(id)}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition font-semibold"
                      >
                        {isRevealed ? (
                          <>
                            <EyeOff size={20} /> Hide
                          </>
                        ) : (
                          <>
                            <Eye size={20} /> Show
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => copyToClipboard(key, id)}
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition font-semibold"
                      >
                        <ClipboardCopy size={20} />
                        {copySuccessId === id ? "Copied!" : "Copy"}
                      </button>

                      <button
                        onClick={() => deleteApiKey(id)}
                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 transition font-semibold"
                      >
                        <Trash2 size={20} />
                        Delete
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}

