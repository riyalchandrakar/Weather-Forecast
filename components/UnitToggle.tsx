export default function UnitToggle({
  units,
  setUnits,
}: {
  units: string;
  setUnits: (u: string) => void;
}) {
  return (
    <button
      onClick={() => setUnits(units === "metric" ? "imperial" : "metric")}
      className="px-3 py-1 rounded bg-blue-600 text-white"
    >
      °{units === "metric" ? "C" : "F"}
    </button>
  );
}
