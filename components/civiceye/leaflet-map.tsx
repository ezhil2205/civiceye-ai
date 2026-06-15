"use client"

import { useMemo } from "react"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"

export type MapMarker = {
  id: string
  lat: number
  lng: number
  color: string
  title: string
  subtitle?: string
}

function pinIcon(color: string) {
  return L.divIcon({
    className: "civic-pin",
    html: `<span style="
      display:flex;align-items:center;justify-content:center;
      width:22px;height:22px;border-radius:9999px;
      background:${color};border:2px solid #fff;
      box-shadow:0 1px 4px rgba(0,0,0,.4);"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12],
  })
}

function Recenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

type Props = {
  center: [number, number]
  zoom?: number
  markers: MapMarker[]
  className?: string
}

export default function LeafletMap({ center, zoom = 14, markers, className }: Props) {
  const icons = useMemo(() => {
    const cache: Record<string, L.DivIcon> = {}
    for (const m of markers) {
      if (!cache[m.color]) cache[m.color] = pinIcon(m.color)
    }
    return cache
  }, [markers])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className={className}
      style={{ height: "100%", width: "100%" }}
    >
      <Recenter center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={icons[m.color]}>
          <Popup>
            <strong>{m.title}</strong>
            {m.subtitle ? <div>{m.subtitle}</div> : null}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
