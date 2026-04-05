"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Bitcoin, TrendingUp, DollarSign, ArrowDownLeft, Vault, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const { btcBalance, btcPriceBrl, brlBalance, usdtBalance, stakes, loans, activity } = useAppStore();
  const brl = btcBalance * btcPriceBrl;
  const allocatedBtc = stakes.filter((s) => s.status === "active").reduce((a, b) => a + b.btc, 0);
  const yieldAccumulated = stakes.filter((s) => s.status === "active").reduce((a, b) => a + b.yieldAccumulatedBrl, 0);
  const activeLoans = loans.filter((l) => l.status === "active").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-zinc-400 text-sm mt-1">Visão geral da sua carteira e posições</p>
      </div>

      {/* Saldos */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card space-y-2">
          <div className="flex items-center gap-2">
            <Bitcoin size={16} className="text-[#f7931a]" />
            <p className="label">Bitcoin</p>
          </div>
          <p className="text-2xl font-bold">{btcBalance.toFixed(6)}</p>
          <p className="text-zinc-400 text-sm">≈ R$ {brl.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</p>
          {allocatedBtc > 0 && (
            <p className="text-xs text-amber-400">{allocatedBtc.toFixed(6)} BTC em stake</p>
          )}
        </div>

        <div className="card space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-emerald-400" />
            <p className="label">BRL</p>
          </div>
          <p className="text-2xl font-bold">R$ {brlBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          <p className="text-zinc-400 text-sm">Saldo em reais</p>
        </div>

        <div className="card space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-blue-400" />
            <p className="label">USDT</p>
          </div>
          <p className="text-2xl font-bold">$ {usdtBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          <p className="text-zinc-400 text-sm">Saldo em dólar estável</p>
        </div>

        <div className="card space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-400" />
            <p className="label">Rendimento</p>
          </div>
          <p className="text-2xl font-bold text-emerald-400">
            R$ {yieldAccumulated.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-zinc-400 text-sm">Yield acumulado em stakes</p>
        </div>
      </div>

      {/* Ações rápidas */}
      <div>
        <p className="label mb-3">Ações rápidas</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/app/bitcoin/receive" className="card hover:border-[#f7931a]/60 transition-colors text-center py-4 space-y-2">
            <ArrowDownLeft size={22} className="mx-auto text-[#f7931a]" />
            <p className="text-sm font-medium">Receber BTC</p>
          </Link>
          <Link href="/app/bitcoin/vault" className="card hover:border-[#f7931a]/60 transition-colors text-center py-4 space-y-2">
            <Vault size={22} className="mx-auto text-zinc-300" />
            <p className="text-sm font-medium">Vault</p>
          </Link>
          <Link href="/app/bitcoin/stake" className="card hover:border-[#f7931a]/60 transition-colors text-center py-4 space-y-2">
            <TrendingUp size={22} className="mx-auto text-zinc-300" />
            <p className="text-sm font-medium">Stake</p>
          </Link>
          <Link href="/app/bitcoin/loans" className="card hover:border-[#f7931a]/60 transition-colors text-center py-4 space-y-2">
            <BarChart3 size={22} className="mx-auto text-zinc-300" />
            <p className="text-sm font-medium">Empréstimos</p>
            {activeLoans > 0 && (
              <span className="text-xs bg-[#f7931a]/20 text-[#f7931a] px-2 py-0.5 rounded-full">{activeLoans} ativo{activeLoans > 1 ? "s" : ""}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Atividade recente */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <p className="font-medium">Atividade recente</p>
          <Link href="/app/activity" className="text-xs text-[#f7931a] hover:underline">Ver tudo</Link>
        </div>
        {activity.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <p className="text-zinc-500">Nenhuma atividade ainda.</p>
            <Link href="/app/bitcoin/receive" className="text-sm text-[#f7931a] hover:underline">Receba seu primeiro BTC →</Link>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {activity.slice(0, 5).map((a) => (
              <div key={a.id} className="flex justify-between items-center py-3">
                <div>
                  <p className="text-sm">{a.desc}</p>
                  <p className="text-xs text-zinc-500">{new Date(a.at).toLocaleString("pt-BR")}</p>
                </div>
                <span className={`text-sm font-medium ${a.amount.startsWith("+") ? "text-emerald-400" : "text-zinc-300"}`}>{a.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
