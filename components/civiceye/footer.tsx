import { AtSign, Globe, MessageCircle, ScanEye, Send, Share2 } from "lucide-react"

const SOCIALS = [
  { icon: Share2, label: "Share", href: "#" },
  { icon: MessageCircle, label: "Community", href: "#" },
  { icon: AtSign, label: "Email", href: "#" },
  { icon: Globe, label: "Website", href: "#" },
  { icon: Send, label: "Updates", href: "#" },
]

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Report Issue", href: "#report" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ScanEye className="size-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                CivicEye <span className="text-primary">AI</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AI-powered civic issue reporting that connects citizens with municipal
              authorities for cleaner, safer, smarter cities.
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            <span className="text-sm font-semibold">Quick Links</span>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 CivicEye AI. Building Smarter Cities Together.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
