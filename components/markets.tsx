"use client"

import { useState } from "react"
import { MarketCard } from "./market-card"
import { MarketsSkeleton } from "./markets-skeleton"
import { Button } from "./ui/button"
import { useMarkets } from "@/hooks/use-markets"

export function Markets() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { markets, categories, isLoading, isError } = useMarkets()

  const filteredMarkets =
    selectedCategory === "All"
      ? markets
      : markets.filter((m) => m.category === selectedCategory)

  return (
    <section id="markets" className="py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-sm text-primary uppercase tracking-wider">Active Markets</span>
            <h2 className="text-4xl md:text-5xl font-sentient mt-4">
              Make your <i className="font-light">predictions</i>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-mono text-sm uppercase transition-all duration-200 border ${
                  selectedCategory === category
                    ? "bg-primary text-background border-primary"
                    : "border-border/50 text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <MarketsSkeleton count={6} />
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-foreground/60 font-mono">Failed to load markets. Please try again later.</p>
          </div>
        ) : filteredMarkets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60 font-mono">No markets found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline">[View All Markets]</Button>
        </div>
      </div>
    </section>
  )
}
