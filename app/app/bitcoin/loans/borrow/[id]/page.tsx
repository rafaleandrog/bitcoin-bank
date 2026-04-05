"use client";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import {
  calcLtv,
  canExtendBullet,
  calcAmortizationTable,
  calcInterestOnlyPreview,
  calcBulletPreview,
} from "@/lib/loan";
import { useState, useMemo } from "react";
import { RuleBanner } from "@/components/rule-banner";
import { toast } from "sonner";
import { Info, CheckCircle, AlertCircle, XCircle } from "lucide-react";

function LtvIndicator({ ltv }: { ltv: number }) {
  const color = ltv <= 50 ? "text-emerald-400" : ltv <= 80 ? "text-amber-400" : "text-red-400";
  const bg = ltv <= 50 ? "bg-emerald-400" : ltv <= 80 ? "bg-amber-400" : "bg-red-400";
  const label = ltv <= 50 ? "Saudável" : ltv <= 80 ? "Moderado" : "Alto";
  const Icon = ltv <= 50 ? CheckCircle : ltv <= 80 ? AlertCircle : XCircle;

  return (
    <div className="card bg-zinc-900/60 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} className={color} />
          <span className={`font-bold text-lg ${color}`}>{ltv.toFixed(1)}%</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${color} bg-current/10`} style={{ backgroundColor: "transparent" }}>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ltv <= 50 ? "bg-emerald-400/15 text-emerald-400" : ltv <= 80 ? "bg-amber-400/15 text-amber-400" : "bg-red-400/15 text-red-400"}`}>{label}</span>
          </span>
        </div>
        <span className="text-xs text-zinc-500">máx. 100%</span>
      </div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full ${bg} rounded-full transition-all`} style={{ width: `${Math.min(ltv, 100)}%` }} />
      </div>
      <p className="text-xs text-zinc-400">
        Preço do BTC afeta parcelas e projeções — <strong className="text-zinc-200">não dispara liquidação</strong>.
      </p>
    </div>
  );
}

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const store = useAppStore();
  const offer = store.offers.find((o) => o.id === id);

  const [amount, setAmount] = useState(offer?.minBrl ?? 5000);
  const [btc, setBtc] = useState(0.05);
  const [pin, setPin] = useState("");

  if (!offer) return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Oferta não encontrada</h1>
      <button className="btn-secondary" onClick={() => router.back()}>Voltar</button>
    </div>
  );

  const ltv = calcLtv(amount, btc, store.btcPriceBrl);

  const typeLabel: Record<string, string> = {
    amortizing: "Amortização Padrão",
    interest_only: "Juros + Balloon",
    bullet: "Bullet (sem parcelas)",
  };

  const typeBadgeColor: Record<string, string> = {
    amortizing: "bg-blue-400/15 text-blue-400",
    interest_only: "bg-purple-400/15 text-purple-400",
    bullet: "bg-amber-400/15 text-amber-400",
  };

  // Projeções
  const amortRows = useMemo(
    () => (offer.type === "amortizing" ? calcAmortizationTable(amount, offer.apr, offer.durationDays) : []),
    [amount, offer.apr, offer.durationDays, offer.type]
  );
  const interestPreview = useMemo(
    () => (offer.type === "interest_only" ? calcInterestOnlyPreview(amount, offer.apr, offer.durationDays) : null),
    [amount, offer.apr, offer.durationDays, offer.type]
  );
  const bulletPreview = useMemo(
    () => (offer.type === "bullet" ? calcBulletPreview(amount, offer.apr, offer.durationDays) : null),
    [amount, offer.apr, offer.durationDays, offer.type]
  );

  function handleConfirm() {
    if (pin !== store.pin) { toast.error("PIN inválido"); return; }
    if (ltv > 100) { toast.error("LTV excede o máximo de 100%"); return; }
    if (amount < offer.minBrl || amount > offer.maxBrl) {
      toast.error(`Valor deve estar entre R$ ${offer.minBrl.toLocaleString("pt-BR")} e R$ ${offer.maxBrl.toLocaleString("pt-BR")}`);
      return;
    }
    store.addLoan({
      id: `loan-${Date.now()}`,
      offerId: offer.id,
      borrowedBrl: amount,
      collateralBtc: btc,
      ltv,
      type: offer.type,
      apr: offer.apr,
      durationDays: offer.durationDays,
      startDate: new Date().toISOString(),
      status: "active",
    });
    toast.success("Contrato de empréstimo criado com sucesso!");
    router.push("/app/bitcoin/loans");
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold">Contratar Empréstimo</h1>
        <div className="flex items-center gap-3 mt-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeBadgeColor[offer.type]}`}>
            {typeLabel[offer.type]}
          </span>
          <span className="text-sm text-zinc-400">{offer.apr}% a.a. · {offer.durationDays} dias</span>
        </div>
      </div>

      <RuleBanner />

      {/* Inputs */}
      <div className="card space-y-4">
        <p className="font-medium">Configurar operação</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label mb-1 block">Valor do empréstimo (BRL)</label>
            <input
              className="input"
              type="number"
              value={amount}
              min={offer.minBrl}
              max={offer.maxBrl}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <p className="text-xs text-zinc-500 mt-1">
              R$ {offer.minBrl.toLocaleString("pt-BR")} – R$ {offer.maxBrl.toLocaleString("pt-BR")}
            </p>
          </div>
          <div>
            <label className="label mb-1 block">Colateral BTC</label>
            <input
              className="input"
              type="number"
              value={btc}
              min={0.0001}
              step={0.0001}
              onChange={(e) => setBtc(Number(e.target.value))}
            />
            <p className="text-xs text-zinc-500 mt-1">
              Valor: R$ {(btc * store.btcPriceBrl).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <LtvIndicator ltv={ltv} />
      </div>

      {/* Painel de projeção por tipo */}
      {offer.type === "amortizing" && amortRows.length > 0 && (
        <div className="card space-y-3">
          <div>
            <p className="font-medium">Amortização Padrão — Parcelas mensais desde o início</p>
            <p className="text-sm text-zinc-400 mt-0.5">Sistema SAC — amortização constante do principal + juros sobre o saldo devedor.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-xs border-b border-zinc-800">
                  <th className="text-left pb-2">Parc.</th>
                  <th className="text-left pb-2">Venc.</th>
                  <th className="text-right pb-2">Amort.</th>
                  <th className="text-right pb-2">Juros</th>
                  <th className="text-right pb-2">Total</th>
                  <th className="text-right pb-2">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {amortRows.slice(0, 6).map((row) => (
                  <tr key={row.installment} className="border-b border-zinc-800/50">
                    <td className="py-2 text-zinc-400">{row.installment}</td>
                    <td className="py-2 text-zinc-400">{row.dueDate}</td>
                    <td className="py-2 text-right">R$ {row.principal.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</td>
                    <td className="py-2 text-right text-amber-400">R$ {row.interest.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</td>
                    <td className="py-2 text-right font-medium">R$ {row.total.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</td>
                    <td className="py-2 text-right text-zinc-400">R$ {row.balance.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {amortRows.length > 6 && (
              <p className="text-xs text-zinc-500 mt-2 text-center">+ {amortRows.length - 6} parcelas restantes</p>
            )}
          </div>
        </div>
      )}

      {offer.type === "interest_only" && interestPreview && (
        <div className="card space-y-4">
          <div>
            <p className="font-medium">Juros + Balloon — Pague apenas os juros durante o período</p>
            <p className="text-sm text-zinc-400 mt-0.5">Parcelas mensais apenas de juros. Principal pago integralmente no vencimento.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-900 rounded-lg p-3">
              <p className="text-xs text-zinc-400">Parcela mensal (juros)</p>
              <p className="font-bold text-amber-400">R$ {interestPreview.monthlyInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-3">
              <p className="text-xs text-zinc-400">Período</p>
              <p className="font-bold">{interestPreview.months} meses</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-3">
              <p className="text-xs text-zinc-400">Balloon final (principal)</p>
              <p className="font-bold text-red-400">R$ {interestPreview.balloonPayment.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-3">
              <p className="text-xs text-zinc-400">Total pago</p>
              <p className="font-bold">R$ {interestPreview.totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <Info size={14} className="text-purple-400 mt-0.5 shrink-0" />
            <p className="text-xs text-zinc-300">Ideal para quem quer preservar liquidez durante o prazo e realizar um único pagamento grande ao final.</p>
          </div>
        </div>
      )}

      {offer.type === "bullet" && bulletPreview && (
        <div className="card space-y-4">
          <div>
            <p className="font-medium">Bullet — Sem pagamentos até o vencimento</p>
            <p className="text-sm text-zinc-400 mt-0.5">Modelo Ledn. Nenhum pagamento obrigatório durante o prazo. Tudo pago ao vencimento.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900 rounded-lg p-3">
              <p className="text-xs text-zinc-400">Principal</p>
              <p className="font-bold">R$ {bulletPreview.principal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-3">
              <p className="text-xs text-zinc-400">Juros acumulados</p>
              <p className="font-bold text-amber-400">R$ {bulletPreview.accruedInterest.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-3">
              <p className="text-xs text-zinc-400">Total no vencimento</p>
              <p className="font-bold text-lg">R$ {bulletPreview.totalDue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-3">
              <p className="text-xs text-zinc-400">Data de vencimento</p>
              <p className="font-bold">{bulletPreview.dueDate}</p>
            </div>
          </div>
          <div className={`flex items-start gap-2 rounded-lg p-3 border ${canExtendBullet(ltv) ? "bg-emerald-500/10 border-emerald-500/20" : "bg-zinc-800 border-zinc-700"}`}>
            {canExtendBullet(ltv) ? (
              <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle size={14} className="text-amber-400 mt-0.5 shrink-0" />
            )}
            <div className="text-xs">
              <p className={`font-medium ${canExtendBullet(ltv) ? "text-emerald-400" : "text-amber-400"}`}>
                Extensão de prazo: {canExtendBullet(ltv) ? "disponível" : "não disponível"}
              </p>
              <p className="text-zinc-400 mt-0.5">
                {canExtendBullet(ltv)
                  ? "Seu LTV está abaixo de 50%. Você poderá solicitar extensão de prazo antes do vencimento."
                  : `LTV atual de ${ltv.toFixed(1)}% está acima de 50%. Extensão só é permitida com LTV ≤ 50%.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PIN e confirmação */}
      <div className="card space-y-4">
        <div>
          <label className="label mb-1 block">PIN de confirmação</label>
          <input
            className="input max-w-xs"
            type="password"
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="btn-primary flex-1 sm:flex-none sm:px-8"
            onClick={handleConfirm}
            disabled={ltv > 100 || pin.length < 4}
          >
            Confirmar Contrato
          </button>
          <button className="btn-secondary" onClick={() => router.back()}>Cancelar</button>
        </div>

        {ltv > 100 && (
          <p className="text-xs text-red-400 flex items-center gap-1.5">
            <XCircle size={12} />
            LTV acima de 100% — aumente o colateral ou reduza o valor solicitado
          </p>
        )}
      </div>
    </div>
  );
}
