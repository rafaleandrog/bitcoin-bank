"use client";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { calcLtv, canExtendBullet } from "@/lib/loan";
import { useState } from "react";
import { RuleBanner } from "@/components/rule-banner";
import { toast } from "sonner";

export default function Page(){
  const {id}=useParams<{id:string}>(); const router=useRouter(); const store=useAppStore(); const offer=store.offers.find(o=>o.id===id);
  const [amount,setAmount]=useState(offer?.minBrl??2000); const [btc,setBtc]=useState(0.02); const [pin,setPin]=useState('');
  if(!offer) return <div>Offer not found</div>;
  const ltv=calcLtv(amount,btc,store.btcPriceBrl);
  return <div className="space-y-4"><h1 className="text-3xl">Borrow from {offer.id}</h1><RuleBanner/><div className="card space-y-3"><label className="label">Loan BRL</label><input className="input" type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))}/><label className="label">Collateral BTC</label><input className="input" type="number" value={btc} onChange={e=>setBtc(Number(e.target.value))} step="0.0001"/><p>LTV: <span className={ltv>100?'text-red-400':'text-emerald-400'}>{ltv.toFixed(2)}%</span> (max 100%)</p><p>Prazo: {offer.durationDays} dias (permitido 90-360)</p><p className="text-sm text-zinc-300">Tipo: {offer.type}. {offer.type==='bullet' && `Extensão permitida: ${canExtendBullet(ltv)?'Sim':'Não (LTV > 50%)'}`}</p><div className="text-xs text-zinc-400">Tooltip/Contrato: preço do BTC altera juros, parcelas e projeções, sem liquidação automática.</div><input className="input" type="password" placeholder="PIN" value={pin} onChange={e=>setPin(e.target.value)}/><button className="btn-primary" onClick={()=>{if(pin!==store.pin)return toast.error('PIN inválido'); if(ltv>100)return toast.error('LTV excede 100%'); store.addLoan({id:`loan-${Date.now()}`,offerId:offer.id,borrowedBrl:amount,collateralBtc:btc,ltv,type:offer.type,status:'active'}); toast.success('Loan contratado'); router.push('/app/bitcoin/loans');}}>Confirm contract</button></div></div>
}
