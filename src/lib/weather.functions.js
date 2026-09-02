import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BASE = "https://api.openweathermap.org";

function shapeWeather(json) {
  return {
    place: json?.name ?? "Unknown location",
    country: json?.sys?.country ?? "",
    temperature: Math.round(json?.main?.temp ?? 0),
    feelsLike: Math.round(json?.main?.feels_like ?? 0),
    condition: json?.weather?.[0]?.main ?? "Unknown",
    description: json?.weather?.[0]?.description ?? "",
    icon: json?.weather?.[0]?.icon ?? null,
    humidity: json?.main?.humidity ?? null,
    // OpenWeather returns m/s in metric units -> convert to km/h
    wind: Math.round((json?.wind?.speed ?? 0) * 3.6),
  };
}

/** Current weather by coordinates OR by city name. */
export const getWeather = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z
      .object({
        lat: z.number().optional(),
        lon: z.number().optional(),
        city: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const key = process.env["OPENWEATHER_API_KEY"];
    if (!key) throw new Error("Weather service is not configured.");

    const query =
      data.city && data.city.trim()
        ? `q=${encodeURIComponent(data.city.trim())}`
        : `lat=${data.lat}&lon=${data.lon}`;

    const response = await fetch(`${BASE}/data/2.5/weather?${query}&units=metric&appid=${key}`);

    if (response.status === 404) throw new Error("We couldn't find that city.");
    if (!response.ok) throw new Error("Unable to load weather.");

    return shapeWeather(await response.json());
  });

/** Turn coordinates into a readable "City, Country" label. */
export const reverseGeocode = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ lat: z.number(), lon: z.number() }).parse(data))
  .handler(async ({ data }) => {
    const key = process.env["OPENWEATHER_API_KEY"];
    if (!key) return null;

    try {
      const response = await fetch(
        `${BASE}/geo/1.0/reverse?lat=${data.lat}&lon=${data.lon}&limit=1&appid=${key}`,
      );
      if (!response.ok) return null;
      const [place] = await response.json();
      if (!place) return null;
      return { name: place.name, country: place.country };
    } catch {
      return null;
    }
  });
