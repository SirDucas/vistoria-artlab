# Vistoria ArtLab – MVP e-commerce artistico

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth credentials (admin)
- Stripe Checkout + webhook
- Cloudinary upload immagini
- Zod validation
- Carrello via React Context

## Struttura principale
- `src/app/*`: pagine pubbliche, admin, API route handlers
- `src/components/*`: header, footer, product card
- `src/context/cart-store.tsx`: stato carrello
- `src/lib/*`: auth, prisma, stripe, validators, email util
- `prisma/schema.prisma`: schema DB
- `prisma/seed.ts`: seed con 10 prodotti demo + admin + contenuti

## Avvio locale (npm)
1. Copia env: `cp .env.example .env`
2. Installa dipendenze: `npm install`
3. Prisma generate/migrate/seed:
   - `npm run prisma:generate`
   - `npm run prisma:migrate -- --name init`
   - `npm run prisma:seed`
4. Avvio dev: `npm run dev`

## API implementate
- `POST /api/stripe/create-checkout-session`
- `POST /api/stripe/webhook`
- `POST /api/contact`
- `POST /api/admin/upload`
- `POST /api/admin/products`
- `PATCH /api/admin/orders`
- `PATCH /api/admin/content`

## Stripe webhook setup
- Avvia app locale su `http://localhost:3000`
- Avvia Stripe CLI:
  `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Copia `whsec_...` in `STRIPE_WEBHOOK_SECRET`

## Deploy Vercel
- Configura variabili in Project Settings (vedi `.env.example`)
- Usa un PostgreSQL esterno (Neon/Supabase/RDS)
- Esegui migrate in CI/CD o predeploy
- Configura webhook Stripe verso `https://your-domain/api/stripe/webhook`
- Configura Cloudinary credentials per upload admin

## TODO pratici
- Integrare checkout address collection avanzata su Stripe se serve shipping reale.
- Migliorare admin ordini con tabella completa e filtri.
