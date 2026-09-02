/**
 * Region filter pills. Uses aria-pressed so the active state is not
 * communicated by colour alone.
 */
export default function FilterButtons({ options, value, onChange, label = "Filter by region" }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              active
                ? "border-primary bg-primary text-primary-foreground shadow-card"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
