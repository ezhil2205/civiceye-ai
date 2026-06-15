"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import type { MapMarker } from "./leaflet-map"

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
      <Loader2 className="size-5 animate-spin" />
      <span className="ml-2 text-sm">Loading map…</span>
    </div>
  ),
})

type Props = {
  center: [number, number]
  zoom?: number
  markers: MapMarker[]
  className?: string
}

export function MapView(props: Props) {
  return <LeafletMap {...props} />
}

export type { MapMarker }
