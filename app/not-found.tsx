import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section-shell flex min-h-screen items-center pt-24">
      <div className="section-container">
        <div className="glass-panel max-w-2xl rounded-[36px] p-10 shadow-halo">
          <p className="section-kicker">404</p>
          <h1 className="mt-6 text-4xl font-semibold text-ink">This page could not be found.</h1>
          <p className="mt-4 text-base leading-8 text-[rgb(var(--muted-ink))]">
            The page may have moved, or the link might be outdated.
          </p>
          <Link href="/" className="button-primary mt-8">
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
