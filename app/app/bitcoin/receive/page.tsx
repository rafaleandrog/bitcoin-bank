"use client";
import { useState } from "react";
import { LightningAdapter } from "@/features/adapters";
import { useAppStore } from "@/lib/store";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { Copy, Zap, Info } from "lucide-react";

export default function Page() {
  const [sats, setSats] = useState(20000);
  const [invoice, setInvoice] = useState("");
  const [loading, setLoading] = useState(false);
  const receive = useAppStore((s) => s.receiveBtc);

  async function handleGenerate() {
    setLoading(true);
    const inv = await LightningAdapter.generateInvoice(sats);
    setInvoice(inv);
    setLoading(false);
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-3xl font-semibold">Receber Bitcoin</h1>
        <p className="text-zinc-400 text-sm mt-1">via Lightning Network</p>
      </div>

      <div className="card border border-blue-500/30 bg-blue-500/5 flex gap-3 items-start">
        <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
        <div className="text-sm text-zinc-300">
          <p>Transfira de qualquer carteira ou corretora externa via Lightning Network — por exemplo, <strong>Bipa</strong>, Phoenix, Wallet of Satoshi, entre outras.</p>
          <p className="mt-1 text-zinc-400">Não há compra de BTC dentro do app. O BTC vem sempre de uma fonte externa.</p>
        </div>
      </div>

      <div className="card space-y-4">
        <div>
          <label className="label mb-1 block">Quantidade (satoshis)</label>
          <input
            className="input"
            type="number"
            value={sats}
            min={1000}
            onChange={(e) => setSats(Number(e.target.value))}
          />
          <p className="text-xs text-zinc-500 mt-1">
            ≈ {(sats / 1e8).toFixed(8)} BTC &nbsp;|&nbsp; R$ {((sats / 1e8) * 350000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
          </p>
        </div>

        <button className="btn-primary flex items-center gap-2 w-full justify-center" onClick={handleGenerate} disabled={loading}>
          <Zap size={16} />
          {loading ? "Gerando..." : "Gerar Invoice Lightning"}
        </button>

        {invoice && (
          <div className="space-y-4 pt-2 border-t border-zinc-800">
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-xl">
                <QRCodeSVG value={invoice} size={200} />
              </div>
            </div>

            <div className="bg-zinc-900 rounded-lg p-3">
              <p className="text-xs text-zinc-500 mb-1">Invoice Lightning</p>
              <p className="text-xs break-all font-mono text-zinc-300">{invoice}</p>
            </div>

            <div className="flex gap-2">
              <button
                className="btn-secondary flex items-center gap-2 flex-1 justify-center"
                onClick={() => { navigator.clipboard.writeText(invoice); toast.success("Invoice copiada!"); }}
              >
                <Copy size={14} />
                Copiar invoice
              </button>
              <button
                className="btn-primary flex-1"
                onClick={() => { receive(sats / 1e8); toast.success(`+${(sats / 1e8).toFixed(6)} BTC recebido com sucesso!`); setInvoice(""); }}
              >
                Simular recebimento
              </button>
            </div>
            <p className="text-xs text-zinc-500 text-center">O botão "Simular recebimento" é apenas para demonstração.</p>
          </div>
        )}
      </div>
    </div>
  );
}
