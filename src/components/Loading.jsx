import { Loader2 } from "lucide-react";

/** Inline spinner + message for any async operation. */
export function Loading({ message = "Loading...", className = "" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground ${className}`}
    >
      <Loader2 className="h-6 w-6 animate-spin text-accent" aria-hidden="true" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

/** Card-shaped skeletons used while a grid of destinations resolves. */
export function CardSkeletonGrid({ count = 8 }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="surface-card overflow-hidden">
          <div className="skeleton aspect-4/3 w-full" />
          <div className="space-y-3 p-5">
            <div className="skeleton h-5 w-2/3 rounded-md" />
            <div className="skeleton h-4 w-1/3 rounded-md" />
            <div className="skeleton h-4 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;
