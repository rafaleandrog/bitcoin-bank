"use client";
import { useParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
export default function Page(){const {id}=useParams<{id:string}>(); const {stakes,closeStake}=useAppStore(); const stake=stakes.find(s=>s.id===id); if(!stake)return <div>Stake not found</div>; return <div className="space-y-4"><h1 className="text-3xl">Stake {stake.id}</h1><div className="card"><p>{stake.btc} BTC</p><p>Yield BRL projetado: R$ {stake.yieldProjectedBrl.toFixed(2)}</p></div><button className="btn-secondary" onClick={()=>{closeStake(stake.id);toast.success('Stake closed')}}>Close stake</button></div>}
