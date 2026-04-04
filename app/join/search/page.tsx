"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FederationAdapter } from "@/features/adapters";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export default function SearchPage() {
  const [q, setQ] = useState("Fedi");
  const [result, setResult] = useState<any[]>([]);
  const join = useAppStore((s) => s.joinFederation);
  const router = useRouter();
  return <div className="p-8 space-y-4"><h1 className="text-2xl">Search federation</h1><input className="input" value={q} onChange={(e)=>setQ(e.target.value)}/><button className="btn-primary" onClick={async()=>setResult(await FederationAdapter.search(q))}>Search</button><div className="space-y-2">{result.map((r)=><div key={r.id} className="card flex items-center justify-between"><div><p className="font-medium">{r.name}</p><p className="text-xs text-zinc-400">{r.members} members</p></div><button className="btn-secondary" onClick={()=>{join(r.name); toast.success("Federation joined"); router.push('/app');}}>Join</button></div>)}</div></div>;
}
