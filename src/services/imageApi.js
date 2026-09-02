/**
 * Image API service (client side).
 *
 * The Unsplash access key is NEVER exposed to the browser. This module calls
 * our own server function, which holds the key server-side and proxies the
 * request to Unsplash.
 */
import { searchImage } from "../lib/images.functions";

const cache = new Map();

/**
 * Fetch one landscape photo for a search query, e.g. "Tokyo Japan".
 * Returns { url, alt, credit } or null when nothing is available.
 */
export async function fetchImage(query) {
  if (!query) return null;
  if (cache.has(query)) return cache.get(query);

  const result = await searchImage({ data: { query } });
  cache.set(query, result);
  return result;
}
