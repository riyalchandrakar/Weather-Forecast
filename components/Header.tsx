"use client";

import ThemeToggle from "./ThemeToggle";
import UnitToggle from "./UnitToggle";

export default function Header({
  units,
  setUnits,
}: {
  units: string;
  setUnits: (u: string) => void;
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
