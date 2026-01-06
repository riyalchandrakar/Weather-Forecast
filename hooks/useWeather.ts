import { useEffect, useState } from "react";
import axios from "axios";
import type {
  WeatherApiResponse,
  Units,
} from "@/types/weather";

export function useWeather(city: string, units: Units) {
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      setError(null);
      return;
    }

    let cancelled = false;

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get<WeatherApiResponse>(
          `/api/weather?city=${city}&units=${units}`
        );

        if (!cancelled) {
          setData(res.data);
        }
      } catch {
        if (!cancelled) {
          setError("City not found");
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, [city, units]);

  return { data, loading, error };
}
