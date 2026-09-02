import { useCallback, useEffect, useState } from "react";

import { fetchWeatherByCoords } from "../services/weatherApi";
import WeatherCard from "./WeatherCard";

/** Weather for a destination's own coordinates. */
export default function DestinationWeather({ destination }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setWeather(await fetchWeatherByCoords(destination.latitude, destination.longitude));
    } catch (caught) {
      setWeather(null);
      setError(caught?.message ?? "Unable to load weather.");
    } finally {
      setLoading(false);
    }
  }, [destination.latitude, destination.longitude]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <WeatherCard
      weather={weather}
      loading={loading}
      error={error}
      onRetry={load}
      eyebrow={`Current weather in ${destination.name}`}
    />
  );
}
