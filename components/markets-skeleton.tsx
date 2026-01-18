export function MarketCardSkeleton() {
  return (
    <div className="bg-[#0a0a0a] border border-border/50 p-6 animate-pulse">
      {/* Category and APY placeholder */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-20 bg-primary/10 rounded" />
      </div>

      {/* Question placeholder */}
      <div className="mb-6 space-y-2">
        <div className="h-5 w-full bg-border/30 rounded" />
        <div className="h-5 w-3/4 bg-border/30 rounded" />
      </div>

      {/* Prediction bar placeholder */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <div className="h-3 w-16 bg-border/30 rounded" />
          <div className="h-3 w-16 bg-border/30 rounded" />
        </div>
        <div className="h-2 bg-[#1a1a1a] rounded" />
      </div>

      {/* Position buttons placeholder */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="h-12 bg-border/20 border border-border/50 rounded" />
        <div className="h-12 bg-border/20 border border-border/50 rounded" />
      </div>

      {/* Market info placeholder */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div className="h-4 w-24 bg-border/30 rounded" />
        <div className="h-4 w-24 bg-border/30 rounded" />
      </div>
    </div>
  )
}

export function MarketsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MarketCardSkeleton key={i} />
      ))}
    </div>
  )
}
