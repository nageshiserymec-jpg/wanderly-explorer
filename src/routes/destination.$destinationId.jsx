import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Coins, Languages, MapPin } from "lucide-react";

import ChatBot from "../components/ChatBot";
import DestinationWeather from "../components/DestinationWeather";
import EmptyState from "../components/EmptyState";
import FamousPlaceCard from "../components/FamousPlaceCard";
import ItineraryPlanner from "../components/ItineraryPlanner";
import RemoteImage from "../components/RemoteImage";
import { getDestinationById } from "../data/destinations";

export const Route = createFileRoute("/destination/$destinationId")({
  loader: ({ params }) => {
    const destination = getDestinationById(params.destinationId);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Destination not found — Wanderly" }, { name: "robots", content: "noindex" }],
      };
    }
    const { destination } = loaderData;
    const title = `${destination.name}, ${destination.country} — Wanderly`;
    return {
      meta: [
        { title },
        { name: "description", content: destination.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: destination.tagline },
      ],
    };
  },
  notFoundComponent: DestinationNotFound,
  component: DestinationDetails,
});

function DestinationNotFound() {
  return (
    <div className="container-page py-40">
      <EmptyState
        title="Destination not found"
        message="We don't have a guide for that destination yet. Browse the ones we do have."
        actionLabel="Back to destinations"
        onAction={() => {
          window.location.href = "/";
        }}
      />
    </div>
  );
}

function DestinationDetails() {
  const { destination } = Route.useLoaderData();

  const facts = [
    { icon: MapPin, label: "Region", value: destination.region },
    { icon: Calendar, label: "Best time", value: destination.bestTime },
    { icon: Coins, label: "Currency", value: destination.currency },
    { icon: Languages, label: "Language", value: destination.language },
  ];

  return (
    <>
      <header className="relative isolate flex min-h-[70svh] items-end overflow-hidden">
        <RemoteImage
          query={`${destination.name} ${destination.country}`}
          alt={`${destination.name}, ${destination.country}`}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

        <div className="container-page pb-14 pt-32">
          <Link
            to="/"
            className="animate-fade inline-flex items-center gap-2 text-sm font-bold text-on-dark-muted transition-colors hover:text-on-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All destinations
          </Link>
          <p className="animate-rise mt-8 text-eyebrow text-on-dark-muted">
            {destination.country} · {destination.region}
          </p>
          <h1
            className="animate-rise mt-3 text-[clamp(2.5rem,7vw,4.75rem)] font-extrabold leading-[0.95] text-on-dark"
            style={{ animationDelay: "80ms" }}
          >
            {destination.name}
          </h1>
          <p
            className="animate-rise mt-4 max-w-xl text-lg text-on-dark-muted"
            style={{ animationDelay: "160ms" }}
          >
            {destination.tagline}
          </p>
        </div>
      </header>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-eyebrow text-accent">About</p>
            <p className="mt-5 text-lg leading-relaxed text-foreground md:text-xl">
              {destination.description}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4 self-start">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="surface-card p-5">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-2 text-sm font-bold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14">
          <DestinationWeather destination={destination} />
        </div>
      </section>


      <section className="border-t border-border bg-card">
        <div className="container-page py-20 md:py-24">
          <p className="text-eyebrow text-accent">Famous places</p>
          <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight text-foreground">
            What to see in {destination.name}
          </h2>

          {destination.famousPlaces?.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {destination.famousPlaces.map((place, index) => (
                <FamousPlaceCard
                  key={place.name}
                  place={place}
                  destination={destination}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-10"
              title="No places listed yet"
              message={`We're still curating the highlights for ${destination.name}.`}
            />
          )}
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-eyebrow text-accent">Ask anything</p>
            <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight text-foreground">
              Your {destination.name} travel companion
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              How long to stay, what to eat, what to skip — ask in plain English and get a
              practical answer grounded in {destination.name}.
            </p>
          </div>
          <ChatBot destination={destination} />
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="container-page py-20 md:py-24">
          <ItineraryPlanner destination={destination} />
        </div>
      </section>
    </>
  );
}
