"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
export default function Page(){const {stakes}=useAppStore(); return <div className="space-y-4"><h1 className="text-3xl">Stake (yield em BRL)</h1><Link href="/app/bitcoin/stake/new" className="btn-primary">Create stake</Link><div className="space-y-3">{stakes.map(s=><Link href={`/app/bitcoin/stake/${s.id}`} key={s.id} className="card block"><p>{s.id} • {s.status}</p><p>{s.btc} BTC • {s.rate}% • {s.durationDays} dias</p><p>Yield proj. R$ {s.yieldProjectedBrl.toFixed(2)} / acum. R$ {s.yieldAccumulatedBrl.toFixed(2)}</p></Link>)}{stakes.length===0&&<div className="card">No stakes yet.</div>}</div></div>}
