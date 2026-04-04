"use client";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
export default function Page(){const join=useAppStore(s=>s.joinFederation); const r=useRouter(); return <div className="p-8 space-y-4"><h1 className="text-2xl">Join via QR</h1><div className="card">Mock camera preview / QR scan</div><button className="btn-primary" onClick={()=>{join('QR Federation');r.push('/app')}}>Simulate scan</button></div>}
