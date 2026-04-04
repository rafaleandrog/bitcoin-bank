"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/app", "Dashboard"], ["/app/bitcoin", "Bitcoin"], ["/app/bitcoin/loans", "Loans"], ["/app/activity", "Activity"], ["/app/security/proof-of-reserves", "Proof"], ["/app/rwa", "RWA"], ["/app/settings", "Settings"]
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="border-r border-zinc-800 p-5 space-y-2 bg-black/40">
        <h1 className="text-xl font-semibold text-accent">FediBank v1.0</h1>
        {links.map(([href, label]) => (
          <Link key={href} href={href} className={`block rounded-lg px-3 py-2 text-sm ${pathname === href || pathname.startsWith(href + "/") ? "bg-accent text-black" : "text-zinc-300 hover:bg-zinc-900"}`}>{label}</Link>
        ))}
      </aside>
      <main className="p-6 space-y-6">{children}</main>
    </div>
  );
}
