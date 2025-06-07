"use client";

import { Bell, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Header() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] || "overview";
  const pageTitle = capitalize(segment);

  const { isDark, toggle } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      {/* Page Title */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {pageTitle}
      </h2>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications Button */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          {/* Smaller, subtler red dot */}
          <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-400 rounded-full border border-white dark:border-gray-800" />
        </Button>

        {/* Profile Menu using <details> */}
        <details className="relative">
          <summary className="flex items-center space-x-2 cursor-pointer list-none focus:outline-none">
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
              User
            </span>
          </summary>
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </a>
          </div>
        </details>

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label="Toggle Dark Mode"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </Button>
      </div>
    </header>
  );
}
