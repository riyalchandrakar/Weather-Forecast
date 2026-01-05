"use client";

import { useEffect, useState } from "react";
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
  const [page, setPage] = useState<number>(1);

  // Auto-detect user location on first load
  useEffect(() => {
    useGeolocation(setCity);
  }, []);

  const { data, loading, error } = useWeather(city, units);

  return (
    <main className="min-h-screen px-4 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <Header units={units} setUnits={setUnits} />

      {/* Search */}
      <SearchBar onSearch={setCity} />

      {/* States */}
      {loading && <Skeleton />}

      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}

      {/* Weather Content */}
      {data && !loading && (
        <>
          <WeatherCard data={data.current} units={units} />
          <Forecast data={data.forecast} units={units} />
        </>
      )}

      {/* City Table with Pagination */}
      <CityTable page={page} setPage={setPage} />
    </main>
  );
}
