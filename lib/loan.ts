export function calcLtv(loanBrl: number, collateralBtc: number, btcPriceBrl: number): number {
  if (collateralBtc <= 0 || btcPriceBrl <= 0) return 0;
  return (loanBrl / (collateralBtc * btcPriceBrl)) * 100;
}

export function canExtendBullet(ltv: number): boolean {
  return ltv <= 50;
}

export function loanRuleLabel(): string {
  return "Sem liquidação por variação de preço do BTC; execução de colateral apenas em inadimplência.";
}

export interface AmortizationRow {
  installment: number;
  dueDate: string;
  principal: number;
  interest: number;
  total: number;
  balance: number;
}

export function calcAmortizationTable(
  principal: number,
  apr: number,
  durationDays: number
): AmortizationRow[] {
  const months = Math.round(durationDays / 30);
  const monthlyRate = apr / 100 / 12;
  const rows: AmortizationRow[] = [];
  let balance = principal;
  const amortization = principal / months;
  const now = new Date();

  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;
    const total = amortization + interest;
    balance -= amortization;
    const dueDate = new Date(now);
    dueDate.setMonth(dueDate.getMonth() + i);
    rows.push({
      installment: i,
      dueDate: dueDate.toLocaleDateString("pt-BR"),
      principal: amortization,
      interest,
      total,
      balance: Math.max(balance, 0),
    });
  }
  return rows;
}

export interface InterestOnlyPreview {
  monthlyInterest: number;
  months: number;
  totalInterest: number;
  balloonPayment: number;
  totalPaid: number;
}

export function calcInterestOnlyPreview(
  principal: number,
  apr: number,
  durationDays: number
): InterestOnlyPreview {
  const months = Math.round(durationDays / 30);
  const monthlyRate = apr / 100 / 12;
  const monthlyInterest = principal * monthlyRate;
  const totalInterest = monthlyInterest * months;
  return {
    monthlyInterest,
    months,
    totalInterest,
    balloonPayment: principal,
    totalPaid: totalInterest + principal,
  };
}

export interface BulletPreview {
  principal: number;
  accruedInterest: number;
  totalDue: number;
  dueDate: string;
  extensionAllowed: (ltv: number) => boolean;
}

export function calcBulletPreview(
  principal: number,
  apr: number,
  durationDays: number
): BulletPreview {
  const years = durationDays / 365;
  const accruedInterest = principal * (apr / 100) * years;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + durationDays);
  return {
    principal,
    accruedInterest,
    totalDue: principal + accruedInterest,
    dueDate: dueDate.toLocaleDateString("pt-BR"),
    extensionAllowed: (ltv: number) => canExtendBullet(ltv),
  };
}
