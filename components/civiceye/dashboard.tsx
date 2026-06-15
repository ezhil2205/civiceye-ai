"use client"

import { useMemo, useState } from "react"
import { Cell, Pie, PieChart, Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import {
  SAMPLE_COMPLAINTS,
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_COLOR,
  STATUSES,
  STATUS_STYLES,
  type CategoryId,
  type Status,
} from "@/lib/civic-data"
import { SectionHeading } from "./section-heading"

const statusColors: Record<Status, string> = {
  Submitted: "#0ea5e9",
  "Under Review": "#d97706",
  "In Progress": "#2563eb",
  Resolved: "#16a34a",
}

export function Dashboard() {
  const [category, setCategory] = useState<CategoryId | "all">("all")
  const [status, setStatus] = useState<Status | "all">("all")
  const [fromDate, setFromDate] = useState("")

  const filtered = useMemo(() => {
    return SAMPLE_COMPLAINTS.filter((c) => {
      if (category !== "all" && c.category !== category) return false
      if (status !== "all" && c.status !== status) return false
      if (fromDate && c.date < fromDate) return false
      return true
    })
  }, [category, status, fromDate])

  const categoryData = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        key: c.id,
        name: CATEGORY_LABEL[c.id],
        value: filtered.filter((x) => x.category === c.id).length,
        fill: CATEGORY_COLOR[c.id],
      })).filter((d) => d.value > 0),
    [filtered],
  )

  const statusData = useMemo(
    () =>
      STATUSES.map((s) => ({
        name: s,
        value: filtered.filter((x) => x.status === s).length,
        fill: statusColors[s],
      })),
    [filtered],
  )

  const categoryConfig: ChartConfig = CATEGORIES.reduce(
    (acc, c) => ({ ...acc, [c.id]: { label: CATEGORY_LABEL[c.id], color: c.color } }),
    {} as ChartConfig,
  )

  const statusConfig: ChartConfig = { value: { label: "Complaints" } }

  const resetFilters = () => {
    setCategory("all")
    setStatus("all")
    setFromDate("")
  }

  return (
    <section id="dashboard" className="scroll-mt-20 border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dashboard"
          title="Track complaints in real time"
          description="Monitor every reported issue, filter by category, status, or date, and visualize civic trends across the city."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 sm:flex-row sm:items-end">
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="filter-category" className="text-xs">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as CategoryId | "all")}>
              <SelectTrigger id="filter-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{CATEGORY_LABEL[c.id]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="filter-status" className="text-xs">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as Status | "all")}>
              <SelectTrigger id="filter-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="filter-date" className="text-xs">From date</Label>
            <Input
              id="filter-date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={resetFilters}>Reset</Button>
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Complaints by Category</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryData.length ? (
                <ChartContainer config={categoryConfig} className="mx-auto aspect-square max-h-72">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={55} strokeWidth={2}>
                      {categoryData.map((entry) => (
                        <Cell key={entry.key} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              ) : (
                <p className="py-16 text-center text-sm text-muted-foreground">No complaints match the filters.</p>
              )}
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {categoryData.map((d) => (
                  <span key={d.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                    {d.name} ({d.value})
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Complaints by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={statusConfig} className="max-h-72 w-full">
                <BarChart data={statusData} margin={{ left: -16, top: 8 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} interval={0} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} fontSize={11} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {statusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card className="mt-6 border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Complaints</span>
              <Badge variant="outline">{filtered.length} results</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Complaint ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs font-medium">{c.id}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2">
                          <span className="size-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLOR[c.category] }} />
                          {CATEGORY_LABEL[c.category]}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{c.location}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{c.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("font-medium", STATUS_STYLES[c.status])}>
                          {c.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!filtered.length && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                        No complaints match the selected filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
