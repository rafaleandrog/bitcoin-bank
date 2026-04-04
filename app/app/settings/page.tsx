"use client";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page(){const r=useRouter(); const reset=()=>{localStorage.removeItem('fedibank-state'); toast.success('Logged out'); r.push('/');}; return <div className="space-y-4"><h1 className="text-3xl">Settings</h1><div className="card space-y-3"><div><p className="label">Theme</p><p>Dark (institutional)</p></div><div><p className="label">Currency</p><p>BRL</p></div><div><p className="label">PIN</p><p>{useAppStore.getState().pin}</p></div><button className="btn-secondary" onClick={reset}>Logout</button></div></div>}
