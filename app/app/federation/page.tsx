"use client";
import { useAppStore } from "@/lib/store";
export default function Page(){const {federationName,joinedFederation}=useAppStore(); return <div className="space-y-4"><h1 className="text-3xl">Federation</h1><div className="card"><p>Status: {joinedFederation?'Connected':'Disconnected'}</p><p>Name: {federationName}</p></div></div>}
