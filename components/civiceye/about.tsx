import { Target, Eye, Trash2, Lightbulb, Construction, Droplets } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "./section-heading"

const PROBLEMS = [
  { icon: Trash2, label: "Garbage accumulation" },
  { icon: Lightbulb, label: "Broken streetlights" },
  { icon: Construction, label: "Potholes & bad roads" },
  { icon: Droplets, label: "Water leakage" },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About CivicEye AI"
        title="Bridging citizens and municipal authorities"
        description="Citizens often face issues such as garbage accumulation, broken streetlights, potholes, and water leakage, but lack a quick and transparent reporting system. CivicEye AI closes that gap with instant, AI-assisted reporting."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardContent className="flex flex-col gap-4 p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target className="size-5" />
            </span>
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="leading-relaxed text-muted-foreground">
              Creating cleaner, safer, and smarter cities through citizen participation
              and AI-driven governance.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="flex flex-col gap-4 p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Eye className="size-5" />
            </span>
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="leading-relaxed text-muted-foreground">
              To become a unified Smart City platform for civic issue reporting that
              every citizen and municipality can rely on.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card/40 p-6">
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          Common civic problems CivicEye AI helps resolve:
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PROBLEMS.map((problem) => (
            <div
              key={problem.label}
              className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3"
            >
              <problem.icon className="size-4 shrink-0 text-primary" />
              <span className="text-sm font-medium">{problem.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
