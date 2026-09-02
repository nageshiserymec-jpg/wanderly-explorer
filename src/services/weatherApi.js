/**
 * Weather service (client side).
 * The OpenWeather key lives on the server; these helpers call our server
 * functions, which proxy the request.
 */
import { getWeather, reverseGeocode } from "../lib/weather.functions";

export function fetchWeatherByCoords(lat, lon) {
  return getWeather({ data: { lat, lon } });
}

export function fetchWeatherByCity(city) {
  return getWeather({ data: { city } });
}

export function fetchPlaceName(lat, lon) {
  return reverseGeocode({ data: { lat, lon } });
}

/**
 * Promise wrapper around the browser Geolocation API.
 * Rejects with a readable message so the UI can explain what happened.
 */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
      (error) => {
        const messages = {
          1: "We couldn't access your location.",
          2: "Your location is currently unavailable.",
          3: "Finding your location took too long.",
        };
        reject(new Error(messages[error.code] ?? "We couldn't access your location."));
      },
      { timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  });
}
