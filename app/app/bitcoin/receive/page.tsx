"use client";
import { useState } from "react";
import { LightningAdapter } from "@/features/adapters";
import { useAppStore } from "@/lib/store";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

export default function Page(){
  const [sats,setSats]=useState(20000); const [invoice,setInvoice]=useState(""); const receive=useAppStore(s=>s.receiveBtc);
  return <div className="space-y-4"><h1 className="text-3xl">Receive BTC (LN)</h1><div className="card space-y-3"><input className="input" type="number" value={sats} onChange={e=>setSats(Number(e.target.value))}/><button className="btn-primary" onClick={async()=>setInvoice(await LightningAdapter.generateInvoice(sats))}>Generate invoice</button>{invoice && <><QRCodeSVG value={invoice}/><p className="text-xs break-all">{invoice}</p><button className="btn-secondary" onClick={()=>navigator.clipboard.writeText(invoice)}>Copy invoice</button><button className="btn-primary" onClick={()=>{receive(sats/1e8); toast.success('BTC received');}}>Simulate receive</button></>}</div></div>
}
