"use client"

import Image from "next/image"
import { ArrowRight, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      {/* Background illustration */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/smart-city-hero.png"
          alt="Illustration of a connected smart city with roads, streetlights, buildings and greenery"
          fill
          priority
          className="object-cover object-bottom opacity-90 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col items-start justify-center px-4 py-24 sm:px-6 lg:px-8">
        <span className="inline-flex animate-float-slow items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="size-3.5 text-accent" />
          AI-powered civic governance for smarter cities
        </span>

        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          See a Problem? Report It.{" "}
          <span className="text-primary">Build a Better City.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          CivicEye AI empowers citizens to improve urban life through AI-powered civic
          issue reporting and real-time location tracking.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="h-11 px-6 text-sm" render={<a href="#report" />}>
            Report an Issue
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 bg-card/60 px-6 text-sm backdrop-blur"
            render={<a href="#about" />}
          >
            Learn More
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 text-accent" />
          Live camera capture &amp; GPS tracking — no app install required.
        </div>
      </div>
    </section>
  )
}
