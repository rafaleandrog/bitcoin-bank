import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FediBank v1.0",
  description: "Bitcoin-first federation banking demo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
