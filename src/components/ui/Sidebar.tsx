"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Activity,
  Calendar,
  PieChart,
  Settings,
  Users,
  CreditCard,
  KeyRound,
  LogIn,
  ChevronLeft,
} from "lucide-react";

// Combine all pages in one array, reorder as you like here
const allItems = [
  { label: "Overview", href: "/overview", Icon: Home },
  { label: "AI Insights", href: "/insights", Icon: Activity },
  { label: "Planner", href: "/planner", Icon: Calendar },
  { label: "Budgeting", href: "/budgeting", Icon: PieChart },
  { label: "Team", href: "/team", Icon: Users },
  { label: "Settings", href: "/settings", Icon: Settings },

  { label: "Billing", href: "/billing", Icon: CreditCard },
  { label: "API Keys", href: "/api-keys", Icon: KeyRound },
  { label: "Login", href: "/login", Icon: LogIn },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Persist collapse state in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored === "true") setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(!collapsed));
    setCollapsed(!collapsed);
  };

  const renderLink = ({ label, href, Icon }: any) => {
    const isActive = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
      >
        <Icon className="h-5 w-5" />
        {!collapsed && <span className="ml-3">{label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={`flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Branding */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Image
            src="/planto-logo.png"
            alt="Planto.AI Logo"
            width={32}
            height={32}
            className="invert dark:invert-0"
          />

          {!collapsed && (
            <span className="ml-2 text-xl font-bold text-green-600 dark:text-green-400">
              Planto.AI
            </span>
          )}
        </div>
        <button
          onClick={toggleCollapse}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={`h-5 w-5 text-gray-600 dark:text-gray-300 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* All Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {allItems.map(renderLink)}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Planto.ai
          </p>
        )}
      </div>
    </aside>
  );
}
