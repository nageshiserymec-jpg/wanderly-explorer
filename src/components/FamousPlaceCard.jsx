import { useState } from "react";

import RemoteImage from "./RemoteImage";

export default function FamousPlaceCard({ place, destination, index = 0 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="animate-rise surface-card group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
      style={{ animationDelay: `${Math.min(index, 6) * 70}ms` }}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <RemoteImage
          query={`${place.name} ${destination.name} ${destination.country}`}
          alt={`${place.name} in ${destination.name}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {place.category ? (
          <p className="text-eyebrow text-accent">{place.category}</p>
        ) : null}
        <h3 className="text-lg font-extrabold text-foreground">{place.name}</h3>
        <p
          className={`text-sm leading-relaxed text-muted-foreground ${expanded ? "" : "line-clamp-3"}`}
        >
          {place.description}
        </p>
        <p className="text-xs font-medium text-muted-foreground">
          {destination.name}, {destination.country}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-auto self-start pt-3 text-sm font-bold text-accent transition-colors hover:brightness-110"
        >
          {expanded ? "Show less" : "Learn more"}
        </button>
      </div>
    </article>
  );
}
