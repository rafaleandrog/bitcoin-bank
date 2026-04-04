"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";

export default function Dashboard() {
  const { btcBalance, btcPriceBrl, stakes, loans, activity } = useAppStore();
  const brl = btcBalance * btcPriceBrl;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card"><p className="label">BTC Balance</p><p className="text-2xl">{btcBalance.toFixed(6)} BTC</p><p className="text-zinc-400">R$ {brl.toLocaleString('pt-BR')}</p></div>
        <Link className="card" href="/app/bitcoin/vault"><p className="label">Vault</p><p>{btcBalance.toFixed(4)} BTC disponível</p></Link>
        <Link className="card" href="/app/bitcoin/stake"><p className="label">Stake</p><p>{stakes.length} posições</p></Link>
        <Link className="card" href="/app/bitcoin/loans"><p className="label">Loans</p><p>{loans.length} contratos ativos</p></Link>
      </div>
      <div className="card"><p className="font-medium mb-3">Recent activity</p>{activity.slice(0,5).map(a=><div className="flex justify-between py-2 border-b border-zinc-800" key={a.id}><span>{a.desc}</span><span>{a.amount}</span></div>)}</div>
    </div>
  );
}
