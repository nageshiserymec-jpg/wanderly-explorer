import { Droplets, Thermometer, Wind } from "lucide-react";

import ErrorState from "./ErrorState";
import { Loading } from "./Loading";

/**
 * Presentational weather card. All data fetching happens in the parent,
 * so this component stays reusable.
 */
export default function WeatherCard({ weather, loading, error, onRetry, eyebrow = "Current weather" }) {
  if (loading) {
    return (
      <div className="surface-card p-6">
        <Loading message="Loading weather..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load weather"
        message={error}
        actionLabel="Try Again"
        onAction={onRetry}
      />
    );
  }

  if (!weather) return null;

  const stats = [
    { icon: Thermometer, label: "Feels like", value: `${weather.feelsLike}°C` },
    { icon: Droplets, label: "Humidity", value: `${weather.humidity ?? "—"}%` },
    { icon: Wind, label: "Wind", value: `${weather.wind} km/h` },
  ];

  return (
    <section className="animate-fade overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground md:p-9">
      <p className="text-eyebrow text-on-dark-muted">{eyebrow}</p>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        {weather.icon ? (
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt=""
            width="72"
            height="72"
            className="h-16 w-16"
          />
        ) : null}
        <p className="text-6xl font-extrabold leading-none md:text-7xl">{weather.temperature}°C</p>
        <div>
          <p className="text-lg font-bold">
            {weather.place}
            {weather.country ? `, ${weather.country}` : ""}
          </p>
          <p className="text-sm capitalize text-on-dark-muted">
            {weather.description || weather.condition}
          </p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl bg-on-dark/10 px-4 py-3.5"
          >
            <Icon className="h-4 w-4 text-on-dark-muted" aria-hidden="true" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-on-dark-muted">
                {label}
              </dt>
              <dd className="text-sm font-bold">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
