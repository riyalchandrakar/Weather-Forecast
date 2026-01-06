// hooks/useGeolocation.ts
import { useEffect } from "react";

export function useGeolocation(setCity: (city: string) => void) {
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );

        const data = await res.json();
        setCity(data.name ?? "Your Location");
      },
      () => {
        setCity("Delhi"); // fallback
      }
    );
  }, [setCity]);
}
