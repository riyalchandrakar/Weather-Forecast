"use client";

import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";
import type { WeatherResponse } from "@/types/weather";

const CITIES = [
  "Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Chandigarh",
  "Indore", "Bhopal", "Surat", "Vadodara", "Rajkot",
  "Nagpur", "Noida", "Gurugram", "Faridabad", "Ghaziabad",
  "Lucknow", "Kanpur", "Patna", "Ranchi", "Gaya",
];

const ITEMS_PER_PAGE = 5;

export default function CityTable() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<WeatherResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ MEMOIZED (IMPORTANT FIX)
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
            const res = await fetch(`/api/weather?city=${city}&units=metric`);
            if (!res.ok) return null;

            const json = await res.json();
            const current = json?.current;

            if (!current?.main || !current?.wind) return null;

            return current as WeatherResponse;
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
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    // ✅ cleanup (StrictMode safe)
    return () => {
      cancelled = true;
    };
  }, [visibleCities]);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">City Weather</h2>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-zinc-800">
            <tr>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Temp</th>
              <th className="p-3 text-left">Condition</th>
              <th className="p-3 text-left">Humidity</th>
              <th className="p-3 text-left">Wind</th>
            </tr>
          </thead>

          <tbody>
            {loading && <TableSkeleton />}

            {!loading &&
              data.map((item) => (
                <tr key={item.name} className="border-t">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">
                    {Math.round(item.main.temp)}°C
                  </td>
                  <td className="p-3">
                    {item.weather?.[0]?.main ?? "—"}
                  </td>
                  <td className="p-3">
                    {item.main.humidity}%
                  </td>
                  <td className="p-3">
                    {item.wind.speed} m/s
                  </td>
                </tr>
              ))}

            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(CITIES.length / ITEMS_PER_PAGE)}
      />
    </section>
  );
}
