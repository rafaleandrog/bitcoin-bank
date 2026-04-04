import Link from "next/link";
export default function Onboarding() {
  return <div className="p-8 space-y-4"><h1 className="text-3xl font-semibold">Onboarding</h1><p className="text-zinc-300">Join a federation first to unlock the app.</p><Link href="/join" className="btn-primary">Join Federation</Link></div>;
}
