import useSWR from "swr"
import type { Market, MarketsResponse } from "@/lib/types/polymarket"

const fetcher = async (url: string): Promise<MarketsResponse> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch markets")
  }
  return res.json()
}

interface UseMarketsReturn {
  markets: Market[]
  categories: string[]
  isLoading: boolean
  isError: boolean
  error: Error | undefined
  mutate: () => void
}

export function useMarkets(): UseMarketsReturn {
  const { data, error, isLoading, mutate } = useSWR<MarketsResponse>(
    "/api/markets",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
      dedupingInterval: 60 * 1000, // Dedupe requests within 1 minute
    }
  )

  return {
    markets: data?.markets ?? [],
    categories: data?.categories ?? ["All"],
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
