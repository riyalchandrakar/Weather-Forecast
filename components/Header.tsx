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
        mb-8 rounded-2xl
        bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        border border-white/40 dark:border-white/10
        shadow-lg backdrop-blur-md
      "
    >
      {/* Wrapper */}
      <div
        className="
          flex flex-col items-center gap-4
          px-4 py-4
          sm:flex-row sm:justify-between sm:items-center sm:px-6
        "
      >
        {/* Title */}
        <div className="
          flex items-center gap-3
          sm:justify-start
        ">
          <div className="
            flex h-10 w-10 items-center justify-center
            rounded-xl bg-sky-500/20
          ">
            <CloudSun className="text-sky-600 dark:text-sky-400" />
          </div>

          <h1 className="
            text-lg sm:text-2xl font-bold
            text-gray-900 dark:text-white
            text-center sm:text-left
          ">
            Weather Forecast
          </h1>
        </div>

        {/* Controls */}
        <div
          className="
            flex items-center gap-4
            justify-center
            sm:justify-end
          "
        >
          <UnitToggle units={units} setUnits={setUnits} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
