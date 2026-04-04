export const FedimintAdapter = {
  connect: async () => ({ status: "connected", federationId: "fedibank-alpha" })
};

export const LightningAdapter = {
  generateInvoice: async (amountSats: number) => `lnbc${amountSats}fedibankmock`,
  parseInvoice: async (invoice: string) => ({ destination: "mock-node", amountSats: Number(invoice.match(/\d+/)?.[0] || 0) }),
  payInvoice: async () => ({ ok: Math.random() > 0.1 })
};

export const PriceFeedAdapter = {
  btcBrl: async () => 350000
};

export const YieldEngineAdapter = {
  projectedBrlYield: (btc: number, rate: number, days: number, btcPriceBrl: number) => btc * btcPriceBrl * (rate / 100) * (days / 365)
};

export const FederationAdapter = {
  search: async (query: string) => [{ id: "fed-br", name: `${query} Federation Brasil`, members: 1240 }],
  join: async () => ({ joined: true })
};
