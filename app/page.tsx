import { Navbar } from "@/components/civiceye/navbar"
import { Hero } from "@/components/civiceye/hero"
import { Stats } from "@/components/civiceye/stats"
import { About } from "@/components/civiceye/about"
import { Services } from "@/components/civiceye/services"
import { ReportIssue } from "@/components/civiceye/report-issue"
import { AiFeatures } from "@/components/civiceye/ai-features"
import { Dashboard } from "@/components/civiceye/dashboard"
import { CityMap } from "@/components/civiceye/city-map"
import { FutureScope } from "@/components/civiceye/future-scope"
import { Contact } from "@/components/civiceye/contact"
import { Footer } from "@/components/civiceye/footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Services />
        <ReportIssue />
        <AiFeatures />
        <Dashboard />
        <CityMap />
        <FutureScope />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
