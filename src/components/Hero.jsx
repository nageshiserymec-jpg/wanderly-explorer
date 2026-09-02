import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import SearchBar from "./SearchBar";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4";

export default function Hero({ onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (value) => {
    onSearch?.(value);
    navigate({ to: "/", hash: "explore" });
  };

  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster=""
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-page w-full pb-20 pt-32 md:pt-36">
        <div className="max-w-3xl">
          <p className="animate-rise text-eyebrow text-on-dark-muted">
            Wanderly — Discover the world
          </p>

          <h1
            className="animate-rise mt-5 text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.95] text-on-dark"
            style={{ animationDelay: "80ms" }}
          >
            Discover
            <br />
            the world
          </h1>

          <p
            className="animate-rise mt-6 max-w-lg text-lg leading-relaxed text-on-dark-muted md:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            Your next adventure starts here. Plan it with live weather, real places and an AI
            travel companion.
          </p>

          <div className="animate-rise mt-10 max-w-xl" style={{ animationDelay: "240ms" }}>
            <SearchBar
              id="hero-search"
              label="Search destinations"
              placeholder="Search destinations..."
              value={query}
              onChange={(value) => {
                setQuery(value);
                onSearch?.(value);
              }}
              onSubmit={handleSubmit}
              tone="dark"
              action="Explore Now"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
