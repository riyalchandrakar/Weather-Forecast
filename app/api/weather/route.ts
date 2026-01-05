import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const units = searchParams.get("units") || "metric";

  if (!city) {
    return NextResponse.json({ error: "City required" }, { status: 400 });
  }

  try {
    const [current, forecast] = await Promise.all([
      fetch(`${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`),
      fetch(`${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}`)
    ]);

    if (!current.ok) throw new Error("City not found");

    return NextResponse.json({
      current: await current.json(),
      forecast: await forecast.json()
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}
