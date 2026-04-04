"use client";
import { AppShell } from "@/components/app-shell";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const joined = useAppStore((s) => s.joinedFederation);
  const router = useRouter();
  useEffect(() => { if (!joined) router.push('/join'); }, [joined, router]);
  if (!joined) return <div className="p-8">Checking federation membership...</div>;
  return <AppShell>{children}</AppShell>;
}
