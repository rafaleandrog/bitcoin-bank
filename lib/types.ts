export type ActivityType = "receive" | "send" | "stake" | "loan" | "federation";

export interface StakePosition {
  id: string;
  btc: number;
  rate: number;
  durationDays: number;
  yieldProjectedBrl: number;
  yieldAccumulatedBrl: number;
  status: "active" | "closed";
}

export interface LoanOffer {
  id: string;
  apr: number;
  durationDays: number;
  minBrl: number;
  maxBrl: number;
  type: "amortizing" | "interest_only" | "bullet";
}

export interface LoanContract {
  id: string;
  offerId: string;
  borrowedBrl: number;
  collateralBtc: number;
  ltv: number;
  type: LoanOffer["type"];
  status: "active" | "repaid";
}
