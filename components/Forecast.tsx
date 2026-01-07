import { ForecastResponse } from "@/types/weather";
import { CloudSun, CloudRain, Sun, Cloud } from "lucide-react";

function getWeatherIcon(type: string) {
  if (type.includes("Rain")) return <CloudRain size={22} className="text-blue-500" />;
  if (type.includes("Clear")) return <Sun size={22} className="text-yellow-500" />;
  if (type.includes("Cloud")) return <Cloud size={22} className="text-gray-400" />;
  return <CloudSun size={22} className="text-sky-500" />;
}

export default function Forecast({
  data,
  units,
}: {
  data: ForecastResponse;
  units: string;
}) {
  // pick one forecast per day (24h)
  const daily = data.list.filter((_, i) => i % 8 === 0);

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {daily.map((item) => (
          <div
            key={item.dt_txt}
            className="
              rounded-xl p-4 text-center
              bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100
              dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
              border border-white/40 dark:border-white/10
              shadow-md backdrop-blur-md
              transition hover:scale-[1.03]
            "
          >
            {/* Date */}
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
              })}
            </p>

            {/* Icon */}
            <div className="flex justify-center my-3">
              {getWeatherIcon(item.weather[0].main)}
            </div>

            {/* Temp */}
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {Math.round(item.main.temp)}°
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {units === "metric" ? "C" : "F"}
              </span>
            </p>

            {/* Condition */}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {item.weather[0].main}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
