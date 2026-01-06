import { Units } from "@/types/weather";
import React from "react";

export default function UnitToggle({
  units,
  setUnits,
}: {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
}) {
  return (
    <button
      onClick={() =>
        setUnits(units === "metric" ? "imperial" : "metric")
      }
      className="px-3 py-1 rounded bg-blue-600 text-white"
    >
      °{units === "metric" ? "C" : "F"}
    </button>
  );
}
