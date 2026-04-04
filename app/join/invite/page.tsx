"use client";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
export default function Page(){const join=useAppStore(s=>s.joinFederation); const r=useRouter(); return <div className="p-8 space-y-3"><h1 className="text-2xl">Join by invite</h1><input className="input" defaultValue="https://fedibank/join/fed-br"/><button className="btn-primary" onClick={()=>{join('Invite Federation');r.push('/app')}}>Validate & Join</button></div>}
