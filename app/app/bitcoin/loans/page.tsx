"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { RuleBanner } from "@/components/rule-banner";

export default function Page(){const {offers,loans}=useAppStore(); return <div className="space-y-4"><h1 className="text-3xl">Loans Marketplace</h1><RuleBanner/><div className="flex gap-3"><Link href="/app/bitcoin/loans/lend/new" className="btn-secondary">Create lend offer</Link></div><div className="grid md:grid-cols-2 gap-3">{offers.map(o=><Link href={`/app/bitcoin/loans/borrow/${o.id}`} key={o.id} className="card block"><p className="font-medium">Offer {o.id}</p><p>{o.type} • APR {o.apr}% • {o.durationDays} dias</p><p>R$ {o.minBrl} - {o.maxBrl}</p></Link>)}</div><div className="card"><p className="font-medium mb-2">Active loans</p>{loans.map(l=><div key={l.id} className="py-1">{l.id} - {l.type} - LTV {l.ltv.toFixed(1)}%</div>)}{loans.length===0&&<p className="text-zinc-400">No active loans</p>}</div></div>}
