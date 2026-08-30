import type { RouteScaffold } from "@/types/site";

type PageScaffoldProps = {
  readonly route: RouteScaffold;
  readonly dynamicLabel?: string;
};

export function PageScaffold({ route, dynamicLabel }: PageScaffoldProps) {
  return (
    <main className="surface rounded-[1.75rem] p-8 sm:p-10">
      <p className="eyebrow text-[var(--color-accent)]">{route.section}</p>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-tight break-words">{route.title}</h1>
          <p className="mt-4 max-w-3xl text-[clamp(1rem,2.5vw,1.125rem)] leading-8 text-[var(--color-muted)] break-words">
            {route.purpose}
          </p>
        </div>
        <div className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3 font-mono text-sm text-[var(--color-muted)] break-all">
          {dynamicLabel ?? route.path}
        </div>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <article className="min-w-0 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] p-6">
          <h2 className="text-xl font-semibold">Contributor implementation note</h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-muted)] break-words">
            This route is intentionally scaffolded. Contributors should implement
            the real experience from the approved Figma design rather than reuse
            removed demo content.
          </p>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted)] break-words">
            {route.figmaScope}
          </p>
        </article>

        <article className="min-w-0 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] p-6">
          <h2 className="text-xl font-semibold">Natural issue slices</h2>
          <ul className="mt-4 grid gap-3">
            {route.implementationAreas.map((area) => (
              <li
                key={area}
                className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-muted)] break-words"
              >
                {area}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
