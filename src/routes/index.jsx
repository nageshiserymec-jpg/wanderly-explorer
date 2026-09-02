import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, CalendarRange, CloudSun } from "lucide-react";
import { useState } from "react";

import DestinationCard from "../components/DestinationCard";
import DestinationExplorer from "../components/DestinationExplorer";
import Hero from "../components/Hero";
import LocationWeather from "../components/LocationWeather";
import { destinations } from "../data/destinations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wanderly — Discover the World, Plan Your Next Adventure" },
      {
        name: "description",
        content:
          "Explore curated destinations with live weather, famous places and an AI travel assistant that builds your day-by-day itinerary.",
      },
      { property: "og:title", content: "Wanderly — Discover the World" },
      {
        property: "og:description",
        content:
          "Search destinations, check live weather and generate an AI travel itinerary in seconds.",
      },
    ],
  }),
  component: Home,
});

const highlights = [
  {
    icon: CloudSun,
    title: "Live weather",
    body: "Real-time conditions for your location or any city you search.",
  },
  {
    icon: Bot,
    title: "AI travel assistant",
    body: "Ask anything about a destination and get a grounded, practical answer.",
  },
  {
    icon: CalendarRange,
    title: "Day-by-day itineraries",
    body: "Tell us the days and your travel style — we'll structure the trip.",
  },
];

function Home() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const popular = destinations.slice(0, 4);

  return (
    <>
      <Hero onSearch={setQuery} />

      <section className="border-y border-border bg-card">
        <div className="container-page grid gap-8 py-14 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-accent">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-base font-extrabold text-foreground">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="destinations" className="container-page scroll-mt-24 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-eyebrow text-accent">Popular right now</p>
            <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight text-foreground">
              The places travellers keep returning to
            </h2>
          </div>
          <Link
            to="/"
            hash="explore"
            className="text-sm font-bold text-accent transition-colors hover:brightness-110"
          >
            View all destinations →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} />
          ))}
        </div>
      </section>

      <DestinationExplorer
        query={query}
        onQueryChange={setQuery}
        region={region}
        onRegionChange={setRegion}
      />

      <section id="plan" className="container-page scroll-mt-24 pb-24">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center md:px-16 md:py-20">
          <p className="text-eyebrow text-on-dark-muted">Plan trip</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight text-primary-foreground">
            Pick a destination and let AI draft the whole trip
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-on-dark-muted">
            Choose your days and travel style. Wanderly builds a readable, hour-by-hour plan you
            can actually follow.
          </p>
          <Link
            to="/destination/$destinationId"
            params={{ destinationId: "tokyo" }}
            className="mt-9 inline-flex rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-accent-foreground transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            Start with Tokyo
          </Link>
        </div>
      </section>
    </>
  );
}
