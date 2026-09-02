import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Server-side proxy for the Unsplash image API.
 * The API key is read inside the handler so it never reaches the browser.
 */
export const searchImage = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ query: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const key = process.env["UNSPLASH_ACCESS_KEY"];
    if (!key) return null; // no key configured yet -> UI shows its fallback

    try {
      const url =
        "https://api.unsplash.com/search/photos?per_page=1&orientation=landscape&content_filter=high&query=" +
        encodeURIComponent(data.query);

      const response = await fetch(url, {
        headers: { Authorization: `Client-ID ${key}` },
      });

      if (!response.ok) return null;

      const json = await response.json();
      const photo = json?.results?.[0];
      if (!photo) return null;

      return {
        url: photo.urls?.regular ?? null,
        alt: photo.alt_description || data.query,
        credit: photo.user?.name ?? null,
      };
    } catch {
      return null;
    }
  });
