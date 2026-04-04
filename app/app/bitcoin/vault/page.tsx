"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
export default function Page(){const {btcBalance,stakes}=useAppStore(); const allocated=stakes.filter(s=>s.status==='active').reduce((a,b)=>a+b.btc,0); return <div className="space-y-4"><h1 className="text-3xl">Vault</h1><div className="grid md:grid-cols-3 gap-3"><div className="card"><p className="label">Total</p><p>{(btcBalance+allocated).toFixed(6)} BTC</p></div><div className="card"><p className="label">Allocated</p><p>{allocated.toFixed(6)} BTC</p></div><div className="card"><p className="label">Available</p><p>{btcBalance.toFixed(6)} BTC</p></div></div><Link href="/app/bitcoin/stake/new" className="btn-primary">Move BTC to stake</Link></div>}
