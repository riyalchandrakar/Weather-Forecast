import React from "react";
import { WeatherResponse } from "@/types/weather";
import {
  Wind,
  Droplets,
  MapPin,
  CloudSun,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
} from "lucide-react";

/* 🍎 Premium muted palette */
const WEATHER_UI: Record<
  string,
  {
    icon: React.ReactNode;
    gradient: string;
    glow: string;
    overlay: string;
  }
> = {
  Clear: {
    icon: <Sun size={22} className="text-amber-500 dark:text-amber-400" />,
    gradient:
      "from-stone-100 via-amber-100/60 to-sky-200/60 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
    glow: "bg-amber-300/30",
    overlay: "bg-white/40 dark:bg-black/20",
  },

  Clouds: {
    icon: <Cloud size={22} className="text-slate-500 dark:text-slate-300" />,
    gradient:
      "from-slate-200 via-slate-300/70 to-slate-400/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
    glow: "bg-slate-400/25",
    overlay: "bg-white/30 dark:bg-black/20",
  },

  Rain: {
    icon: <CloudRain size={22} className="text-sky-600 dark:text-sky-400" />,
    gradient:
      "from-slate-200 via-sky-200/60 to-indigo-300/50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
    glow: "bg-sky-400/25",
    overlay: "bg-white/30 dark:bg-black/25",
  },

  Drizzle: {
    icon: <CloudRain size={22} className="text-sky-600 dark:text-sky-400" />,
    gradient:
      "from-slate-200 via-sky-200/60 to-indigo-300/50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
    glow: "bg-sky-400/25",
    overlay: "bg-white/30 dark:bg-black/25",
  },

  Snow: {
    icon: <CloudSnow size={22} className="text-slate-400 dark:text-slate-200" />,
    gradient:
      "from-slate-100 via-slate-200/70 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-700",
    glow: "bg-white/40",
    overlay: "bg-white/50 dark:bg-black/20",
  },

  Haze: {
    icon: <CloudFog size={22} className="text-stone-500 dark:text-stone-300" />,
    gradient:
      "from-stone-200 via-stone-300/60 to-slate-300/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
    glow: "bg-stone-400/25",
    overlay: "bg-white/35 dark:bg-black/25",
  },

  Mist: {
    icon: <CloudFog size={22} className="text-stone-500 dark:text-stone-300" />,
    gradient:
      "from-stone-200 via-stone-300/60 to-slate-300/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
    glow: "bg-stone-400/25",
    overlay: "bg-white/35 dark:bg-black/25",
  },
};

export default function WeatherCard({
  data,
  units,
}: {
  data: WeatherResponse;
  units: string;
}) {
  const condition = data.weather[0].main;

  const ui =
    WEATHER_UI[condition] ?? {
      icon: <CloudSun size={22} className="text-sky-500" />,
      gradient:
        "from-slate-100 via-sky-100 to-indigo-200 dark:from-slate-950 dark:to-slate-900",
      glow: "bg-sky-300/20",
      overlay: "bg-white/40 dark:bg-black/25",
    };

  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl p-6
        bg-gradient-to-br ${ui.gradient}
        border border-black/5 dark:border-white/10
        shadow-xl backdrop-blur-xl
        transition hover:scale-[1.015]
      `}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${ui.overlay}`} />

      {/* Glow */}
      <div
        className={`absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl ${ui.glow}`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <MapPin size={18} className="text-sky-500" />
          <h2 className="text-lg font-semibold">{data.name}</h2>
        </div>

        {/* Condition */}
        <div className="mt-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
          {ui.icon}
          <p className="text-sm font-medium">{condition}</p>
        </div>

        {/* Temp */}
        <div className="mt-6 flex items-end gap-1">
          <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
            {Math.round(data.main.temp)}
          </span>
          <span className="mb-1 text-xl text-gray-700 dark:text-gray-300">
            °{units === "metric" ? "C" : "F"}
          </span>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-black/10 dark:bg-white/10" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Droplets size={18} className="text-sky-500" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">Humidity</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {data.main.humidity}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind size={18} className="text-emerald-500" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">Wind</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {data.wind.speed} m/s
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
