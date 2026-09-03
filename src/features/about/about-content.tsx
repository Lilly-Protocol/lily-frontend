import {
  aboutSections,
  aboutValues,
  ecosystemEntries,
  missionStatement,
} from "./about-data";

export function AboutContent() {
  return (
    <div className="flex flex-col gap-12">
      <section aria-labelledby="about-mission-heading">
        <h2 className="eyebrow" id="about-mission-heading">
          Mission
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-ink)]">
          {missionStatement}
        </p>
      </section>

      <section aria-labelledby="about-values-heading">
        <h2 className="eyebrow" id="about-values-heading">
          Values
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {aboutValues.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-2 rounded-2xl border border-(--color-line) bg-(--color-panel-muted) p-5"
            >
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                {value.title}
              </p>
              <p className="text-sm text-[var(--color-muted)]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="about-ecosystem-heading">
        <h2 className="eyebrow" id="about-ecosystem-heading">
          Ecosystem
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {ecosystemEntries.map((entry) => (
            <div
              key={entry.name}
              className="flex flex-col gap-2 rounded-2xl border border-(--color-line) bg-(--color-panel-muted) p-5"
            >
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                {entry.name}
              </p>
              <p className="text-sm text-[var(--color-muted)]">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export { aboutSections };
