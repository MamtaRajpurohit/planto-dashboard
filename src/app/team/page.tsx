"use client";

import { useState } from "react";
import { UserIcon, EnvelopeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  active: boolean;
};

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([
    { id: "1", name: "Alice Johnson", role: "Frontend Developer", email: "alice@planto.ai", active: true },
    { id: "2", name: "Bob Smith", role: "Backend Developer", email: "bob@planto.ai", active: true },
    { id: "3", name: "Charlie Davis", role: "QA Engineer", email: "charlie@planto.ai", active: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "", email: "" });

  const handleAddMember = () => {
    const { name, role, email } = newMember;
    if (name.trim() && role.trim() && email.trim()) {
      setMembers(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          name,
          role,
          email,
          active: true,
        },
      ]);
      setNewMember({ name: "", role: "", email: "" });
      setIsModalOpen(false);
    } else {
      alert("All fields are required.");
    }
  };

  const handleRemoveMember = (id: string) => {
    if (confirm("Remove this member?")) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();

  const getRoleColor = (role: string) => {
    if (role.toLowerCase().includes("frontend")) return "bg-blue-200 text-blue-800";
    if (role.toLowerCase().includes("backend")) return "bg-purple-200 text-purple-800";
    if (role.toLowerCase().includes("qa")) return "bg-pink-200 text-pink-800";
    return "bg-gray-200 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black px-6 py-10 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Glowing Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-transparent bg-clip-text drop-shadow-lg">
              Team Dashboard
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-xl transition"
          >
            <PlusIcon className="w-5 h-5" />
            Add Member
          </button>
        </motion.div>

        {/* Team Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-white dark:bg-gray-950 shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">👤 Member</th>
                <th className="text-left px-6 py-4 font-semibold">🛠️ Role</th>
                <th className="text-left px-6 py-4 font-semibold">📧 Email</th>
                <th className="text-center px-6 py-4 font-semibold">🔄 Status</th>
                <th className="text-center px-6 py-4 font-semibold">🗑️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(({ id, name, role, email, active }) => (
                <motion.tr
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "easeInOut",
                      }}
                      className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-md"
                    >
                      {getInitials(name)}
                    </motion.div>
                    <span className="font-semibold">{name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${getRoleColor(role)} shadow-sm`}
                    >
                      {role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleRemoveMember(id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                    >
                      Remove
                    </button>
                  </td>
                </motion.tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No team members yet. Time to assemble your dream squad 💫
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-800"
              >
                <h2 className="text-2xl font-bold text-green-600">Add New Member</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddMember();
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember(prev => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Role"
                      value={newMember.role}
                      onChange={(e) =>
                        setNewMember(prev => ({ ...prev, role: e.target.value }))
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newMember.email}
                      onChange={(e) =>
                        setNewMember(prev => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



