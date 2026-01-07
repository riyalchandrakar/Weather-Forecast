"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, CloudSun, Droplets, Wind } from "lucide-react";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";
import type { WeatherResponse, Units } from "@/types/weather";

const CITIES = [
  "Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Chandigarh",
  "Indore", "Bhopal", "Surat", "Vadodara", "Rajkot",
  "Nagpur", "Noida", "Gurugram", "Faridabad", "Ghaziabad",
  "Lucknow", "Kanpur", "Patna", "Ranchi", "Gaya",
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
            const res = await fetch(
              `/api/weather?city=${city}&units=${units}`
            );
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
  }, [visibleCities, units]); // ✅ units dependency added

  return (
    <section className="mt-14">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
        City Weather Overview
      </h2>

      <div className="
        overflow-x-auto rounded-2xl
        bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        border border-white/40 dark:border-white/10
        shadow-lg backdrop-blur-md
      ">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-white/60 dark:bg-black/30">
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
                  className="border-t border-white/30 dark:border-white/10 hover:bg-white/40 dark:hover:bg-white/5 transition"
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

            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
