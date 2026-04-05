export type ActivityType = "receive" | "send" | "stake" | "loan" | "federation";

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  desc: string;
  amount: string;
  at: string;
}

export interface StakePosition {
  id: string;
  btc: number;
  rate: number;
  durationDays: number;
  yieldProjectedBrl: number;
  yieldAccumulatedBrl: number;
  startDate: string;
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
  apr: number;
  durationDays: number;
  startDate: string;
  status: "active" | "repaid";
}
