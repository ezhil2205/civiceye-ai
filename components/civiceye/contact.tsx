"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeading } from "./section-heading"

type Errors = { name?: string; email?: string; message?: string }

const CONTACT_INFO = [
  { icon: Mail, label: "support@civiceye.ai" },
  { icon: Phone, label: "+1 (555) 012-3456" },
  { icon: MapPin, label: "Smart City Civic Center, Block A" },
]

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<Errors>({})

  const validate = (): Errors => {
    const next: Errors = {}
    if (!form.name.trim()) next.name = "Please enter your name."
    if (!form.email.trim()) next.email = "Please enter your email."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address."
    if (!form.message.trim()) next.message = "Please enter a message."
    else if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters."
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    toast.success("Thanks! Your message has been sent.")
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Questions, partnerships, or feedback? Reach out and our team will respond shortly."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          {CONTACT_INFO.map((info) => (
            <Card key={info.label} className="border-border">
              <CardContent className="flex items-center gap-4 p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <info.icon className="size-5" />
                </span>
                <span className="text-sm font-medium">{info.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  aria-invalid={!!errors.message}
                  placeholder="How can we help?"
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" size="lg" className="h-11 self-start px-6">
                <Send className="size-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
