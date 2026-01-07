import { ForecastResponse } from "@/types/weather";
import {
  CloudSun,
  CloudRain,
  Sun,
  Cloud,
  CloudSnow,
  CloudFog,
} from "lucide-react";
import React from "react";

/* 🍎 Premium muted palette (same as WeatherCard) */
const FORECAST_UI: Record<
  string,
  {
    icon: React.ReactNode;
    gradient: string;
    overlay: string;
  }
> = {
  Clear: {
    icon: <Sun size={22} className="text-amber-500 dark:text-amber-400" />,
    gradient:
      "from-stone-100 via-amber-100/60 to-sky-200/60 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
    overlay: "bg-white/40 dark:bg-black/20",
  },

  Clouds: {
    icon: <Cloud size={22} className="text-slate-500 dark:text-slate-300" />,
    gradient:
      "from-slate-200 via-slate-300/70 to-slate-400/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
    overlay: "bg-white/30 dark:bg-black/20",
  },

  Rain: {
    icon: <CloudRain size={22} className="text-sky-600 dark:text-sky-400" />,
    gradient:
      "from-slate-200 via-sky-200/60 to-indigo-300/50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
    overlay: "bg-white/30 dark:bg-black/25",
  },

  Drizzle: {
    icon: <CloudRain size={22} className="text-sky-600 dark:text-sky-400" />,
    gradient:
      "from-slate-200 via-sky-200/60 to-indigo-300/50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
    overlay: "bg-white/30 dark:bg-black/25",
  },

  Snow: {
    icon: <CloudSnow size={22} className="text-slate-400 dark:text-slate-200" />,
    gradient:
      "from-slate-100 via-slate-200/70 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-700",
    overlay: "bg-white/50 dark:bg-black/20",
  },

  Haze: {
    icon: <CloudFog size={22} className="text-stone-500 dark:text-stone-300" />,
    gradient:
      "from-stone-200 via-stone-300/60 to-slate-300/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
    overlay: "bg-white/35 dark:bg-black/25",
  },

  Mist: {
    icon: <CloudFog size={22} className="text-stone-500 dark:text-stone-300" />,
    gradient:
      "from-stone-200 via-stone-300/60 to-slate-300/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
    overlay: "bg-white/35 dark:bg-black/25",
  },
};

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
  
 <div className="mt-6">
     <div className="mb-4">
        <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400">
          5-Day Forecast
        </h3>

       <div className="mt-1 h-px w-10 bg-gray-400/60 dark:bg-gray-600/60" />
     </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {daily.map((item) => {
          const condition = item.weather[0].main;
          const ui =
            FORECAST_UI[condition] ?? {
              icon: (
                <CloudSun
                  size={22}
                  className="text-sky-500 dark:text-sky-400"
                />
              ),
              gradient:
                "from-slate-100 via-sky-100 to-indigo-200 dark:from-slate-950 dark:to-slate-900",
              overlay: "bg-white/40 dark:bg-black/25",
            };

          return (
            <div
              key={item.dt_txt}
              className={`
                relative overflow-hidden rounded-2xl p-4 text-center
                bg-gradient-to-br ${ui.gradient}
                border border-black/5 dark:border-white/10
                shadow-lg backdrop-blur-xl
                transition hover:scale-[1.02]
              `}
            >
              {/* Overlay */}
              <div className={`absolute inset-0 ${ui.overlay}`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Date */}
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  {new Date(item.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </p>

                {/* Icon */}
                <div className="flex justify-center my-3">
                  {ui.icon}
                </div>

                {/* Temp */}
                <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                  {Math.round(item.main.temp)}°
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {units === "metric" ? "C" : "F"}
                  </span>
                </p>

                {/* Condition */}
                <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                  {condition}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
