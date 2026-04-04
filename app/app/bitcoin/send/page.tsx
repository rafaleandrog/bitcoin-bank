"use client";
import { useState } from "react";
import { LightningAdapter } from "@/features/adapters";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export default function Page(){
  const [invoice,setInvoice]=useState(""); const [pin,setPin]=useState(""); const [parsed,setParsed]=useState<any>(); const send=useAppStore(s=>s.sendBtc); const pinRef=useAppStore(s=>s.pin);
  return <div className="space-y-4"><h1 className="text-3xl">Send BTC (LN)</h1><div className="card space-y-3"><textarea className="input" value={invoice} onChange={e=>setInvoice(e.target.value)} placeholder="Paste invoice"/><button className="btn-secondary" onClick={async()=>setParsed(await LightningAdapter.parseInvoice(invoice))}>Parse invoice</button>{parsed&&<div className="text-sm text-zinc-300">Destination: {parsed.destination} | Amount: {parsed.amountSats} sats</div>}<input className="input" placeholder="PIN" type="password" value={pin} onChange={e=>setPin(e.target.value)}/><button className="btn-primary" onClick={async()=>{if(pin!==pinRef) return toast.error('Invalid PIN'); const ok=send(parsed.amountSats/1e8); if(!ok) return toast.error('Insufficient BTC'); const res=await LightningAdapter.payInvoice(); res.ok?toast.success('Payment sent'):toast.error('Network fail (mock)')}}>Confirm send</button></div></div>
}
