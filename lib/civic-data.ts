import {
  Trash2,
  Lightbulb,
  Construction,
  Droplets,
  TreePine,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react"

export type CategoryId =
  | "garbage"
  | "streetlight"
  | "pothole"
  | "water"
  | "tree"
  | "safety"

export type Category = {
  id: CategoryId
  label: string
  description: string
  icon: LucideIcon
  /** hex used for map markers + chart accents */
  color: string
}

export const CATEGORIES: Category[] = [
  {
    id: "garbage",
    label: "Garbage Reporting",
    description: "Report uncollected waste, overflowing bins, and illegal dumping spots.",
    icon: Trash2,
    color: "#16a34a",
  },
  {
    id: "streetlight",
    label: "Streetlight Monitoring",
    description: "Flag broken, flickering, or perpetually-on public streetlights.",
    icon: Lightbulb,
    color: "#d97706",
  },
  {
    id: "pothole",
    label: "Pothole Reporting",
    description: "Mark damaged roads and potholes that endanger commuters.",
    icon: Construction,
    color: "#dc2626",
  },
  {
    id: "water",
    label: "Water Leakage Reporting",
    description: "Report pipeline bursts, leakages, and water wastage in your area.",
    icon: Droplets,
    color: "#0284c7",
  },
  {
    id: "tree",
    label: "Fallen Trees & Obstructions",
    description: "Notify authorities about fallen trees and blocked pathways.",
    icon: TreePine,
    color: "#15803d",
  },
  {
    id: "safety",
    label: "Public Safety Hazards",
    description: "Raise exposed wires, open manholes, and other safety hazards.",
    icon: ShieldAlert,
    color: "#7c3aed",
  },
]

export const CATEGORY_LABEL: Record<CategoryId, string> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c.label.replace(/ (Reporting|Monitoring|& Obstructions|Hazards)/, "") }),
  {} as Record<CategoryId, string>,
)

export const CATEGORY_COLOR: Record<CategoryId, string> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c.color }),
  {} as Record<CategoryId, string>,
)

export type Status = "Submitted" | "Under Review" | "In Progress" | "Resolved"

export const STATUSES: Status[] = ["Submitted", "Under Review", "In Progress", "Resolved"]

export const STATUS_STYLES: Record<Status, string> = {
  Submitted: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  "Under Review": "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  "In Progress": "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  Resolved: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
}

export type Complaint = {
  id: string
  category: CategoryId
  location: string
  lat: number
  lng: number
  date: string
  status: Status
}

/** Sample complaints used by the dashboard and map (centered around a sample city). */
export const SAMPLE_COMPLAINTS: Complaint[] = [
  { id: "CIV-2026-1042", category: "pothole", location: "MG Road, Sector 14", lat: 28.4595, lng: 77.0266, date: "2026-06-02", status: "In Progress" },
  { id: "CIV-2026-1039", category: "garbage", location: "Green Park Market", lat: 28.4625, lng: 77.0312, date: "2026-06-01", status: "Resolved" },
  { id: "CIV-2026-1036", category: "streetlight", location: "Civil Lines Ave", lat: 28.4561, lng: 77.0205, date: "2026-05-30", status: "Under Review" },
  { id: "CIV-2026-1031", category: "water", location: "Rajiv Chowk Block C", lat: 28.4648, lng: 77.0241, date: "2026-05-29", status: "Submitted" },
  { id: "CIV-2026-1028", category: "safety", location: "Station Road Underpass", lat: 28.4512, lng: 77.0298, date: "2026-05-27", status: "In Progress" },
  { id: "CIV-2026-1024", category: "tree", location: "Lakeview Boulevard", lat: 28.4583, lng: 77.0349, date: "2026-05-26", status: "Resolved" },
  { id: "CIV-2026-1019", category: "garbage", location: "Industrial Area Ph-2", lat: 28.4677, lng: 77.0188, date: "2026-05-24", status: "Under Review" },
  { id: "CIV-2026-1012", category: "pothole", location: "Ring Road Jn 7", lat: 28.4529, lng: 77.0223, date: "2026-05-22", status: "Submitted" },
  { id: "CIV-2026-1007", category: "streetlight", location: "Heritage Colony", lat: 28.4609, lng: 77.0357, date: "2026-05-20", status: "Resolved" },
  { id: "CIV-2026-1003", category: "water", location: "Riverside Quarter", lat: 28.4556, lng: 77.0371, date: "2026-05-18", status: "In Progress" },
  { id: "CIV-2026-0998", category: "safety", location: "Old Bus Depot", lat: 28.4662, lng: 77.0279, date: "2026-05-16", status: "Resolved" },
  { id: "CIV-2026-0991", category: "tree", location: "Botanical Garden Gate 3", lat: 28.4598, lng: 77.0192, date: "2026-05-14", status: "Submitted" },
]

export const CITY_CENTER: [number, number] = [28.459, 77.028]

export function generateComplaintId() {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `CIV-${year}-${rand}`
}
