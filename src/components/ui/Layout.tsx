"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {children}
    </div>
  );
}

