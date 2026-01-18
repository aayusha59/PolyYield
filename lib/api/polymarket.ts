import type { PolymarketMarket, Market } from "../types/polymarket"

const POLYMARKET_API_URL =
  process.env.POLYMARKET_API_URL || "https://gamma-api.polymarket.com"

// Category detection keywords - ordered by priority
const categoryDetectionOrder: Array<{ category: string; keywords: string[] }> = [
  {
    category: "Economics",
    keywords: [
      "fed ", "fed's", "interest rate", "inflation", "gdp", "unemployment", "recession",
      "stock market", "s&p", "dow", "nasdaq", "treasury", "bond", "monetary", "fiscal",
      "fomc", "powell", "federal reserve", "bps", "basis points", "rate cut", "rate hike"
    ]
  },
  {
    category: "Politics",
    keywords: [
      "president", "election", "democrat", "republican", "trump", "biden", "congress",
      "senate", "governor", "vote", "nomination", "political", "white house", "supreme court",
      "cabinet", "impeach", "legislation", "bill", "parliament", "minister", "obama",
      "harris", "desantis", "newsom", "pelosi", "mcconnell", "greenland", "ukraine", "russia",
      "ceasefire", "war", "iran", "khamenei", "china", "xi", "nato", "gabbard", "walz",
      "cheney", "sanders", "clooney", "winfrey", "murphy", "warnock", "crockett", "raimondo",
      "clinton", "hunter biden"
    ]
  },
  {
    category: "Sports",
    keywords: [
      "nfl", "nba", "mlb", "nhl", "soccer", "football", "basketball", "baseball",
      "super bowl", "championship", "playoffs", "world series", "premier league",
      "champions league", "49ers", "seahawks", "rams", "bears", "patriots", "texans",
      "pacers", "pistons", "lakers", "celtics", "warriors", "nets", "jazz", "everton",
      "tottenham", "arsenal", "manchester", "liverpool", "chelsea", "brighton", "wolves",
      "nba finals", "spread:", " vs ", " v. ", " vs.", "win the 202"
    ]
  },
  {
    category: "Crypto",
    keywords: [
      "bitcoin", "btc", "ethereum", "eth", "crypto", "solana", "sol", "xrp", "doge",
      "blockchain", "token", "defi", "nft", "coinbase", "binance", "altcoin", "memecoin",
      "up or down"
    ]
  },
  {
    category: "Entertainment",
    keywords: [
      "movie", "film", "oscar", "grammy", "emmy", "celebrity", "music", "album",
      "concert", "tv show", "netflix", "disney", "kardashian", "mrbeast", "youtube",
      "tiktok", "influencer", "lebron james", "oprah"
    ]
  },
  {
    category: "Technology",
    keywords: [
      "ai", "artificial intelligence", "openai", "chatgpt", "google", "apple", "meta",
      "microsoft", "tesla", "spacex", "elon", "musk", "tech", "software", "hardware",
      "chip", "semiconductor", "nvidia"
    ]
  },
  {
    category: "Science",
    keywords: [
      "nasa", "space", "climate", "environment", "vaccine", "health", "medical",
      "research", "study", "discovery", "science"
    ]
  }
]

function detectCategory(question: string, description?: string): string {
  const text = `${question} ${description || ""}`.toLowerCase()
  
  // Check each category's keywords in priority order
  for (const { category, keywords } of categoryDetectionOrder) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category
      }
    }
  }
  
  return "Other"
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateString
  }
}

function parseOutcomePrices(outcomePrices: string): [number, number] {
  try {
    const prices = JSON.parse(outcomePrices) as string[]
    const yesPrice = parseFloat(prices[0] || "0.5")
    const noPrice = parseFloat(prices[1] || "0.5")
    return [yesPrice, noPrice]
  } catch {
    return [0.5, 0.5]
  }
}

export function transformMarket(pm: PolymarketMarket): Market {
  const liquidity = pm.liquidityNum || parseFloat(pm.liquidity) || 0
  const [yesPrice, noPrice] = parseOutcomePrices(pm.outcomePrices)

  // Calculate pools based on liquidity and prices
  const yesPool = Math.round(liquidity * yesPrice)
  const noPool = Math.round(liquidity * noPrice)
  const totalPool = yesPool + noPool || Math.round(liquidity)

  // Use smart category detection based on question content
  const category = detectCategory(pm.question, pm.description)

  return {
    id: pm.id,
    question: pm.question,
    category,
    totalPool: totalPool,
    yesPool: yesPool,
    noPool: noPool,
    endDate: formatDate(pm.endDate),
    slug: pm.slug,
    image: pm.image,
    volume: pm.volumeNum,
    yesPrice,
    noPrice,
  }
}

export interface FetchMarketsOptions {
  limit?: number
  active?: boolean
  closed?: boolean
}

export async function fetchActiveMarkets(
  options: FetchMarketsOptions = {}
): Promise<PolymarketMarket[]> {
  const { limit = 50, active = true, closed = false } = options

  const params = new URLSearchParams({
    limit: limit.toString(),
    active: active.toString(),
    closed: closed.toString(),
    order: "liquidityNum",
    ascending: "false",
  })

  const response = await fetch(`${POLYMARKET_API_URL}/markets?${params}`, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 300 }, // Cache for 5 minutes in Next.js
  })

  if (!response.ok) {
    throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data as PolymarketMarket[]
}

export async function fetchAndTransformMarkets(
  options: FetchMarketsOptions = {}
): Promise<Market[]> {
  const polymarkets = await fetchActiveMarkets(options)
  return polymarkets
    .filter((pm) => pm.question && pm.liquidityNum > 0)
    .map(transformMarket)
}
