"use client";
import { ShieldCheck } from "lucide-react";

export function RuleBanner() {
  return (
    <div className="card border-l-4 border-l-[#f7931a] bg-amber-500/10 flex gap-3 items-start">
      <ShieldCheck className="text-[#f7931a] mt-0.5 shrink-0" size={20} />
      <div>
        <p className="font-semibold text-amber-300 text-sm">Regra de Proteção do Colateral</p>
        <p className="text-zinc-200 text-sm mt-0.5">
          Seu BTC <strong>não será liquidado</strong> por queda de preço.
          O colateral é executado apenas em caso de inadimplência.
          Variações de preço afetam apenas juros, parcelas e projeções.
        </p>
      </div>
    </div>
  );
}
