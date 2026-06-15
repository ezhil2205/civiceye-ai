"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  Camera,
  CameraOff,
  CheckCircle2,
  Loader2,
  LocateFixed,
  MapPin,
  RefreshCw,
  Send,
  TriangleAlert,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES, generateComplaintId, type CategoryId } from "@/lib/civic-data"
import { MapView } from "./map-view"
import { SectionHeading } from "./section-heading"

type Coords = { lat: number; lng: number; accuracy: number }

export function ReportIssue() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [cameraOn, setCameraOn] = useState(false)
  const [cameraLoading, setCameraLoading] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [captured, setCaptured] = useState<string | null>(null)

  const [coords, setCoords] = useState<Coords | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)

  const [category, setCategory] = useState<CategoryId | "">("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [complaintId, setComplaintId] = useState<string | null>(null)

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraOn(false)
  }, [])

  useEffect(() => () => stopCamera(), [stopCamera])

  const openCamera = useCallback(async () => {
    setCameraError(null)
    setCaptured(null)

    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "Camera is not available. Please use a modern browser over a secure (HTTPS) connection.",
      )
      return
    }

    setCameraLoading(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      })
      streamRef.current = stream
      setCameraOn(true)
      // Wait for the element to mount before attaching the stream.
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
        }
      })
    } catch (err) {
      const error = err as DOMException
      if (error.name === "NotAllowedError" || error.name === "SecurityError") {
        setCameraError(
          "Camera permission was denied. Please allow camera access in your browser settings and try again.",
        )
      } else if (error.name === "NotFoundError") {
        setCameraError("No camera device was found on this device.")
      } else {
        setCameraError("Unable to access the camera. Please try again.")
      }
    } finally {
      setCameraLoading(false)
    }
  }, [])

  const captureImage = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.videoWidth) {
      toast.error("Please wait for the camera preview to load before capturing.")
      return
    }
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    setCaptured(canvas.toDataURL("image/jpeg", 0.85))
    stopCamera()
    toast.success("Image captured.")
  }, [stopCamera])

  const detectLocation = useCallback(() => {
    setGeoError(null)
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoError("Geolocation is not supported by this browser.")
      return
    }
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
        setGeoLoading(false)
        toast.success("Location detected.")
      },
      (err) => {
        setGeoLoading(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError("Location permission denied. Please enable location access and retry.")
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGeoError("Location information is currently unavailable.")
        } else {
          setGeoError("Unable to fetch your location. Please try again.")
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }, [])

  const canSubmit = Boolean(captured && coords && category && !submitting)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!captured) return toast.error("Please capture an image of the issue.")
      if (!coords) return toast.error("Please detect your GPS location.")
      if (!category) return toast.error("Please select an issue category.")

      setSubmitting(true)
      // Simulated submission (no backend available — sample workflow).
      setTimeout(() => {
        const id = generateComplaintId()
        setComplaintId(id)
        setSubmitting(false)
        toast.success("Complaint submitted successfully.")
      }, 1200)
    },
    [captured, coords, category],
  )

  const resetForm = useCallback(() => {
    stopCamera()
    setCaptured(null)
    setCoords(null)
    setCategory("")
    setDescription("")
    setComplaintId(null)
    setCameraError(null)
    setGeoError(null)
  }, [stopCamera])

  if (complaintId) {
    return (
      <section id="report" className="scroll-mt-20 border-y border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-8" />
          </span>
          <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
            Your complaint has been successfully submitted to the municipal authority.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Keep your Complaint ID to track the status in the dashboard.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-border bg-background px-6 py-4">
            <span className="text-sm text-muted-foreground">Complaint ID</span>
            <span className="font-mono text-lg font-semibold text-primary">{complaintId}</span>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={resetForm}>
              <RefreshCw className="size-4" />
              Report another issue
            </Button>
            <Button variant="outline" render={<a href="#dashboard" />}>
              View dashboard
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="report" className="scroll-mt-20 border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Report Issue"
          title="Report a civic issue in seconds"
          description="Capture the issue live with your camera, auto-detect your GPS location, and submit it straight to your municipal authority."
        />

        <form onSubmit={handleSubmit} className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Camera + Location column */}
          <div className="flex flex-col gap-6">
            <Card className="border-border">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Live Camera Capture</Label>
                  <span className="text-xs text-muted-foreground">Camera only · no uploads</span>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
                  {captured ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={captured} alt="Captured civic issue preview" className="h-full w-full object-cover" />
                  ) : (
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className={`h-full w-full object-cover ${cameraOn ? "" : "hidden"}`}
                    />
                  )}

                  {!cameraOn && !captured && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      {cameraLoading ? (
                        <>
                          <Loader2 className="size-7 animate-spin" />
                          <span className="text-sm">Starting camera…</span>
                        </>
                      ) : (
                        <>
                          <Camera className="size-8" />
                          <span className="text-sm">Camera preview will appear here</span>
                        </>
                      )}
                    </div>
                  )}

                  {cameraOn && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur">
                      <span className="size-2 animate-pulse rounded-full bg-red-500" />
                      Live
                    </span>
                  )}
                </div>

                {cameraError && (
                  <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                    {cameraError}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  {!captured ? (
                    <>
                      <Button
                        type="button"
                        variant={cameraOn ? "outline" : "default"}
                        onClick={cameraOn ? stopCamera : openCamera}
                        disabled={cameraLoading}
                      >
                        {cameraOn ? <CameraOff className="size-4" /> : <Camera className="size-4" />}
                        {cameraOn ? "Close Camera" : "Open Camera"}
                      </Button>
                      <Button type="button" onClick={captureImage} disabled={!cameraOn}>
                        Capture Image
                      </Button>
                    </>
                  ) : (
                    <Button type="button" variant="outline" onClick={openCamera}>
                      <RefreshCw className="size-4" />
                      Retake
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Auto GPS Location</Label>
                  <Button type="button" size="sm" variant="outline" onClick={detectLocation} disabled={geoLoading}>
                    {geoLoading ? <Loader2 className="size-3.5 animate-spin" /> : <LocateFixed className="size-3.5" />}
                    Detect Location
                  </Button>
                </div>

                {geoError && (
                  <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                    {geoError}
                  </p>
                )}

                {coords ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-border bg-background p-3">
                        <p className="text-xs text-muted-foreground">Latitude</p>
                        <p className="font-mono text-sm font-semibold">{coords.lat.toFixed(6)}</p>
                      </div>
                      <div className="rounded-lg border border-border bg-background p-3">
                        <p className="text-xs text-muted-foreground">Longitude</p>
                        <p className="font-mono text-sm font-semibold">{coords.lng.toFixed(6)}</p>
                      </div>
                    </div>
                    <div className="h-44 w-full overflow-hidden rounded-xl border border-border">
                      <MapView
                        center={[coords.lat, coords.lng]}
                        zoom={16}
                        markers={[
                          {
                            id: "me",
                            lat: coords.lat,
                            lng: coords.lng,
                            color: "#0284c7",
                            title: "Your reported location",
                          },
                        ]}
                        className="h-full w-full"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground">
                    <MapPin className="size-6" />
                    <span className="text-sm">Detect your location to preview it on the map</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Form column */}
          <Card className="border-border lg:sticky lg:top-24 lg:self-start">
            <CardContent className="flex flex-col gap-5 p-5">
              <h3 className="text-lg font-semibold">Complaint Details</h3>

              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Issue Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as CategoryId)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue, landmarks, and severity…"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Photo evidence</span>
                  <span className={captured ? "font-medium text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}>
                    {captured ? "Captured" : "Required"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">GPS location</span>
                  <span className={coords ? "font-medium text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}>
                    {coords ? "Detected" : "Required"}
                  </span>
                </div>
              </div>

              <Button type="submit" size="lg" className="h-11" disabled={!canSubmit}>
                {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                {submitting ? "Submitting…" : "Submit Complaint"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Your report is routed to the relevant municipal department with AI-assigned priority.
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </section>
  )
}
