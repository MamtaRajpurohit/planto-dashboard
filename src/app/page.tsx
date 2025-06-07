// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/overview");
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div className="text-center space-y-4">
        <Spinner size="lg" className="mx-auto text-green-600" />
        <p className="text-gray-700 dark:text-gray-200">Redirecting to your dashboard…</p>
      </div>
    </div>
  );
}
