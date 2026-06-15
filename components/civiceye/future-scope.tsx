import { Smartphone, Building2, BellRing, BrainCircuit, LayoutDashboard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "./section-heading"

const ITEMS = [
  { icon: Smartphone, title: "Mobile App Integration", text: "Native Android & iOS apps for on-the-go reporting and tracking." },
  { icon: Building2, title: "Municipal Corporation Integration", text: "Direct routing into official municipal workflows and ERPs." },
  { icon: BellRing, title: "Push Notifications", text: "Real-time status updates sent to citizens as issues progress." },
  { icon: BrainCircuit, title: "Predictive AI Analytics", text: "Forecast civic hotspots before issues escalate using historical data." },
  { icon: LayoutDashboard, title: "Smart City Dashboards", text: "Unified command dashboards for city-wide governance and insights." },
]

export function FutureScope() {
  return (
    <section className="scroll-mt-20 border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Future Scope"
          title="Where CivicEye AI is headed"
          description="A roadmap toward a fully connected, predictive Smart City governance platform."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <Card key={item.title} className="border-border transition-colors hover:border-primary/40">
              <CardContent className="flex flex-col gap-3 p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </span>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
