/**
 * Renders a validated itinerary object as a readable day-by-day timeline.
 * Purely presentational — it never talks to the AI service itself.
 */
export default function Itinerary({ itinerary }) {
  if (!itinerary?.days?.length) return null;

  return (
    <div className="animate-fade mt-10">
      <h3 className="text-2xl font-extrabold text-foreground md:text-3xl">
        {itinerary.days.length}-day {itinerary.destination} itinerary
      </h3>

      <ol className="mt-8 space-y-6">
        {itinerary.days.map((day) => (
          <li key={day.day} className="surface-card overflow-hidden">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border bg-secondary/50 px-6 py-4">
              <p className="text-eyebrow text-accent">Day {day.day}</p>
              <h4 className="text-lg font-extrabold text-foreground">{day.title}</h4>
            </div>

            <ul className="divide-y divide-border">
              {day.activities?.map((activity, index) => (
                <li key={index} className="flex gap-5 px-6 py-4">
                  <time className="w-14 shrink-0 pt-0.5 text-sm font-extrabold tabular-nums text-accent">
                    {activity.time}
                  </time>
                  <div>
                    <p className="text-sm font-bold text-foreground">{activity.activity}</p>
                    {activity.description ? (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {activity.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
