/**
 * AI service (client side).
 * The AI key is server-side only; these helpers call our server functions.
 */
import { askAssistant, generateItinerary } from "../lib/ai.functions";

export function askTravelAssistant({ destination, country, history }) {
  return askAssistant({ data: { destination, country, history } });
}

export function requestItinerary({ destination, country, days, style }) {
  return generateItinerary({ data: { destination, country, days, style } });
}
