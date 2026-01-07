import { WeatherResponse } from "@/types/weather";
import {
  Wind,
  Droplets,
  MapPin,
  CloudSun,
} from "lucide-react";

export default function WeatherCard({
  data,
  units,
}: {
  data: WeatherResponse;
  units: string;
}) {
  return (
    <div className="
      relative overflow-hidden rounded-2xl
      bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
      p-6 shadow-lg border border-white/40 dark:border-white/10
      backdrop-blur-md transition hover:scale-[1.01]
    ">
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
        <MapPin size={18} className="text-sky-500" />
        <h2 className="text-lg font-semibold">{data.name}</h2>
      </div>

      {/* Weather type */}
      <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
        <CloudSun size={20} className="text-yellow-500" />
        <p className="text-sm">{data.weather[0].main}</p>
      </div>

      {/* Temperature */}
      <div className="mt-6 flex items-end gap-1">
        <span className="text-5xl font-bold text-gray-900 dark:text-white">
          {Math.round(data.main.temp)}
        </span>
        <span className="text-xl text-gray-600 dark:text-gray-400 mb-1">
          °{units === "metric" ? "C" : "F"}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-white/60 dark:bg-white/10" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Droplets size={18} className="text-blue-500" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="font-medium text-gray-800 dark:text-gray-100">
              {data.main.humidity}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind size={18} className="text-emerald-500" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Wind</p>
            <p className="font-medium text-gray-800 dark:text-gray-100">
              {data.wind.speed} m/s
            </p>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />
    </div>
  );
}
