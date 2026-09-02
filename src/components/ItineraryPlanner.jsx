import { Loader2, Minus, Plus, Wand2 } from "lucide-react";
import { useState } from "react";

import { requestItinerary } from "../services/geminiApi";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import Itinerary from "./Itinerary";

const STYLES = ["Culture", "Food", "Adventure", "Relaxation"];

export default function ItineraryPlanner({ destination }) {
  const [days, setDays] = useState(3);
  const [style, setStyle] = useState("Culture");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await requestItinerary({
        destination: destination.name,
        country: destination.country,
        days,
        style,
      });
      setItinerary(result);
    } catch (caught) {
      setItinerary(null);
      setError(caught?.message ?? "We couldn't generate your itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="plan" className="scroll-mt-24">
      <p className="text-eyebrow text-accent">Plan your trip</p>
      <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight text-foreground">
        Build a {destination.name} itinerary
      </h2>

      <div className="surface-card mt-8 grid gap-8 p-6 md:grid-cols-3 md:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Destination
          </p>
          <p className="mt-2 text-lg font-extrabold text-foreground">{destination.name}</p>
          <p className="text-sm text-muted-foreground">{destination.country}</p>
        </div>

        <div>
          <p id="days-label" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Number of days
          </p>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDays((value) => Math.max(1, value - 1))}
              disabled={days <= 1}
              aria-label="Decrease number of days"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>
            <output aria-labelledby="days-label" className="w-10 text-center text-2xl font-extrabold text-foreground">
              {days}
            </output>
            <button
              type="button"
              onClick={() => setDays((value) => Math.min(10, value + 1))}
              disabled={days >= 10}
              aria-label="Increase number of days"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Travel style
          </p>
          <div role="group" aria-label="Travel style" className="mt-2 flex flex-wrap gap-2">
            {STYLES.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={style === option}
                onClick={() => setStyle(option)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  style === option
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <button
            type="button"
            onClick={generate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Wand2 className="h-4 w-4" aria-hidden="true" />
            )}
            {loading ? "Generating your itinerary..." : "Generate Itinerary"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="mt-10 space-y-4" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="surface-card p-6">
              <div className="skeleton h-5 w-40 rounded-md" />
              <div className="mt-4 space-y-3">
                <div className="skeleton h-4 w-full rounded-md" />
                <div className="skeleton h-4 w-5/6 rounded-md" />
                <div className="skeleton h-4 w-4/6 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!loading && error ? (
        <ErrorState
          className="mt-10"
          title="We couldn't build that itinerary"
          message={error}
          actionLabel="Try Again"
          onAction={generate}
        />
      ) : null}

      {!loading && !error && !itinerary ? (
        <EmptyState
          className="mt-10"
          icon={Wand2}
          title="No itinerary yet"
          message={`Choose your days and travel style, then generate a plan for ${destination.name}.`}
        />
      ) : null}

      {!loading && !error && itinerary ? <Itinerary itinerary={itinerary} /> : null}
    </section>
  );
}
