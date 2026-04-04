"use client";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page(){const store=useAppStore(); const r=useRouter(); const [apr,setApr]=useState(11.5); const [type,setType]=useState<'amortizing'|'interest_only'|'bullet'>('amortizing');
return <div className="space-y-4"><h1 className="text-3xl">Create lend offer</h1><div className="card space-y-3"><input className="input" type="number" value={apr} onChange={e=>setApr(Number(e.target.value))}/><select className="input" value={type} onChange={e=>setType(e.target.value as any)}><option value="amortizing">Amortizing</option><option value="interest_only">Interest only</option><option value="bullet">Bullet</option></select><button className="btn-primary" onClick={()=>{const id=`offer-${Date.now()}`; store.addOffer({id,apr,durationDays:180,minBrl:2000,maxBrl:100000,type}); r.push(`/app/bitcoin/loans/lend/${id}`)}}>Create offer</button></div></div>}
