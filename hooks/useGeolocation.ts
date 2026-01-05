export function useGeolocation(setCity: (city: string) => void) {
  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude, longitude } = pos.coords;
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    const data = await res.json();
    setCity(data[0].name);
  });
}
