"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "@/lib/store";
import { YieldEngineAdapter } from "@/features/adapters";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema=z.object({btc:z.coerce.number().min(0.0001),rate:z.coerce.number().min(1),duration:z.coerce.number().min(30),pin:z.string().min(4)});
export default function Page(){const {register,handleSubmit,formState:{isSubmitting,errors}}=useForm({resolver:zodResolver(schema)}); const store=useAppStore(); const r=useRouter();
return <div className="space-y-4"><h1 className="text-3xl">New stake</h1><form className="card space-y-3" onSubmit={handleSubmit(async(v:any)=>{if(v.pin!==store.pin)return toast.error('PIN inválido'); if(v.btc>store.btcBalance)return toast.error('Saldo insuficiente'); const id=`stk-${Date.now()}`; store.addStake({id,btc:v.btc,rate:v.rate,durationDays:v.duration,yieldProjectedBrl:YieldEngineAdapter.projectedBrlYield(v.btc,v.rate,v.duration,store.btcPriceBrl),yieldAccumulatedBrl:Math.random()*120,status:'active'}); toast.success('Stake criada'); r.push('/app/bitcoin/stake');})}><input className="input" placeholder="BTC" {...register('btc')}/>{errors.btc&&<p className="text-red-400 text-sm">BTC inválido</p>}<input className="input" placeholder="Taxa %" {...register('rate')}/><input className="input" placeholder="Duração dias" {...register('duration')}/><input className="input" placeholder="PIN" type="password" {...register('pin')}/><button className="btn-primary" disabled={isSubmitting}>Confirm stake</button></form></div>}
