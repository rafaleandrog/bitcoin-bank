"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Shield, TrendingUp, ArrowDownLeft, Lock } from "lucide-react";

export default function Page() {
  const { btcBalance, btcPriceBrl, stakes } = useAppStore();
  const allocated = stakes.filter((s) => s.status === "active").reduce((a, b) => a + b.btc, 0);
  const total = btcBalance + allocated;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold">Vault</h1>
        <p className="text-zinc-400 text-sm mt-1">Custódia Bitcoin via Fedimint</p>
      </div>

      {/* Badge de proteção */}
      <div className="card border border-[#f7931a]/30 bg-[#f7931a]/5 flex items-center gap-3">
        <Shield size={24} className="text-[#f7931a] shrink-0" />
        <div>
          <p className="font-semibold text-[#f7931a] text-sm">Protegido pelos Guardiões da Federação</p>
          <p className="text-zinc-300 text-sm">Custódia multisig via protocolo Fedimint. Sem risco de contraparte. Seus BTC são controlados por múltiplos guardiões independentes.</p>
        </div>
      </div>

      {/* Cards de saldo */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card space-y-1">
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-zinc-400" />
            <p className="label">Total em Custódia</p>
          </div>
          <p className="text-2xl font-bold">{total.toFixed(6)} <span className="text-sm text-zinc-400">BTC</span></p>
          <p className="text-sm text-zinc-400">R$ {(total * btcPriceBrl).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</p>
        </div>

        <div className="card space-y-1">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-amber-400" />
            <p className="label">Alocado em Stake</p>
          </div>
          <p className="text-2xl font-bold text-amber-400">{allocated.toFixed(6)} <span className="text-sm text-zinc-400">BTC</span></p>
          <p className="text-sm text-zinc-400">R$ {(allocated * btcPriceBrl).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</p>
        </div>

        <div className="card space-y-1">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-emerald-400" />
            <p className="label">Disponível no Vault</p>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{btcBalance.toFixed(6)} <span className="text-sm text-zinc-400">BTC</span></p>
          <p className="text-sm text-zinc-400">R$ {(btcBalance * btcPriceBrl).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</p>
        </div>
      </div>

      {/* Explicação */}
      <div className="card bg-zinc-900/50 space-y-2">
        <p className="font-medium text-sm">Como funciona o Vault?</p>
        <ul className="text-sm text-zinc-400 space-y-1.5 list-disc list-inside">
          <li>O BTC no Vault fica sob custódia multisig da federação Fedimint</li>
          <li>Nenhuma contraparte individual tem controle dos seus fundos</li>
          <li>O Vault não gera rendimento — é poupança pura e segura</li>
          <li>Para gerar yield, aloque BTC em Stake (você escolhe taxa e prazo)</li>
        </ul>
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/app/bitcoin/stake/new" className="btn-primary flex items-center gap-2 justify-center">
          <TrendingUp size={16} />
          Alocar em Stake
        </Link>
        <Link href="/app/bitcoin/receive" className="btn-secondary flex items-center gap-2 justify-center">
          <ArrowDownLeft size={16} />
          Depositar BTC
        </Link>
      </div>
    </div>
  );
}
