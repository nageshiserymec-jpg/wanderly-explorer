import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";

import RemoteImage from "./RemoteImage";

export default function DestinationCard({ destination, index = 0 }) {
  return (
    <article
      className="animate-rise group h-full"
      style={{ animationDelay: `${Math.min(index, 7) * 60}ms` }}
    >
      <Link
        to="/destination/$destinationId"
        params={{ destinationId: destination.id }}
        className="surface-card flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
      >
        <div className="relative aspect-4/3 overflow-hidden">
          <RemoteImage
            query={`${destination.name} ${destination.country}`}
            alt={`${destination.name}, ${destination.country}`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-foreground">
            {destination.region}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="text-xl font-extrabold text-foreground">{destination.name}</h3>
          <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {destination.country}
          </p>
          <p className="line-clamp-2 pt-1 text-sm leading-relaxed text-muted-foreground">
            {destination.tagline}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-accent">
            Explore
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
