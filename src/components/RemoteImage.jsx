import { useQuery } from "@tanstack/react-query";
import { ImageOff } from "lucide-react";
import { useState } from "react";

import { fetchImage } from "../services/imageApi";

/**
 * Reusable image that resolves its source from the image API at runtime.
 * Handles three states: loading (skeleton), failed (fallback), loaded (fade-in).
 */
export default function RemoteImage({ query, alt, className = "", sizes }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: ["image", query],
    queryFn: () => fetchImage(query),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  const unavailable = isError || failed || (!isPending && !data?.url);

  if (isPending) {
    return <div className={`skeleton ${className}`} aria-hidden="true" />;
  }

  if (unavailable) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-secondary text-muted-foreground ${className}`}
        role="img"
        aria-label={`${alt} — photo unavailable`}
      >
        <ImageOff className="h-6 w-6" aria-hidden="true" />
        <span className="px-3 text-center text-xs font-medium">Photo unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={data.url}
      alt={alt}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
