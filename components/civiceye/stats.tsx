import { FileCheck2, CheckCircle2, Users, MapPinned } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

const STATS = [
  { icon: FileCheck2, value: 48270, suffix: "+", label: "Total Reports Submitted" },
  { icon: CheckCircle2, value: 41695, suffix: "+", label: "Issues Resolved" },
  { icon: Users, value: 19840, suffix: "+", label: "Active Citizens" },
  { icon: MapPinned, value: 326, suffix: "", label: "Areas Improved" },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 py-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <stat.icon className="size-5" />
            </span>
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl"
            />
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
