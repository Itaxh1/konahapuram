"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Sun, Moon, Info, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import MiniMap from "@/components/mini-map"
import { useMobile } from "@/hooks/use-mobile"

// Function to handle font loading errors
function handleFontLoadingError() {
  console.log("Setting up font fallbacks")

  // Add a global error handler for font loading
  window.addEventListener(
    "error",
    (event) => {
      // Check if this is a font loading error
      if (
        event.target &&
        ((event.target.tagName === "LINK" && event.target.rel === "stylesheet") ||
          event.target.tagName === "STYLE" ||
          (event.message && event.message.includes("font")))
      ) {
        console.warn("Font resource failed to load:", event)
        event.preventDefault() // Prevent the error from propagating
      }
    },
    true,
  )
}

// Update the LoadingScreen component
function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-blue-900 to-black dark:from-black dark:to-gray-900 dark:akatsuki-bg">
      <div className="rounded-lg bg-black/70 p-6 text-center dark:border dark:border-red-900">
        <div className="mx-auto h-16 w-16 animate-pulse">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <path
              d="M50 15 L85 85 L15 85 Z"
              fill="none"
              stroke="#FF9800"
              strokeWidth="5"
              strokeLinejoin="round"
              className="dark:stroke-red-600"
            />
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#FF9800"
              strokeWidth="5"
              className="dark:stroke-red-600"
            />
          </svg>
        </div>
        <span className="mt-4 block font-bold text-xl text-white">Loading Konahapuram...</span>
        <div className="mt-4 h-2 w-64 rounded-full bg-gray-700">
          <div
            className="h-2 rounded-full bg-orange-500 transition-all duration-300 dark:bg-red-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Dynamically import the 3D scene with no SSR
const NarutoScene = dynamic(() => import("@/components/naruto-scene"), {
  ssr: false,
  loading: () => <LoadingScreen />,
})

// Update the FallbackContent component to include the mini-map
function FallbackContent({ isDayMode, onSelectLocation, mapLocations, currentLocation }) {
  // Simulated player position for 2D view
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0])
  const isMobile = useMobile()

  return (
    <div className={`min-h-screen p-4 md:p-8 ${isDayMode ? "bg-amber-50" : "bg-gray-900 text-white akatsuki-bg"}`}>
      <h1 className="mb-6 text-center font-bold text-3xl md:text-4xl dark:text-red-600">Konahapuram</h1>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(locationData).map(([id, data]) => (
          <Card
            key={id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              isDayMode ? "" : "bg-gray-800 text-white border-red-900"
            }`}
            onClick={() => onSelectLocation(id)}
          >
            <CardHeader className="pb-2 p-4">
              <CardTitle className={`font-bold text-base md:text-lg ${isDayMode ? "text-orange-600" : "text-red-600"}`}>
                {data.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className={`text-sm md:text-base ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
                {isMobile ? data.description.substring(0, 60) + "..." : data.description.substring(0, 100) + "..."}
              </CardDescription>
              <div className="mt-3 flex flex-wrap gap-1 md:gap-2">
                {data.skills.slice(0, isMobile ? 2 : 3).map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      isDayMode ? "bg-orange-100 text-orange-800" : "bg-red-900/60 text-red-100"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Updated location data based on the village map
const locationData = {
  konohaVillage: {
    title: "The Summary Hall (Central Castle)",
    description:
      "Software engineer with Angular, Node.js & Cloud expertise. Passionate about scalable, secure, and efficient systems.",
    skills: ["Angular", "Node.js", "Cloud Infrastructure", "UI/UX", "TypeScript"],
  },
  education: {
    title: "Education Tower",
    description:
      "🟧 Oregon State University - MEng in Computer Science (2022–2025) – GPA: 3.7\n🟦 Hindustan Institute of Technology and Science - BTech in Computer Science (2018–2022) – CGPA: 8.6",
    skills: ["Computer Science", "Oregon State University", "Hindustan Institute of Technology"],
  },
  oregonState: {
    title: "Oregon State University",
    description:
      "Web Developer (Oct 2024 - Present): Angular 14 & Drupal 10 web revamp. Improved load times by 40%, session durations by 50%. Reduced bounce rate by 25% using Monsido.",
    skills: ["Angular 14", "Drupal 10", "Web Performance", "UX Optimization"],
  },
  agrosperity: {
    title: "Agrosperity KIVI",
    description:
      "Associate Software Developer (Jun 2022 - Aug 2023): Scaled user base from 300 to 10,000. Built VPC, Nginx, PostgreSQL, and firewall infra. Created 20+ modular Angular apps (Microfrontends). Automated CI/CD with GitLab & Docker.",
    skills: ["Angular", "GitLab CI/CD", "PostgreSQL", "Microfrontends", "Docker"],
  },
  hakatours: {
    title: "HakaTours New Zealand",
    description:
      "UI/UX Intern (Mar 2020 - Oct 2020): Revamped eCommerce UX with A/B testing. Integrated Stripe/PayPal. Boosted mobile usability and conversion by 20%.",
    skills: ["UI/UX Design", "Payment Integration", "A/B Testing", "Mobile Optimization"],
  },
  projects: {
    title: "Projects Square",
    description:
      "🧪 SCARR Framework (Open Source): Accelerated Python algorithms with multicore profiling. Used Numba, NJIT, Intel VTune for 30% speedup.\n🤖 DeepSeeker Scraper & AI v1: Stack Overflow/Medium answer aggregator with RAG-based AI.\n📚 Library Content Manager: Node.js, MongoDB, RabbitMQ microservices.",
    skills: ["Python Optimization", "RAG-based AI", "Microservices", "Node.js", "MongoDB"],
  },
  skills: {
    title: "Skill Forge (Workshop Area)",
    description:
      "Languages: Python, JavaScript, TypeScript\nFrameworks & Tools: Angular, React, Django, Firebase, Docker, RabbitMQ\nPlatforms & DBs: GCP, AWS, PostgreSQL, MongoDB\nCI/CD: GitLab CI/CD, Git, Bash, SonarQube, Sentry",
    skills: ["Python", "JavaScript", "Angular", "React", "Cloud Platforms", "Docker"],
  },
  certifications: {
    title: "Certification Shrine",
    description:
      "🎓 Cyber Security & Forensics (Wireshark, QRadar, SolarWinds) – 2022\n☁️ Google Cloud Essentials – Kubernetes, WAF, Monitoring – 2022",
    skills: ["Cyber Security", "Google Cloud", "Kubernetes", "Cloud Monitoring"],
  },
}

// Location data for the mini-map with positions
const mapLocations = [
  { id: "konohaVillage", name: "Summary Hall", position: [0, 0, 0] },
  { id: "education", name: "Education Tower", position: [-50, 0, -50] },
  { id: "oregonState", name: "Oregon State", position: [50, 0, -50] },
  { id: "agrosperity", name: "Agrosperity", position: [50, 0, 50] },
  { id: "hakatours", name: "Hakatours", position: [-50, 0, 50] },
  { id: "projects", name: "Projects Square", position: [0, 0, 50] },
  { id: "skills", name: "Skill Forge", position: [0, 0, -50] },
  { id: "certifications", name: "Certification Shrine", position: [-50, 0, 0] },
  { id: "gate", name: "Village Gate", position: [0, 0, -70] },
]

// Update the main VillagePage component
export default function VillagePage() {
  const isMobile = useMobile()
  const [isDayMode, setIsDayMode] = useState(true)
  const [activeLocation, setActiveLocation] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showLegend, setShowLegend] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [use3D, setUse3D] = useState(true)
  const [miniMapExpanded, setMiniMapExpanded] = useState(false)
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0])
  const [playerRotation, setPlayerRotation] = useState(0)

  // Show info panel after a short delay when a location is selected
  useEffect(() => {
    handleFontLoadingError()
    if (activeLocation) {
      const timer = setTimeout(() => {
        setShowInfo(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setShowInfo(false)
    }
  }, [activeLocation])

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Shorter loading time
    return () => clearTimeout(timer)
  }, [])

  // Handle 3D scene errors
  const handleCanvasError = (error) => {
    console.error("Canvas error:", error)
    setHasError(true)
    setUse3D(false)
  }

  // Toggle between 3D and 2D view
  const toggle3D = () => {
    setUse3D(!use3D)
    if (!use3D) {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 2000)
    }
  }

  // Handle location selection without stopping movement
  const handleLocationSelect = (locationId) => {
    setActiveLocation(locationId)
    // Don't do anything else that would interrupt movement
  }

  const handlePlayerPositionUpdate = (position, rotation) => {
    setPlayerPosition(position)
    setPlayerRotation(rotation)
  }

  return (
    <main className={`relative min-h-screen ${isDayMode ? "bg-sky-100" : "bg-gray-900 akatsuki-bg"}`}>
      {/* Navigation and controls */}
      <div className="absolute left-2 right-2 top-2 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/">
            <Button
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className="flex items-center gap-1 bg-white/80 backdrop-blur-sm dark:bg-black/80 dark:border-red-900 dark:text-white"
            >
              <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
              Back
            </Button>
          </Link>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="flex items-center gap-1 bg-white/80 backdrop-blur-sm dark:bg-black/80 dark:border-red-900 dark:text-white"
            onClick={() => setShowLegend(!showLegend)}
          >
            <Info className="h-3 w-3 md:h-4 md:w-4" />
            {isMobile ? "Legend" : "Map Legend"}
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="flex items-center gap-1 bg-white/80 backdrop-blur-sm dark:bg-black/80 dark:border-red-900 dark:text-white"
            onClick={() => setShowControls(!showControls)}
          >
            <Keyboard className="h-3 w-3 md:h-4 md:w-4" />
            {isMobile ? "Controls" : "Controls"}
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="flex items-center gap-1 bg-white/80 backdrop-blur-sm dark:bg-black/80 dark:border-red-900 dark:text-white"
            onClick={toggle3D}
          >
            {use3D ? "2D View" : "3D View"}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-white/80 px-2 py-1 shadow-lg backdrop-blur-sm dark:bg-black/80 dark:border-red-900">
            <Sun className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
            <Switch
              checked={!isDayMode}
              onCheckedChange={(checked) => setIsDayMode(!checked)}
              aria-label="Toggle day/night mode"
            />
            <Moon className="h-3 w-3 md:h-4 md:w-4 text-blue-800 dark:text-red-600" />
          </div>
          {!isDayMode && (
            <div className="rounded-lg bg-red-800/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm flex items-center gap-1 border border-red-900">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse"
              >
                <path d="M12 2L2 12H6V19H18V12H22L12 2Z" fill="currentColor" />
              </svg>
              {isMobile ? "Akatsuki" : "Akatsuki Mode Active"}
            </div>
          )}
        </div>
      </div>

      {/* Map Legend */}
      {showLegend && (
        <div className="absolute left-4 top-16 z-10 max-h-[80vh] w-64 overflow-auto rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur-sm dark:bg-black/90 dark:text-white dark:border dark:border-red-900">
          <h3 className="mb-3 font-bold text-lg dark:text-red-600">Village Map Legend</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-orange-600 dark:text-red-500">Konahapuram</h4>
              <p className="text-sm mb-2">
                Explore the different buildings to learn about Ashwin's skills, experience, and projects.
              </p>
              <ul className="ml-4 list-disc text-sm">
                <li>Center - The Summary Hall (Central Castle)</li>
                <li>North - Skill Forge (Workshop Area)</li>
                <li>East - Work Experience District</li>
                <li>South - Projects Square</li>
                <li>West - Certification Shrine</li>
                <li>Northwest - Education Tower</li>
              </ul>
            </div>
          </div>
          <Button className="mt-3 w-full" variant="outline" onClick={() => setShowLegend(false)}>
            Close Legend
          </Button>
        </div>
      )}

      {/* Controls Modal */}
      {showControls && (
        <div className="absolute left-4 top-16 z-10 max-h-[80vh] w-64 overflow-auto rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur-sm dark:bg-black/90 dark:text-white dark:border dark:border-red-900">
          <h3 className="mb-3 font-bold text-lg dark:text-red-600">Controls</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-orange-600 dark:text-red-500">Movement</h4>
              <ul className="ml-4 list-disc text-sm">
                <li>
                  <kbd className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700">W</kbd> - Move Backward
                </li>
                <li>
                  <kbd className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700">S</kbd> - Move Forward
                </li>
                <li>
                  <kbd className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700">A</kbd> - Turn Left
                </li>
                <li>
                  <kbd className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700">D</kbd> - Turn Right
                </li>
              </ul>

              <h4 className="mt-2 font-semibold text-orange-600 dark:text-red-500">Camera</h4>
              <ul className="ml-4 list-disc text-sm">
                <li>
                  Hold <kbd className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700">Left Mouse Button</kbd> and move
                  mouse to look around
                </li>
              </ul>

              <h4 className="mt-2 font-semibold text-orange-600 dark:text-red-500">Interaction</h4>
              <ul className="ml-4 list-disc text-sm">
                <li>Click on buildings to view details</li>
                <li>Approach buildings to see their labels</li>
              </ul>
            </div>
          </div>
          <Button className="mt-3 w-full" variant="outline" onClick={() => setShowControls(false)}>
            Close Controls
          </Button>
        </div>
      )}

      {/* 3D Village Scene or Loading Screen or Fallback */}
      <div className="h-screen w-full">
        {isLoading ? (
          <LoadingScreen />
        ) : hasError || !use3D ? (
          <FallbackContent
            isDayMode={isDayMode}
            onSelectLocation={handleLocationSelect}
            mapLocations={mapLocations}
            currentLocation={activeLocation}
          />
        ) : (
          <NarutoScene
            isDayMode={isDayMode}
            onSelectLocation={handleLocationSelect}
            onError={handleCanvasError}
            onPlayerPositionUpdate={handlePlayerPositionUpdate}
          />
        )}
      </div>

      {/* Location Info Panel */}
      <AnimatedInfoPanel
        activeLocation={activeLocation}
        showInfo={showInfo}
        onClose={() => setActiveLocation(null)}
        isDayMode={isDayMode}
      />

      {/* Mini-map */}
      <MiniMap
        playerPosition={playerPosition}
        playerRotation={playerRotation}
        isDayMode={isDayMode}
        locations={mapLocations}
        currentLocation={activeLocation}
        isExpanded={miniMapExpanded}
        onToggleExpand={() => setMiniMapExpanded(!miniMapExpanded)}
      />
    </main>
  )
}

// Update the AnimatedInfoPanel component
function AnimatedInfoPanel({ activeLocation, showInfo, onClose, isDayMode }) {
  const isMobile = useMobile()

  if (!activeLocation) return null

  const locationInfo = locationData[activeLocation]
  if (!locationInfo) return null

  return (
    <motion.div
      className={`absolute bottom-16 left-1/2 z-20 w-[95%] max-w-2xl -translate-x-1/2 rounded-lg p-4 md:p-6 shadow-xl ${
        isDayMode ? "bg-white/90" : "bg-black/90 border border-red-900"
      } backdrop-blur-md`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: showInfo ? 1 : 0, y: showInfo ? 0 : 50 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-1 top-1 dark:text-red-500 dark:hover:bg-red-950/50"
        onClick={onClose}
        aria-label="Close panel"
      >
        ✕
      </Button>
      <h2 className={`mb-2 md:mb-4 font-bold text-xl md:text-2xl ${isDayMode ? "text-orange-600" : "text-red-600"}`}>
        {locationInfo.title}
      </h2>
      <div
        className={`mb-3 md:mb-4 whitespace-pre-line text-sm md:text-base ${isDayMode ? "text-gray-700" : "text-gray-200"}`}
      >
        {isMobile ? locationInfo.description.split("\n")[0] : locationInfo.description}
      </div>
      <div className="flex flex-wrap gap-1 md:gap-2">
        {locationInfo.skills.slice(0, isMobile ? 4 : locationInfo.skills.length).map((skill) => (
          <span
            key={skill}
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              isDayMode ? "bg-orange-100 text-orange-800" : "bg-red-900/60 text-red-100"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
