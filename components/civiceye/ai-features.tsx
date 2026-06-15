"use client"

import { useEffect, useRef, useState } from "react"
import { Brain, Gauge, Trash2, Lightbulb, Construction, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

type Detection = { icon: LucideIcon; label: string; confidence: number; color: string }

const DETECTIONS: Detection[] = [
  { icon: Trash2, label: "Garbage accumulation", confidence: 94, color: "#16a34a" },
  { icon: Lightbulb, label: "Broken streetlight", confidence: 89, color: "#d97706" },
  { icon: Construction, label: "Pothole", confidence: 91, color: "#dc2626" },
]

type Priority = { level: string; example: string; tone: string }

const PRIORITIES: Priority[] = [
  {
    level: "High Priority",
    example: "Large garbage pile near a school entrance",
    tone: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
  },
  {
    level: "Medium Priority",
    example: "Flickering streetlight on a residential lane",
    tone: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    level: "Low Priority",
    example: "Minor surface crack on a low-traffic road",
    tone: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
]

function ConfidenceRow({ detection }: { detection: Detection }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(true),
      { threshold: 0.5 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-medium">
          <detection.icon className="size-4" style={{ color: detection.color }} />
          AI detected: {detection.label}
        </span>
        <span className="font-semibold tabular-nums">{detection.confidence}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-out"
          style={{
            width: active ? `${detection.confidence}%` : "0%",
            backgroundColor: detection.color,
          }}
        />
      </div>
    </div>
  )
}

export function AiFeatures() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="AI Integration"
        title="Artificial Intelligence Integration"
        description="CivicEye AI classifies images and assigns priorities automatically so the right issues reach the right team, fast."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Brain className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">AI Image Classification</h3>
            </div>
            <div className="flex flex-col gap-5">
              {DETECTIONS.map((detection) => (
                <ConfidenceRow key={detection.label} detection={detection} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Gauge className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">Priority Detection</h3>
            </div>
            <div className="flex flex-col gap-4">
              {PRIORITIES.map((priority) => (
                <div
                  key={priority.level}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm text-muted-foreground">{priority.example}</span>
                  <Badge variant="outline" className={cn("w-fit shrink-0 font-semibold", priority.tone)}>
                    {priority.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
