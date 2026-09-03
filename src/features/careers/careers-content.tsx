import type { CultureSection, OpenRole } from "./types";

import { EmptyState } from "@/components/ui/empty-state";

type CareersContentProps = {
  readonly roles: readonly OpenRole[];
  readonly culture?: readonly CultureSection[];
};

function RoleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function CareersContent({ roles, culture = [] }: CareersContentProps) {
  return (
    <div className="grid gap-12">
      <section className="grid gap-4">
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
          Careers
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
          We are building the settlement layer for on-chain payroll. If you
          want your work to be read, reviewed, and relied on by treasuries
          around the world, you will fit in here.
        </p>
      </section>

      {culture.length > 0 ? (
        <section aria-labelledby="culture-heading" className="grid gap-6">
          <h2
            className="text-2xl font-semibold text-[var(--color-ink)]"
            id="culture-heading"
          >
            Culture and values
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {culture.map((section) => (
              <article
                className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-panel-muted)] p-6"
                key={section.id}
              >
                <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="open-roles-heading" className="grid gap-6">
        <h2
          className="text-2xl font-semibold text-[var(--color-ink)]"
          id="open-roles-heading"
        >
          Open roles
        </h2>

        {roles.length === 0 ? (
          <EmptyState
            description={
              <>
                We have no open roles right now. Send us a note at{" "}
                <a
                  className="font-medium text-[var(--color-accent)] underline"
                  href="mailto:careers@lilyprotocol.dev"
                >
                  careers@lilyprotocol.dev
                </a>{" "}
                and we will reach out when that changes.
              </>
            }
            eyebrow="No open roles"
            icon={<RoleIcon />}
            title="Nothing open at the moment"
          />
        ) : (
          <ul className="grid gap-4">
            {roles.map((role) => (
              <li
                className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-panel-solid)] p-6"
                key={role.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                      {role.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      {role.team} · {role.location}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]">
                    {role.locationType}
                  </span>
                </div>
                <a
                  className="mt-5 inline-flex items-center rounded-2xl bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-panel-contrast)] hover:opacity-90"
                  href={role.applyHref}
                >
                  Apply for this role
                  <span className="sr-only">: {role.title}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
