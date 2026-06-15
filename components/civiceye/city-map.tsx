"use client"

import { Card } from "@/components/ui/card"
import {
  SAMPLE_COMPLAINTS,
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_COLOR,
  CITY_CENTER,
} from "@/lib/civic-data"
import { MapView, type MapMarker } from "./map-view"
import { SectionHeading } from "./section-heading"

const markers: MapMarker[] = SAMPLE_COMPLAINTS.map((c) => ({
  id: c.id,
  lat: c.lat,
  lng: c.lng,
  color: CATEGORY_COLOR[c.category],
  title: `${CATEGORY_LABEL[c.category]} — ${c.id}`,
  subtitle: `${c.location} · ${c.status}`,
}))

export function CityMap() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Live Map"
        title="City-wide issue map"
        description="Every reported issue plotted on the map, color-coded by category for quick situational awareness."
      />

      <Card className="mt-10 overflow-hidden border-border p-0">
        <div className="h-[460px] w-full">
          <MapView center={CITY_CENTER} zoom={14} markers={markers} className="h-full w-full" />
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border bg-background p-4">
          <span className="text-sm font-medium">Categories:</span>
          {CATEGORIES.map((c) => (
            <span key={c.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-3 rounded-full border border-background" style={{ backgroundColor: c.color }} />
              {CATEGORY_LABEL[c.id]}
            </span>
          ))}
        </div>
      </Card>
    </section>
  )
}
