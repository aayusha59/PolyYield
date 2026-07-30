

# PolyYield (Enviado a NexHacks 2026 🏆)
# No hay token en pumpfun, no caigan en estafas

**Mercados de predicción sin pérdida en Solana**

Predice el futuro sin arriesgar nada. Los ganadores obtienen rendimiento, los perdedores recuperan su depósito.

## ¿Qué es PolyYield?

PolyYield te permite apostar por eventos del mundo real (política, criptomonedas, deportes, etc.) sin arriesgar tu capital principal. Tu USDC se deposita en una bóveda de Solana; si ganas, obtienes rendimiento del fondo de perdedores. Si pierdes, recuperas tu depósito completo.

## Stack Tecnológico

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, Three.js
- **Blockchain:** Solana, Anchor 0.30.1 (Rust)
- **Database:** Supabase // PostgreSQL
- **Markets:** Polymarket API
- **Deployment:** Vercel

## Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

Abre http://localhost:3000

## Configuración de Devnet

1. **Instala Solana CLI** y configúralo para devnet:
   ```bash
   solana config set --url devnet
   solana-keygen new
   solana airdrop 2
   ```

2. **Obtén USDC de devnet** desde https://faucet.circle.com/ (selecciona Solana Devnet)

3. **Despliega el programa:**
   ```bash
   anchor build
   anchor deploy
   npx ts-node scripts/initialize-vault.ts
   ```

4. **Conecta Phantom** (configurado en modo Devnet) ¡y empieza a operar!

## Variables de Entorno

Crea `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key    
```

## ID del Programa

**Devnet:** `FWGiD7WhXu8k7eDtEwr3ZbXbvqwL7kdJgNfugrSVJ7F3`

## Estructura del Proyecto

```
polyield/
├── app/                 # Páginas de Next.js
├── components/          # Componentes de React
├── hooks/               # Hooks personalizados (depósito, mercados, posiciones)
├── lib/
│   ├── solana/          # Integración de blockchain
│   ├── database/        # Servicio de Supabase
│   └── api/             # API de Polymarket
├── programs/            # Contrato inteligente de Anchor
│   └── polyield_vault/
└── scripts/             # Scripts de despliegue
```

## Contrato Inteligente

Tres instrucciones:
- `initialize` — Crear la bóveda
- `deposit` — Depositar USDC en posición SÍ o NO
- `withdraw` — Retirar USDC tras la resolución del mercado

## Documentación

- [QUICKSTART.md](./QUICKSTART.md) — Guía de prueba paso a paso
- [DEVNET_SETUP.md](./DEVNET_SETUP.md) — Configuración detallada de Solana
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) — Configuración de la base de datos

## Enlaces

- [Solscan Devnet](https://solscan.io/?cluster=devnet)
- [Faucet de USDC de Circle](https://faucet.circle.com/)
- [Faucet de SOL](https://faucet.solana.com/)
- [Billetera Phantom](https://phantom.app/)

---

Construido en Solana 🟣
