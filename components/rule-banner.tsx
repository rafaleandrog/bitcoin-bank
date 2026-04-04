export function RuleBanner() {
  return (
    <div className="card border-accent/60 bg-amber-500/10 text-sm">
      <p className="font-semibold text-amber-300">Regra de Colateral (Obrigatória)</p>
      <p className="text-zinc-200">Não há liquidação automática por variação de preço do BTC. O colateral só é executado em caso de inadimplência. Preço do BTC afeta apenas juros, parcelas e projeções.</p>
    </div>
  );
}
