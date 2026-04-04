import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoanContract, LoanOffer, StakePosition } from "./types";

interface State {
  joinedFederation: boolean;
  federationName?: string;
  btcBalance: number;
  btcPriceBrl: number;
  pin: string;
  stakes: StakePosition[];
  offers: LoanOffer[];
  loans: LoanContract[];
  activity: { id: string; type: string; desc: string; amount: string; at: string }[];
  joinFederation: (name: string) => void;
  receiveBtc: (btc: number) => void;
  sendBtc: (btc: number) => boolean;
  addStake: (s: StakePosition) => void;
  closeStake: (id: string) => void;
  addOffer: (o: LoanOffer) => void;
  addLoan: (l: LoanContract) => void;
}

export const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      joinedFederation: false,
      federationName: undefined,
      btcBalance: 0.24,
      btcPriceBrl: 350000,
      pin: "1234",
      stakes: [],
      offers: [
        { id: "offer-1", apr: 12.9, durationDays: 180, minBrl: 2000, maxBrl: 50000, type: "amortizing" },
        { id: "offer-2", apr: 10.9, durationDays: 360, minBrl: 5000, maxBrl: 120000, type: "bullet" }
      ],
      loans: [],
      activity: [],
      joinFederation: (name) => set({ joinedFederation: true, federationName: name, activity: [{ id: crypto.randomUUID(), type: "federation", desc: `Entrou em ${name}`, amount: "-", at: new Date().toISOString() }, ...get().activity] }),
      receiveBtc: (btc) => set({ btcBalance: get().btcBalance + btc, activity: [{ id: crypto.randomUUID(), type: "receive", desc: "Recebimento Lightning", amount: `+${btc.toFixed(6)} BTC`, at: new Date().toISOString() }, ...get().activity] }),
      sendBtc: (btc) => {
        if (get().btcBalance < btc) return false;
        set({ btcBalance: get().btcBalance - btc, activity: [{ id: crypto.randomUUID(), type: "send", desc: "Envio Lightning", amount: `-${btc.toFixed(6)} BTC`, at: new Date().toISOString() }, ...get().activity] });
        return true;
      },
      addStake: (s) => set({ stakes: [s, ...get().stakes], btcBalance: get().btcBalance - s.btc, activity: [{ id: crypto.randomUUID(), type: "stake", desc: `Stake ${s.id}`, amount: `-${s.btc.toFixed(6)} BTC`, at: new Date().toISOString() }, ...get().activity] }),
      closeStake: (id) => set({ stakes: get().stakes.map((s) => s.id === id ? { ...s, status: "closed" } : s) }),
      addOffer: (o) => set({ offers: [o, ...get().offers] }),
      addLoan: (l) => set({ loans: [l, ...get().loans], activity: [{ id: crypto.randomUUID(), type: "loan", desc: `Empréstimo ${l.id}`, amount: `+R$ ${l.borrowedBrl.toFixed(2)}`, at: new Date().toISOString() }, ...get().activity] })
    }),
    { name: "fedibank-state" }
  )
);
