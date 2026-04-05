"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "@/lib/store";
import { YieldEngineAdapter } from "@/features/adapters";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";

const schema = z.object({
  btc: z.coerce.number().min(0.0001, "Mínimo 0.0001 BTC"),
  rate: z.coerce.number().min(1, "Taxa mínima 1%").max(30, "Taxa máxima 30%"),
  duration: z.coerce.number().min(30, "Prazo mínimo 30 dias").max(365, "Prazo máximo 365 dias"),
  pin: z.string().min(4, "PIN obrigatório"),
});

type FormData = z.infer<typeof schema>;

function generateYieldTable(btc: number, rate: number, durationDays: number, btcPriceBrl: number) {
  const months = Math.min(Math.round(durationDays / 30), 12);
  const monthlyRate = rate / 100 / 12;
  const btcValueBrl = btc * btcPriceBrl;
  const rows = [];
  let accumulated = 0;
  const now = new Date();
  for (let i = 1; i <= months; i++) {
    const monthly = btcValueBrl * monthlyRate;
    accumulated += monthly;
    const date = new Date(now);
    date.setMonth(date.getMonth() + i);
    rows.push({ month: i, date: date.toLocaleDateString("pt-BR"), monthly, accumulated });
  }
  return rows;
}

export default function Page() {
  const store = useAppStore();
  const router = useRouter();
  const [preview, setPreview] = useState<ReturnType<typeof generateYieldTable>>([]);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { btc: 0.05, rate: 12, duration: 180 },
  });

  const watchedValues = watch();

  function updatePreview() {
    const { btc, rate, duration } = watchedValues;
    if (btc > 0 && rate > 0 && duration > 0) {
      setPreview(generateYieldTable(btc, rate, duration, store.btcPriceBrl));
    }
  }

  const btcVal = watchedValues.btc || 0;
  const rateVal = watchedValues.rate || 0;
  const durationVal = watchedValues.duration || 0;
  const btcValueBrl = btcVal * store.btcPriceBrl;
  const projectedYield = YieldEngineAdapter.projectedBrlYield(btcVal, rateVal, durationVal, store.btcPriceBrl);
  const vencimento = new Date();
  vencimento.setDate(vencimento.getDate() + (durationVal || 0));

  async function onSubmit(data: FormData) {
    if (data.pin !== store.pin) { toast.error("PIN inválido"); return; }
    if (data.btc > store.btcBalance) { toast.error("Saldo insuficiente no Vault"); return; }
    const id = `stk-${Date.now()}`;
    store.addStake({
      id,
      btc: data.btc,
      rate: data.rate,
      durationDays: data.duration,
      yieldProjectedBrl: projectedYield,
      yieldAccumulatedBrl: projectedYield * 0.08,
      startDate: new Date().toISOString(),
      status: "active",
    });
    toast.success("Stake criado com sucesso!");
    router.push("/app/bitcoin/stake");
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold">Novo Stake</h1>
        <p className="text-zinc-400 text-sm mt-1">Aloque BTC e receba yield em BRL</p>
      </div>

      <div className="card border border-amber-500/30 bg-amber-500/5 flex gap-3 items-start">
        <Info size={16} className="text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-zinc-300">
          Ao confirmar, seu BTC sai do Vault e fica disponível como colateral para operações RWA.
          <strong className="text-amber-300"> Taxa e prazo não podem ser alterados após a contratação.</strong>
        </p>
      </div>

      <form className="card space-y-5" onSubmit={handleSubmit(onSubmit)} onBlur={updatePreview}>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="label mb-1 block">Quantidade BTC</label>
            <input className="input" type="number" step="0.0001" {...register("btc")} />
            {errors.btc && <p className="text-red-400 text-xs mt-1">{errors.btc.message}</p>}
            <p className="text-xs text-zinc-500 mt-1">Disponível: {store.btcBalance.toFixed(6)} BTC</p>
          </div>
          <div>
            <label className="label mb-1 block">Taxa Anual (%)</label>
            <input className="input" type="number" step="0.1" {...register("rate")} />
            {errors.rate && <p className="text-red-400 text-xs mt-1">{errors.rate.message}</p>}
          </div>
          <div>
            <label className="label mb-1 block">Duração (dias)</label>
            <input className="input" type="number" {...register("duration")} />
            {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration.message}</p>}
          </div>
        </div>

        {/* Resumo */}
        {btcVal > 0 && rateVal > 0 && durationVal > 0 && (
          <div className="bg-zinc-900 rounded-xl p-4 space-y-2">
            <p className="label">Resumo da contratação</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-zinc-400">Valor alocado (BRL)</p>
                <p className="font-semibold">R$ {btcValueBrl.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-zinc-400">Yield projetado total</p>
                <p className="font-semibold text-emerald-400">R$ {projectedYield.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-zinc-400">Yield mensal estimado</p>
                <p className="font-semibold text-emerald-400">R$ {(projectedYield / Math.max(durationVal / 30, 1)).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-zinc-400">Data de vencimento</p>
                <p className="font-semibold">{vencimento.toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabela de projeção */}
        {preview.length > 0 && (
          <div>
            <p className="label mb-2">Projeção de yield mensal (BRL)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-500 text-xs border-b border-zinc-800">
                    <th className="text-left pb-2">Mês</th>
                    <th className="text-left pb-2">Data</th>
                    <th className="text-right pb-2">Yield estimado</th>
                    <th className="text-right pb-2">Acumulado</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row) => (
                    <tr key={row.month} className="border-b border-zinc-800/50">
                      <td className="py-2 text-zinc-400">{row.month}</td>
                      <td className="py-2 text-zinc-400">{row.date}</td>
                      <td className="py-2 text-right text-emerald-400">R$ {row.monthly.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="py-2 text-right">R$ {row.accumulated.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div>
          <label className="label mb-1 block">PIN de confirmação</label>
          <input className="input max-w-xs" type="password" placeholder="••••" {...register("pin")} />
          {errors.pin && <p className="text-red-400 text-xs mt-1">{errors.pin.message}</p>}
        </div>

        <button className="btn-primary w-full sm:w-auto" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Confirmando..." : "Confirmar Stake"}
        </button>
      </form>
    </div>
  );
}
