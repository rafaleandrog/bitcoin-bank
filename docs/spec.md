# FediBank v1.0 Spec (Implemented)

## Stack
Next.js App Router, TypeScript, TailwindCSS, React Hook Form + Zod, Zustand persist, mocked adapters, Vitest, Playwright.

## Core Rule (Loans)
- No liquidation on BTC price movements.
- Collateral only executed on default.
- BTC price affects interest/installments/projections only.
- Bullet extension only if LTV <= 50%.
- Max LTV 100%.
- Duration 90-360 days.

Rule appears on marketplace and borrow simulation/contract confirmation UI.

## Implemented modules
- Federation join (search/link/QR)
- Dashboard with BTC + BRL cards
- Receive / Send Lightning mock
- Vault balances
- Stake lifecycle with BRL-only yield
- Loans marketplace, offer creation, borrow simulation + PIN confirmation
- Activity table + filters + CSV export
- Proof of reserves mock dashboard
- Settings page and logout
- RWA institutional placeholder with mock deal
