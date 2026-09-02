# Wanderly

**Discover the world. Plan your next adventure.**

Wanderly is a travel web application for exploring destinations, checking live weather,
discovering famous places and generating an AI-written, day-by-day travel itinerary.

---

## Features

- **Destination explorer** — a curated set of 8 destinations across Asia, Europe, the Middle East and America
- **Search** — search by city, country or region
- **Filtering** — region filter pills that combine with the search term
- **Destination details** — a dedicated page per destination (`/destination/tokyo`)
- **Famous places** — image-led cards with category, description and expandable text
- **Location awareness** — browser Geolocation detects your city and loads its weather
- **Manual location search** — search any city; works even if location permission is denied
- **Real-time weather** — temperature, feels-like, condition, humidity and wind
- **Dynamic images** — every photo is fetched at runtime from Unsplash (no hardcoded image URLs)
- **AI travel assistant** — ask anything about the current destination in a chat interface
- **AI itinerary generation** — structured JSON turned into a readable day-by-day timeline
- **Loading, error and empty states** — designed for every async operation
- **Responsive design** — 1 / 2 / 4 cards per row on mobile / tablet / desktop
- **Accessibility** — semantic HTML, alt text, labelled inputs, visible focus rings, `aria-pressed` states

---

## Tech Stack

| Layer     | Choice |
| --------- | ------ |
| UI        | React 19 (JavaScript, `.jsx`) |
| Build     | Vite |
| Routing   | TanStack Router (file-based routes, `/destination/$destinationId`) |
| Data      | TanStack Query (image caching) |
| Styling   | CSS design tokens + Tailwind utilities in `src/styles.css` |
| Weather   | OpenWeather API |
| Images    | Unsplash API |
| AI        | Google Gemini via the Lovable AI Gateway |

> **Note on routing:** the assessment brief suggested React Router. This project runs on
> TanStack Router, which uses the same concepts (route files, URL params, `<Link>`, loaders).
> Route files live in `src/routes/` instead of `src/pages/`.

---

## Project structure

```
src/
├── components/          # reusable UI
│   ├── Navbar.jsx           ├── ChatBot.jsx
│   ├── Hero.jsx             ├── Itinerary.jsx
│   ├── SearchBar.jsx        ├── ItineraryPlanner.jsx
│   ├── FilterButtons.jsx    ├── WeatherCard.jsx
│   ├── DestinationCard.jsx  ├── LocationWeather.jsx
│   ├── FamousPlaceCard.jsx  ├── DestinationWeather.jsx
│   ├── RemoteImage.jsx      ├── Loading.jsx
│   ├── DestinationExplorer.jsx
│   ├── ErrorState.jsx       └── EmptyState.jsx
│
├── routes/              # pages (file-based routing)
│   ├── __root.tsx                 # shared layout: navbar + footer + <head>
│   ├── index.jsx                  # /
│   └── destination.$destinationId.jsx  # /destination/:destinationId
│
├── services/            # client-side API layer
│   ├── weatherApi.js    # weather + geolocation helpers
│   ├── imageApi.js      # image lookup + in-memory cache
│   └── geminiApi.js     # AI assistant + itinerary
│
├── lib/                 # SERVER-side API proxies (keys live here)
│   ├── weather.functions.js
│   ├── images.functions.js
│   └── ai.functions.js
│
├── data/
│   └── destinations.js  # curated dataset (no image URLs)
│
└── styles.css           # design system: colour, radius, shadow, motion tokens
```

---

## API configuration & security

**No API key is ever shipped to the browser.**

A Vite variable prefixed with `VITE_` is inlined into the client bundle, so anyone can read it in
DevTools. Because OpenWeather, Unsplash and the AI key must stay private, Wanderly calls each API
from a **server function** (`src/lib/*.functions.js`). The browser calls our own server; the server
attaches the key and calls the third party.

```
Browser  →  server function (key added here)  →  OpenWeather / Unsplash / AI
```

Environment variables (see `.env.example`):

```
OPENWEATHER_API_KEY=...
UNSPLASH_ACCESS_KEY=...
LOVABLE_API_KEY=...
```

`.env` is listed in `.gitignore` and is never committed. On Lovable these values are stored in the
encrypted secret store; on Vercel/Netlify add them as project environment variables.

---

## How to run locally

```bash
npm install
npm run dev
```

Then open the printed local URL. Create a `.env` from `.env.example` first, or the weather/image/AI
sections will show their fallback and error states (the app still runs — it never crashes).

Build for production:

```bash
npm run build
```

---

## Screenshots

Add screenshots to a `screenshots/` folder and link them here:

| Screen | File |
| ------ | ---- |
| Home / hero | `screenshots/home.png` |
| Destination explorer (search + filters) | `screenshots/explore.png` |
| Destination details | `screenshots/details.png` |
| Weather card | `screenshots/weather.png` |
| AI assistant | `screenshots/assistant.png` |
| Day-by-day itinerary | `screenshots/itinerary.png` |

---

## Deployment

Deployed with Lovable (Publish → live URL). The same codebase deploys to Vercel or Netlify — add
the three environment variables above in the hosting dashboard before the first build.

---

## Design decisions

- **Editorial, not template.** One typeface (Manrope) at extreme weight contrast: huge tight-tracked
  headlines against small uppercase eyebrow labels.
- **Restrained palette.** Warm bone paper background, deep forest ink for primary surfaces, one clay
  accent used only for actions and highlights. Colour is never the only signal — filters and toggles
  also expose `aria-pressed`.
- **Everything is a token.** Colours, radii, shadows and motion live in `src/styles.css`; components
  never hardcode a colour value, which keeps the whole app consistent.
- **Motion supports content.** A single 600 ms rise-and-fade on entry, gentle card lift on hover, slow
  image zoom. Anything faster or louder would fight the photography. All motion respects
  `prefers-reduced-motion`.
- **States are designed, not defaults.** Skeletons match the shape of the content they replace; every
  error offers a retry; every empty state offers the next action.
- **AI output is structured.** The itinerary model is asked for strict JSON, which is validated with
  Zod on the server before rendering, so a malformed response shows a friendly retry instead of a
  wall of text or a crash.
