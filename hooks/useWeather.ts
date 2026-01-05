import { useEffect, useState } from "react";
import axios from "axios";

export function useWeather(city: string, units: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    axios
      .get(`/api/weather?city=${city}&units=${units}`)
      .then(res => setData(res.data))
      .catch(() => setError("City not found"))
      .finally(() => setLoading(false));
  }, [city, units]);

  return { data, loading, error };
}
