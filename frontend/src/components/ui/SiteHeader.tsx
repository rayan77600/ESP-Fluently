import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand">
          Fluently
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link href="/" className="rounded-lg px-3 py-2 hover:bg-brand-soft">
            Événements
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-brand px-3 py-2 text-white hover:bg-brand-hover"
          >
            S&apos;inscrire
          </Link>
        </nav>
      </div>
    </header>
  );
}
