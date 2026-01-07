"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, CloudSun, Droplets, Wind } from "lucide-react";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";
import MobileTableSkeleton from "./MobileTableSkeleton";
import type { WeatherResponse, Units } from "@/types/weather";

const CITIES = [
  "Delhi","Mumbai","Bengaluru","Chennai","Kolkata",
  "Hyderabad","Pune","Ahmedabad","Jaipur","Chandigarh",
  "Indore","Bhopal","Surat","Vadodara","Rajkot",
  "Nagpur","Noida","Gurugram","Faridabad","Ghaziabad",
  "Lucknow","Kanpur","Patna","Ranchi","Gaya",
];

const ITEMS_PER_PAGE = 5;

export default function CityTable({ units }: { units: Units }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<WeatherResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const visibleCities = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return CITIES.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      setLoading(true);
      setError("");

      try {
        const responses = await Promise.all(
          visibleCities.map(async (city) => {
            const res = await fetch(`/api/weather?city=${city}&units=${units}`);
            if (!res.ok) return null;
            const json = await res.json();
            return json?.current ?? null;
          })
        );

        if (!cancelled) {
          setData(responses.filter(Boolean) as WeatherResponse[]);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load city weather data");
          setData([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [visibleCities, units]);

  return (
    <section className="mt-13">
       <div className="mb-5">
       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        City Weather Overview
       </h3>
      <div className="mt-1 h-0.5 w-12 bg-sky-400/60"></div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="
        hidden md:block overflow-x-auto rounded-3xl
        bg-gradient-to-br
        from-white via-sky-100 to-indigo-100
        dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950
        border border-black/5 dark:border-white/10
        shadow-xl backdrop-blur-xl
      ">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-white/70 dark:bg-white/5">
            <tr className="text-left text-gray-700 dark:text-gray-300">
              <th className="p-4 w-[22%]">City</th>
              <th className="p-4 w-[14%]">Temp</th>
              <th className="p-4 w-[22%]">Condition</th>
              <th className="p-4 w-[20%]">Humidity</th>
              <th className="p-4 w-[22%]">Wind</th>
            </tr>
          </thead>

          <tbody>
            {loading && <TableSkeleton />}

            {!loading &&
              data.map((item) => (
                <tr
                  key={item.name}
                  className="
                    border-t border-black/5 dark:border-white/10
                    hover:bg-black/5 dark:hover:bg-white/5
                    transition
                  "
                >
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-sky-500" />
                      {item.name}
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-gray-900 dark:text-white">
                    {Math.round(item.main.temp)}°
                    {units === "metric" ? "C" : "F"}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CloudSun size={16} className="text-yellow-500" />
                      {item.weather?.[0]?.main ?? "—"}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Droplets size={16} className="text-blue-500" />
                      {item.main.humidity}%
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Wind size={16} className="text-emerald-500" />
                      {item.wind.speed} {units === "metric" ? "m/s" : "mph"}
                                       </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {loading && <MobileTableSkeleton />}

        {!loading &&
          data.map((item) => (
            <div
              key={item.name}
              className="
                rounded-3xl p-4
                bg-gradient-to-br
                from-white via-sky-100 to-indigo-100
                dark:from-slate-950 dark:to-indigo-950
                border border-black/5 dark:border-white/10
                shadow-lg backdrop-blur-xl
              "
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100">
                  <MapPin size={16} className="text-sky-500" />
                  {item.name}
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                  <CloudSun size={16} className="text-yellow-500" />
                  {item.weather?.[0]?.main}
                </div>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="font-bold text-gray-900 dark:text-white">
                  {Math.round(item.main.temp)}°
                  {units === "metric" ? "C" : "F"}
                </span>

                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Droplets size={14} className="text-blue-500" />
                  {item.main.humidity}%
                </span>

                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Wind size={14} className="text-emerald-500" />
                  {item.wind.speed}
                </span>
              </div>
            </div>
          ))}
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(CITIES.length / ITEMS_PER_PAGE)}
      />
    </section>
  );
}
