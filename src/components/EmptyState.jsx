import { Compass } from "lucide-react";

/** Reusable empty state (no results, nothing generated yet, etc.). */
export default function EmptyState({
  icon: Icon = Compass,
  title = "Nothing here yet",
  message,
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-secondary/50 px-6 py-14 text-center ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-accent shadow-card">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      {message ? <p className="max-w-sm text-sm text-muted-foreground">{message}</p> : null}
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
