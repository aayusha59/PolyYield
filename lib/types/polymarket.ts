// Polymarket Gamma API response types
export interface PolymarketOutcome {
  price: string
  outcome: string
}

export interface PolymarketMarket {
  id: string
  question: string
  conditionId: string
  slug: string
  endDate: string
  liquidity: string
  liquidityNum: number
  volume: string
  volumeNum: number
  outcomes: string
  outcomePrices: string
  active: boolean
  closed: boolean
  category?: string
  image?: string
  icon?: string
  description?: string
}

export interface PolymarketEvent {
  id: string
  title: string
  slug: string
  category?: string
  markets: PolymarketMarket[]
}

// Our app's Market interface (transformed from Polymarket)
export interface Market {
  id: string
  question: string
  category: string
  totalPool: number
  yesPool: number
  noPool: number
  endDate: string
  slug?: string
  image?: string
  volume?: number
  yesPrice?: number
  noPrice?: number
}

// API response types
export interface MarketsResponse {
  markets: Market[]
  categories: string[]
}

export interface MarketsError {
  error: string
  message: string
}
