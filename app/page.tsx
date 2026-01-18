"use client"

import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"
import { Leva } from "leva"

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <Leva hidden />
    </>
  )
}
