import { NextResponse } from "next/server"
import { fetchAndTransformMarkets } from "@/lib/api/polymarket"
import type { Market, MarketsResponse } from "@/lib/types/polymarket"

// In-memory cache
let cachedData: { markets: Market[]; timestamp: number } | null = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

export async function GET() {
  try {
    const now = Date.now()

    // Check if cached data is still valid
    if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
      const categories = extractCategories(cachedData.markets)
      return NextResponse.json<MarketsResponse>({
        markets: cachedData.markets,
        categories,
      })
    }

    // Fetch fresh data from Polymarket
    const markets = await fetchAndTransformMarkets({ limit: 50 })

    // Update cache
    cachedData = { markets, timestamp: now }

    const categories = extractCategories(markets)

    return NextResponse.json<MarketsResponse>({
      markets,
      categories,
    })
  } catch (error) {
    console.error("Error fetching markets:", error)

    // Return cached data if available, even if stale
    if (cachedData) {
      const categories = extractCategories(cachedData.markets)
      return NextResponse.json<MarketsResponse>({
        markets: cachedData.markets,
        categories,
      })
    }

    return NextResponse.json(
      { error: "Failed to fetch markets", message: String(error) },
      { status: 500 }
    )
  }
}

function extractCategories(markets: Market[]): string[] {
  const uniqueCategories = new Set(markets.map((m) => m.category))
  return ["All", ...Array.from(uniqueCategories).sort()]
}
