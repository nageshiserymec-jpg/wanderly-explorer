import { MapPin, Navigation } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  fetchPlaceName,
  fetchWeatherByCity,
  fetchWeatherByCoords,
  getCurrentPosition,
} from "../services/weatherApi";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";

/**
 * "Your current location" panel.
 * Works in three situations:
 *  1. permission granted   -> weather for the detected location
 *  2. permission denied    -> friendly notice + manual city search
 *  3. API/network failure  -> error state with retry
 */
export default function LocationWeather() {
  const [weather, setWeather] = useState(null);
  const [label, setLabel] = useState("");
  const [status, setStatus] = useState("idle"); // idle | locating | loading | ready | denied | error
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  const loadByCoords = useCallback(async () => {
    setStatus("locating");
    setError("");
    try {
      const { lat, lon } = await getCurrentPosition();
      setStatus("loading");
      const [data, place] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchPlaceName(lat, lon),
      ]);
      setWeather(data);
      setLabel(place ? `${place.name}, ${place.country}` : data.place);
      setStatus("ready");
    } catch (caught) {
      const message = caught?.message ?? "We couldn't access your location.";
      const denied = message.toLowerCase().includes("location");
      setError(message);
      setStatus(denied ? "denied" : "error");
    }
  }, []);

  useEffect(() => {
    loadByCoords();
  }, [loadByCoords]);

  const searchCity = async (value) => {
    const term = value.trim();
    if (!term) return;
    setStatus("loading");
    setError("");
    try {
      const data = await fetchWeatherByCity(term);
      setWeather(data);
      setLabel(`${data.place}${data.country ? `, ${data.country}` : ""}`);
      setStatus("ready");
    } catch (caught) {
      setWeather(null);
      setError(caught?.message ?? "Unable to load weather.");
      setStatus("error");
    }
  };

  const busy = status === "locating" || status === "loading";

  return (
    <section className="container-page py-20 md:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="text-eyebrow text-accent">Right now</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight text-foreground">
            Your current location
          </h2>

          <p className="mt-4 flex items-center gap-2 text-base text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            {status === "locating"
              ? "Finding your location..."
              : label || "Location unavailable"}
          </p>

          {status === "denied" ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/60 p-5">
              <p className="text-sm font-bold text-foreground">Location unavailable</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {error} Search for a location instead.
              </p>
              <button
                type="button"
                onClick={loadByCoords}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Try location again
              </button>
            </div>
          ) : null}

          <div className="mt-6">
            <SearchBar
              id="city-search"
              label="Search for a city"
              placeholder="Search for a city"
              value={city}
              onChange={setCity}
              onSubmit={searchCity}
              action="Get Weather"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Try “Bengaluru”, “Tokyo” or “Lisbon”. Works with or without location permission.
            </p>
          </div>
        </div>

        <WeatherCard
          weather={weather}
          loading={busy}
          error={status === "error" ? error : ""}
          onRetry={() => (city.trim() ? searchCity(city) : loadByCoords())}
        />
      </div>
    </section>
  );
}
