"use client";

import { ModeToggle } from "@/app/components/mode-toggle";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="py-6 px-8 md:px-12 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          KingPin
        </h1>
      </div>
      <ModeToggle />
    </header>
  );
}
