"use client";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import { useState } from "react";
import { TrendingUp, Calendar, Bitcoin, Percent } from "lucide-react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { stakes, closeStake } = useAppStore();
  const router = useRouter();
  const [confirmClose, setConfirmClose] = useState(false);
  const stake = stakes.find((s) => s.id === id);

  if (!stake) return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Stake não encontrado</h1>
      <button className="btn-secondary" onClick={() => router.back()}>Voltar</button>
    </div>
  );

  const progressPct = Math.min((stake.yieldAccumulatedBrl / stake.yieldProjectedBrl) * 100, 100);
  const startDate = stake.startDate ? new Date(stake.startDate) : new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + stake.durationDays);
  const daysTotal = stake.durationDays;
  const now = new Date();
  const daysElapsed = Math.max(0, Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, daysTotal - daysElapsed);

  // Mini gráfico SVG inline
  const svgPoints = Array.from({ length: 10 }, (_, i) => {
    const x = (i / 9) * 260;
    const yieldFrac = (i / 9) * progressPct / 100;
    const y = 50 - yieldFrac * 40;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Stake #{stake.id.split("-")[1]}</h1>
          <p className="text-zinc-400 text-sm mt-1">{stake.id}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${stake.status === "active" ? "bg-emerald-400/15 text-emerald-400" : "bg-zinc-700 text-zinc-400"}`}>
          {stake.status === "active" ? "Ativo" : "Encerrado"}
        </span>
      </div>

      {/* Cards de informação */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card space-y-1">
          <div className="flex items-center gap-1.5">
            <Bitcoin size={13} className="text-[#f7931a]" />
            <p className="label text-[10px]">BTC Alocado</p>
          </div>
          <p className="font-bold">{stake.btc.toFixed(6)}</p>
        </div>
        <div className="card space-y-1">
          <div className="flex items-center gap-1.5">
            <Percent size={13} className="text-amber-400" />
            <p className="label text-[10px]">Taxa a.a.</p>
          </div>
          <p className="font-bold">{stake.rate}%</p>
        </div>
        <div className="card space-y-1">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-zinc-400" />
            <p className="label text-[10px]">Prazo restante</p>
          </div>
          <p className="font-bold">{daysRemaining} dias</p>
        </div>
        <div className="card space-y-1">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-zinc-400" />
            <p className="label text-[10px]">Vencimento</p>
          </div>
          <p className="font-bold text-sm">{endDate.toLocaleDateString("pt-BR")}</p>
        </div>
      </div>

      {/* Seção de yield */}
      <div className="card space-y-4">
        <p className="font-medium">Rendimento (BRL)</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="label text-xs">Yield Acumulado</p>
            <p className="text-2xl font-bold text-emerald-400">
              R$ {stake.yieldAccumulatedBrl.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="label text-xs">Yield Projetado Total</p>
            <p className="text-2xl font-bold">
              R$ {stake.yieldProjectedBrl.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Barra de progresso */}
        <div>
          <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
            <span>{progressPct.toFixed(1)}% concluído</span>
            <span>{daysElapsed} de {daysTotal} dias</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#f7931a] to-amber-400 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Mini gráfico SVG */}
        <div>
          <p className="label text-xs mb-2">Acumulação de yield</p>
          <svg viewBox="0 0 260 55" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="yieldGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f7931a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <polyline
              points={svgPoints}
              fill="none"
              stroke="url(#yieldGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ponto atual */}
            <circle
              cx={(daysElapsed / daysTotal) * 260}
              cy={50 - (progressPct / 100) * 40}
              r="4"
              fill="#f7931a"
            />
          </svg>
        </div>
      </div>

      {/* Ações */}
      {stake.status === "active" && (
        <div>
          {!confirmClose ? (
            <button className="btn-secondary" onClick={() => setConfirmClose(true)}>
              Encerrar Stake Antecipadamente
            </button>
          ) : (
            <div className="card border border-red-500/30 bg-red-500/5 space-y-3">
              <p className="text-sm font-medium text-red-300">Confirmar encerramento antecipado?</p>
              <p className="text-xs text-zinc-400">O yield acumulado até o momento será creditado. A posição será encerrada e o BTC retornará ao Vault.</p>
              <div className="flex gap-3">
                <button
                  className="btn-secondary border-red-500/50 text-red-300"
                  onClick={() => {
                    closeStake(stake.id);
                    toast.success("Stake encerrado. BTC retornou ao Vault.");
                    router.push("/app/bitcoin/stake");
                  }}
                >
                  Confirmar encerramento
                </button>
                <button className="btn-secondary" onClick={() => setConfirmClose(false)}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
