import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 md:p-16 bg-gradient-to-b from-zinc-950 to-bg">
      <div className="max-w-5xl mx-auto space-y-6">
        <p className="text-accent tracking-[0.3em] uppercase text-xs">Institutional Bitcoin Banking</p>
        <h1 className="text-5xl font-semibold">FediBank v1.0</h1>
        <p className="text-zinc-300 max-w-2xl">Wallet Bitcoin, lending colateralizado em BTC, staking com rendimento em BRL e marketplace RWA (coming soon) com experiência premium.</p>
        <div className="flex gap-3">
          <Link href="/onboarding" className="btn-primary">Start onboarding</Link>
          <Link href="/auth/login" className="btn-secondary">Login</Link>
        </div>
      </div>
    </div>
  );
}
