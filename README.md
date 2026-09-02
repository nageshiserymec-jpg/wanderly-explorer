# Wanderly

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

> **Discover the world. Plan your next adventure.**

Wanderly is a polished, responsive travel web application for exploring destinations, checking live weather, discovering famous places, and generating AI-written, day-by-day travel itineraries.

![Wanderly Preview](./screenshots/home.png)

---

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [APIs & Security](#apis--security)
- [Design Decisions](#design-decisions)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

- **Destination Explorer** — Browse a curated set of 8 destinations across Asia, Europe, the Middle East, and America.
- **Smart Search** — Search destinations by city, country, or region.
- **Region Filtering** — Filter pills that combine with the search term in real time.
- **Destination Details** — Dedicated page per destination at `/destination/:destinationId`.
- **Famous Places** — Image-led cards with category, description, and expandable text.
- **Location Awareness** — Browser Geolocation detects your city and loads its weather automatically.
- **Manual Location Search** — Search any city; works even if location permission is denied.
- **Real-Time Weather** — Temperature, feels-like, condition, humidity, and wind speed.
- **Dynamic Images** — Every photo is fetched at runtime from Unsplash (no hardcoded image URLs).
- **AI Travel Assistant** — Ask anything about the current destination in a chat interface.
- **AI Itinerary Generation** — Structured JSON itinerary turned into a readable day-by-day timeline.
- **Loading, Error & Empty States** — Designed for every async operation.
- **Responsive Design** — 1 / 2 / 4 cards per row on mobile / tablet / desktop.
- **Accessibility** — Semantic HTML, alt text, labelled inputs, visible focus rings, and `aria-pressed` states.

---

## Live Demo

- **Preview URL:** https://id-preview--24734e67-4545-47cc-b7f1-cd577aa11b38.lovable.app
- **Published URL:** *(not published yet)*

---

## Tech Stack

| Layer        | Technology                                              |
|--------------|---------------------------------------------------------|
| UI Library   | React 19                                                |
| Build Tool   | Vite 7                                                  |
| Routing      | TanStack Router (file-based routes)                     |
| Server       | TanStack Start (`createServerFn`)                       |
| Data Fetching| TanStack Query                                          |
| Styling      | Tailwind CSS v4 + custom CSS design tokens              |
| Icons        | Lucide React                                            |
| Weather      | OpenWeather API                                         |
| Images       | Unsplash API                                            |
| AI           | Google Gemini via Lovable AI Gateway                    |

> **Note on routing:** The original assessment suggested React Router. This project uses TanStack Router, which applies the same core concepts (route files, URL params, `<Link>`, loaders) with a file-based routing convention.

---

## Project Structure

```
wanderly/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterButtons.jsx
│   │   ├── DestinationCard.jsx
│   │   ├── FamousPlaceCard.jsx
│   │   ├── RemoteImage.jsx
│   │   ├── DestinationExplorer.jsx
│   │   ├── ChatBot.jsx
│   │   ├── Itinerary.jsx
│   │   ├── ItineraryPlanner.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── LocationWeather.jsx
│   │   ├── DestinationWeather.jsx
│   │   ├── Loading.jsx
│   │   ├── ErrorState.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── routes/             # Pages (file-based routing)
│   │   ├── __root.tsx      # Shared layout: navbar + footer + head metadata
│   │   ├── index.jsx       # Home page
│   │   └── destination.$destinationId.jsx  # Destination detail page
│   │
│   ├── services/           # Client-side API layer
│   │   ├── weatherApi.js
│   │   ├── imageApi.js
│   │   └── geminiApi.js
│   │
│   ├── lib/                # Server-side API proxies (API keys live here)
│   │   ├── weather.functions.js
│   │   ├── images.functions.js
│   │   └── ai.functions.js
│   │
│   ├── data/
│   │   └── destinations.js  # Curated destination dataset
│   │
│   ├── styles.css          # Design system tokens
│   └── router.tsx          # TanStack Router setup
│
├── .env.example            # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/wanderly.git
   cd wanderly
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example` and add your API keys:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the printed local URL in your browser.

---

## Environment Variables

Create a `.env` file in the project root and add the following:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
LOVABLE_API_KEY=your_lovable_api_key
```

| Variable              | Source                                                | Purpose                          |
|-----------------------|-------------------------------------------------------|----------------------------------|
| `OPENWEATHER_API_KEY` | [OpenWeather](https://openweathermap.org/api)         | Fetch live weather data          |
| `UNSPLASH_ACCESS_KEY` | [Unsplash Developer](https://unsplash.com/developers) | Fetch dynamic destination images |
| `LOVABLE_API_KEY`     | Lovable AI Gateway                                    | Power AI assistant & itinerary   |

> `.env` is listed in `.gitignore` and must never be committed.

---

## Available Scripts

| Script            | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the production build locally |
| `npm run test`    | Run the test suite                   |

---

## APIs & Security

**No API key is ever shipped to the browser.**

Vite variables prefixed with `VITE_` are inlined into the client bundle, making them readable in DevTools. Because OpenWeather, Unsplash, and AI keys must stay private, Wanderly calls each API from a **server function** (`src/lib/*.functions.js`). The browser calls our own server endpoint; the server attaches the key and forwards the request to the third-party provider.

```
Browser  →  Server Function (key added here)  →  OpenWeather / Unsplash / AI Gateway
```

---

## Design Decisions

- **Editorial, not template.** One typeface (Manrope) at extreme weight contrast: huge tight-tracked headlines against small uppercase eyebrow labels.
- **Restrained palette.** Warm bone paper background, deep forest ink for primary surfaces, one clay accent used only for actions and highlights. Colour is never the only signal — filters and toggles also expose `aria-pressed`.
- **Everything is a token.** Colours, radii, shadows, and motion live in `src/styles.css`; components never hardcode a colour value, keeping the whole app consistent.
- **Motion supports content.** A single 600 ms rise-and-fade on entry, gentle card lift on hover, slow image zoom. All motion respects `prefers-reduced-motion`.
- **States are designed, not defaults.** Skeletons match the shape of the content they replace; every error offers a retry; every empty state offers the next action.
- **AI output is structured.** The itinerary model returns strict JSON, which is validated with Zod on the server before rendering, so a malformed response shows a friendly retry instead of a crash.

---

## Screenshots

Add screenshots to a `screenshots/` folder and link them here:

| Screen                                  | File                           |
|-----------------------------------------|--------------------------------|
| Home / Hero                             | `screenshots/home.png`           |
| Destination Explorer (search + filters) | `screenshots/explore.png`        |
| Destination Details                     | `screenshots/details.png`        |
| Weather Card                            | `screenshots/weather.png`        |
| AI Assistant                            | `screenshots/assistant.png`      |
| Day-by-Day Itinerary                    | `screenshots/itinerary.png`      |

---

## Deployment

### Lovable

Click **Publish** in the Lovable editor to deploy the live preview.

### Vercel / Netlify / Other

1. Push the repository to GitHub.
2. Import the project into your hosting provider.
3. Add the three environment variables from [Environment Variables](#environment-variables) in the hosting dashboard.
4. Deploy.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a Pull Request.

Please ensure your code follows the existing style and passes all checks.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Nagesh Gorte**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

> Built with care for a frontend developer assessment. Clean, maintainable, and interview-ready.
