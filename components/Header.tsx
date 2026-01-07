"use client";

import ThemeToggle from "./ThemeToggle";
import UnitToggle from "./UnitToggle";
import { Units } from "@/types/weather";
import React from "react";
import { CloudSun } from "lucide-react";

export default function Header({
  units,
  setUnits,
}: {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
}) {
  return (
    <header
      className="
        mb-8 flex items-center justify-between
        rounded-2xl px-6 py-4
        bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        border border-white/40 dark:border-white/10
        shadow-lg backdrop-blur-md
      "
    >
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20">
          <CloudSun className="text-sky-600 dark:text-sky-400" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Weather Forecast
        </h1>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        <UnitToggle units={units} setUnits={setUnits} />
        <ThemeToggle />
      </div>
    </header>
  );
}
