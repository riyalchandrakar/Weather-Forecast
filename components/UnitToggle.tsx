import { Units } from "@/types/weather";
import React from "react";
import { Thermometer } from "lucide-react";

export default function UnitToggle({
  units,
  setUnits,
}: {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
}) {
  const isMetric = units === "metric";

  return (
    <button
      onClick={() => setUnits(isMetric ? "imperial" : "metric")}
      aria-label="Toggle temperature unit"
      className="
        relative inline-flex items-center gap-2
        rounded-full px-4 py-2
        bg-gradient-to-r from-sky-500 to-indigo-500
        text-white text-sm font-medium
        shadow-md transition
        hover:opacity-90 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-sky-500
      "
    >
      <Thermometer size={16} />

      <span className="font-semibold">
        °{isMetric ? "C" : "F"}
      </span>

      {/* subtle hint */}
      <span className="ml-1 text-xs opacity-80">
        {isMetric ? "Metric" : "Imperial"}
      </span>
    </button>
  );
}
