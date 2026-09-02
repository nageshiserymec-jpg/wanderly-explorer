import { Search, X } from "lucide-react";

/**
 * Reusable, accessible search input.
 * `tone="dark"` is used over the hero video, `tone="light"` on paper sections.
 */
export default function SearchBar({
  id,
  label,
  placeholder = "Search destinations...",
  value,
  onChange,
  onSubmit,
  tone = "light",
  action,
}) {
  const dark = tone === "dark";

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(value);
      }}
      className={`flex w-full flex-col gap-3 rounded-2xl p-2 sm:flex-row sm:items-center ${
        dark
          ? "border border-on-dark/25 bg-ink/35 backdrop-blur-md"
          : "surface-card shadow-card"
      }`}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <div className="flex flex-1 items-center gap-3 px-3">
        <Search
          className={`h-5 w-5 shrink-0 ${dark ? "text-on-dark-muted" : "text-muted-foreground"}`}
          aria-hidden="true"
        />
        <input
          id={id}
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`h-11 w-full bg-transparent text-base outline-none ${
            dark
              ? "text-on-dark placeholder:text-on-dark-muted"
              : "text-foreground placeholder:text-muted-foreground"
          }`}
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className={`rounded-full p-1 transition-colors ${
              dark
                ? "text-on-dark-muted hover:text-on-dark"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {action ? (
        <button
          type="submit"
          className="h-11 shrink-0 rounded-xl bg-accent px-7 text-sm font-bold tracking-wide text-accent-foreground transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
        >
          {action}
        </button>
      ) : null}
    </form>
  );
}
