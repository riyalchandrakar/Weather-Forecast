"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import Forecast from "@/components/Forecast";
import CityTable from "@/components/CityTable";
import Skeleton from "@/components/Skeleton";
import { useWeather } from "@/hooks/useWeather";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function HomePage() {
  const [city, setCity] = useState<string>("");
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  // ✅ geo hook at top level (correct)
  useGeolocation(setCity);

  const { data, loading, error } = useWeather(city, units);

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50
        dark:from-zinc-950 dark:via-slate-900 dark:to-zinc-950
        px-4 py-6
      "
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Header units={units} setUnits={setUnits} />

        {/* Search */}
        <SearchBar onSearch={setCity} />

        {/* Loading */}
        {loading && (
          <div className="mt-6">
            <Skeleton />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Main Weather Section */}
        {data && !loading && (
          <section className="mt-6 grid gap-6">
            <WeatherCard data={data.current} units={units} />
            <Forecast data={data.forecast} units={units} />
          </section>
        )}

        {/* Divider */}
        <div className="my-12 h-px bg-gray-200 dark:bg-gray-800" />

        {/* City Table */}
        <CityTable units={units} />
      </div>
    </main>
  );
}
