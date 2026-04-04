export function calcLtv(loanBrl: number, collateralBtc: number, btcPriceBrl: number) {
  if (collateralBtc <= 0 || btcPriceBrl <= 0) return 0;
  return (loanBrl / (collateralBtc * btcPriceBrl)) * 100;
}

export function canExtendBullet(ltv: number) {
  return ltv <= 50;
}

export function loanRuleLabel() {
  return "Sem liquidação por variação de preço do BTC; execução de colateral apenas em inadimplência.";
}
