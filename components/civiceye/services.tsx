import { Card, CardContent } from "@/components/ui/card"
import { CATEGORIES } from "@/lib/civic-data"
import { SectionHeading } from "./section-heading"

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="What you can report with CivicEye AI"
          description="Six core civic categories, each routed to the right municipal department with AI-assigned priority."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Card
              key={category.id}
              className="group border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <span
                  className="flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}1a`, color: category.color }}
                >
                  <category.icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold">{category.label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
