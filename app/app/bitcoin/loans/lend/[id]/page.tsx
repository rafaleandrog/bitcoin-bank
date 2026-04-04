"use client";
import { useParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
export default function Page(){const {id}=useParams<{id:string}>(); const offer=useAppStore(s=>s.offers.find(o=>o.id===id)); if(!offer)return <div>Offer not found</div>; return <div className="space-y-4"><h1 className="text-3xl">Offer {offer.id}</h1><div className="card"><p>APR {offer.apr}%</p><p>Type {offer.type}</p><p>Duration {offer.durationDays} days</p></div></div>}
