import { useMemo } from "react";

import { REGIONS, destinations } from "../data/destinations";
import DestinationCard from "./DestinationCard";
import EmptyState from "./EmptyState";
import FilterButtons from "./FilterButtons";
import SearchBar from "./SearchBar";

/**
 * Explore section: search + region filter, combined.
 * Filtering is plain array logic — no extra libraries needed.
 */
export default function DestinationExplorer({ query, onQueryChange, region, onRegionChange }) {
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return destinations.filter((destination) => {
      const matchesRegion = region === "All" || destination.region === region;
      const matchesQuery =
        term === "" ||
        destination.name.toLowerCase().includes(term) ||
        destination.country.toLowerCase().includes(term) ||
        destination.region.toLowerCase().includes(term);
      return matchesRegion && matchesQuery;
    });
  }, [query, region]);

  const clearAll = () => {
    onQueryChange("");
    onRegionChange("All");
  };

  return (
    <section id="explore" className="container-page scroll-mt-24 py-20 md:py-28">
      <div className="flex flex-col gap-8">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-accent">Explore</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight text-foreground">
            Every destination, one search away
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Search by city, country or region — then open any destination for live weather,
            famous places and an AI-built itinerary.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="max-w-xl">
            <SearchBar
              id="explore-search"
              label="Search destinations"
              placeholder="Search destinations"
              value={query}
              onChange={onQueryChange}
            />
          </div>
          <FilterButtons options={REGIONS} value={region} onChange={onRegionChange} />
        </div>

        <p className="text-sm font-medium text-muted-foreground" aria-live="polite">
          {results.length} {results.length === 1 ? "destination" : "destinations"}
        </p>

        {results.length === 0 ? (
          <EmptyState
            title="No destinations found"
            message={`We couldn't match "${query}". Try another destination, or clear your filters.`}
            actionLabel="Clear Search"
            onAction={clearAll}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
