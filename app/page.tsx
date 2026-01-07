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

  useGeolocation(setCity);
  const { data, loading, error } = useWeather(city, units);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 🌤 BACKGROUND LAYERS */}
      <div className="
        absolute inset-0 -z-10
        bg-gradient-to-br
        from-sky-100 via-blue-50 to-indigo-200
        dark:from-zinc-950 dark:via-slate-900 dark:to-indigo-950
      " />

      {/* ☁️ Decorative cloud blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl dark:bg-indigo-900/30" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl dark:bg-sky-900/30" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-indigo-800/30" />

      {/* 🌍 CONTENT */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
        {/* ================= HEADER ================= */}
        <Header units={units} setUnits={setUnits} />

        {/* ================= SEARCH ================= */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <SearchBar onSearch={setCity} />
          </div>
        </div>

        {/* ================= STATUS ================= */}
        {loading && (
          <div className="
            rounded-3xl p-6
            bg-white/70 dark:bg-white/5
            backdrop-blur-xl
            border border-black/5 dark:border-white/10
            shadow-xl
          ">
            <Skeleton />
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {/* ================= MAIN WEATHER ================= */}
        {data && !loading && (
          <section className="
            grid gap-8
            md:grid-cols-2
            items-stretch
          ">
            {/* Current */}
            <div className="
              h-full rounded-3xl p-4
              bg-white/70 dark:bg-white/5
              backdrop-blur-xl
              border border-black/5 dark:border-white/10
              shadow-xl
            ">
              <WeatherCard data={data.current} units={units} />
            </div>

            {/* Forecast */}
            <div className="
              h-full rounded-3xl p-4
              bg-white/70 dark:bg-white/5
              backdrop-blur-xl
              border border-black/5 dark:border-white/10
              shadow-xl
            ">
              <Forecast data={data.forecast} units={units} />
            </div>
          </section>
        )}

        {/* ================= DIVIDER ================= */}
        <div className="flex justify-center">
          <div className="h-px w-32 bg-gray-300/60 dark:bg-gray-700/60" />
        </div>

        {/* ================= CITY TABLE ================= */}
        <section className="
          rounded-3xl p-4 sm:p-6
          bg-white/70 dark:bg-white/5
          backdrop-blur-xl
          border border-black/5 dark:border-white/10
          shadow-xl
        ">
          <CityTable units={units} />
        </section>
      </div>
    </main>
  );
}
