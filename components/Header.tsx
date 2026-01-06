"use client";

import ThemeToggle from "./ThemeToggle";
import UnitToggle from "./UnitToggle";
import { Units } from "@/types/weather";
import React from "react";

export default function Header({
  units,
  setUnits,
}: {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
}) {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Weather Forecast</h1>
      <div className="flex gap-4">
        <UnitToggle units={units} setUnits={setUnits} />
        <ThemeToggle />
      </div>
    </header>
  );
}
