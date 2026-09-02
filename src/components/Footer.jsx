export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-page flex flex-col gap-3 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-eyebrow text-foreground">Wanderly</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover the world. Plan your next adventure.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Photos by Unsplash · Weather by OpenWeather · Itineraries by AI
        </p>
      </div>
    </footer>
  );
}
