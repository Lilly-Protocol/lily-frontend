"use client";

import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-[var(--color-surface)] text-[var(--color-ink)]">
        <GlobalErrorPanel error={error} reset={reset} />
      </body>
    </html>
  );
}

export function GlobalErrorPanel({ error, reset }: GlobalErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="surface w-full max-w-xl rounded-[1.75rem] p-8 text-center sm:p-10">
        <p className="eyebrow text-[var(--color-accent)]">Application error</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--color-ink)] sm:text-4xl">
          The Lily workspace could not finish loading.
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
          Try reloading the app. If this keeps happening, share the error digest
          with the project maintainers.
        </p>

        {error.digest && (
          <p className="mt-6 rounded-[0.875rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3 font-mono text-sm text-[var(--color-muted)]">
            Digest: {error.digest}
          </p>
        )}

        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#115e59] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
