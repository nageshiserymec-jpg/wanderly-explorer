import { AlertTriangle, RotateCw } from "lucide-react";

/** Intentional, reusable error UI with an optional retry action. */
export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again in a moment.",
  actionLabel = "Try Again",
  onAction,
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-secondary/60 px-6 py-10 text-center ${className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
        >
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
