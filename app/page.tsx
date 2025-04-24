"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  FileText,
  Code,
  Server,
  Cloud,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Keyboard,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"

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

// Loading component
function LoadingScreen() {
  console.log("LoadingScreen rendering")
  const [progress, setProgress] = useState(5)

  // Simulate loading progress
  useEffect(() => {
    console.log("LoadingScreen: Setting up progress interval")
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev >= 100 ? 100 : prev + 5
        console.log(`Loading progress: ${newProgress}%`)
        if (newProgress >= 100) {
          console.log("Loading complete, clearing interval")
          clearInterval(interval)
        }
        return newProgress
      })
    }, 200)

    return () => {
      console.log("LoadingScreen: Cleaning up progress interval")
      clearInterval(interval)
    }
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
        <span className="mt-4 block font-ninja text-xl text-white">Loading Konahapuram...</span>
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

// Fallback component for when 3D scene fails to load
function ThreeSceneFallback({ onGateClick }) {
  console.log("ThreeSceneFallback rendering")
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-900 to-black">
      <div className="text-center p-8 bg-black/70 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome to Konahapuram</h2>
        <p className="text-gray-300 mb-6">
          The 3D experience couldn't be loaded. This might be due to browser compatibility or system resources.
        </p>
        <Button onClick={onGateClick} className="bg-orange-600 hover:bg-orange-700">
          Enter Portfolio
        </Button>
      </div>
    </div>
  )
}

// Dynamically import ThreeScene with a timeout and debugging
const ThreeSceneWithErrorBoundary = dynamic(
  () => {
    console.log("Starting dynamic import of ThreeScene")

    // Add a timeout to prevent infinite loading
    return Promise.race([
      import("../components/three-scene")
        .then((mod) => {
          console.log("ThreeScene module loaded successfully")
          return mod.default
        })
        .catch((err) => {
          console.error("Error importing ThreeScene:", err)
          throw err
        }),
      new Promise((_, reject) =>
        setTimeout(() => {
          console.error("ThreeScene import timed out after 15 seconds")
          reject(new Error("Loading timeout"))
        }, 15000),
      ),
    ]).catch((err) => {
      console.error("Failed to load ThreeScene:", err)
      // Return a fallback component
      return ThreeSceneFallback
    })
  },
  {
    ssr: false,
    loading: () => {
      console.log("Showing loading component while ThreeScene imports")
      return <LoadingScreen />
    },
  },
)

export default function Home() {
  console.log("Home component rendering")
  const [gateOpened, setGateOpened] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isDayMode, setIsDayMode] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [has3DError, setHas3DError] = useState(false)
  const [errorDetails, setErrorDetails] = useState(null)
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0])
  const [playerRotation, setPlayerRotation] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    console.log("Home: Setting up loading progress interval")
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev >= 100 ? 100 : prev + 5
        console.log(`Home loading progress: ${newProgress}%`)
        if (newProgress >= 100) {
          console.log("Home loading complete, clearing interval")
          clearInterval(interval)
          setIsLoading(false)
        }
        return newProgress
      })
    }, 200)

    return () => {
      console.log("Home: Cleaning up loading progress interval")
      clearInterval(interval)
    }
  }, [])

  // Force loading to complete after a timeout
  useEffect(() => {
    console.log("Home: Setting up force loading timeout")
    const timer = setTimeout(() => {
      console.log("Force loading timeout triggered")
      setIsLoading(false)
    }, 8000) // Force loading to complete after 8 seconds

    return () => {
      console.log("Home: Cleaning up force loading timeout")
      clearTimeout(timer)
    }
  }, [])

  // Simulate player movement for demo purposes
  useEffect(() => {
    if (!gateOpened) {
      const interval = setInterval(() => {
        setPlayerPosition([Math.sin(Date.now() / 5000) * 30, 0, Math.cos(Date.now() / 5000) * 30])
        setPlayerRotation(Date.now() / 1000)
      }, 100)

      return () => clearInterval(interval)
    }
  }, [gateOpened])

  // Debug browser and device info
  useEffect(() => {
    console.log("Browser and Device Information:")
    console.log("- User Agent:", navigator.userAgent)
    console.log("- Platform:", navigator.platform)
    console.log("- Vendor:", navigator.vendor)
    console.log("- Language:", navigator.language)
    console.log("- Screen Width:", window.screen.width)
    console.log("- Screen Height:", window.screen.height)
    console.log("- Window Width:", window.innerWidth)
    console.log("- Window Height:", window.innerHeight)
    console.log("- Device Pixel Ratio:", window.devicePixelRatio)
    console.log("- Memory:", navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Not available")

    // Check for WebGL support
    try {
      const canvas = document.createElement("canvas")
      const hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      )
      console.log("- WebGL Support:", hasWebGL ? "Yes" : "No")
    } catch (e) {
      console.log("- WebGL Support: Error checking -", e)
    }
  }, [])

  const handleGateClick = () => {
    console.log("Gate clicked, opening gate")
    setGateOpened(true)
    setTimeout(() => {
      console.log("Showing intro after gate animation")
      setShowIntro(true)
    }, 1500)
  }

  const handlePlayerReachedGate = () => {
    console.log("Player reached gate, triggering gate click")
    handleGateClick()
  }

  const handle3DError = (error) => {
    console.error("3D scene error detected:", error)
    setErrorDetails(error?.message || "Unknown error")
    setHas3DError(true)
    setIsLoading(false)
  }

  const handlePlayerPositionUpdate = (position, rotation) => {
    setPlayerPosition(position)
    setPlayerRotation(rotation)
  }

  console.log("Home render state:", { isLoading, gateOpened, showIntro, has3DError })

  return (
    <main className={`relative min-h-screen overflow-hidden ${isDayMode ? "bg-sky-100" : "bg-gray-900"}`}>
      {isLoading ? (
        <LoadingScreen />
      ) : !gateOpened ? (
        <div className="relative h-screen w-full">
          {/* Day/Night toggle */}
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 shadow-lg backdrop-blur-sm">
            <Sun className="h-4 w-4 text-yellow-500" />
            <Switch
              checked={!isDayMode}
              onCheckedChange={(checked) => {
                console.log(`Toggling day mode to: ${!checked}`)
                setIsDayMode(!checked)
              }}
              aria-label="Toggle day/night mode"
            />
            <Moon className="h-4 w-4 text-blue-800" />
          </div>

          {/* Controls button */}
          <div className="absolute left-4 top-4 z-10">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
              onClick={() => {
                console.log(`Toggling controls visibility to: ${!showControls}`)
                setShowControls(!showControls)
              }}
            >
              <Keyboard className="h-4 w-4" />
              Controls
            </Button>
          </div>

          {/* Debug info button */}
          <div className="absolute left-4 top-16 z-10">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
              onClick={() => {
                console.log("Current state:", {
                  isLoading,
                  gateOpened,
                  showIntro,
                  has3DError,
                  errorDetails,
                  isDayMode,
                  loadingProgress,
                })
                alert("Debug info logged to console")
              }}
            >
              Debug Info
            </Button>
          </div>

          {/* Controls modal */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/80 p-6 text-white backdrop-blur-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h3 className="mb-4 text-xl font-bold">Keyboard Controls</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 font-semibold">Movement:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <kbd className="rounded bg-gray-700 px-2 py-1">W</kbd>
                        <span>Move Forward</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <kbd className="rounded bg-gray-700 px-2 py-1">S</kbd>
                        <span>Move Backward</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <kbd className="rounded bg-gray-700 px-2 py-1">A</kbd>
                        <span>Move Left</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <kbd className="rounded bg-gray-700 px-2 py-1">D</kbd>
                        <span>Move Right</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold">Camera:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <kbd className="rounded bg-gray-700 px-2 py-1">V</kbd>
                        <span>Toggle Camera View</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button variant="secondary" onClick={() => setShowControls(false)}>
                    Close
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating instructions */}
          <motion.div
            className="absolute bottom-32 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-black/70 px-6 py-3 text-center text-white shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-lg">
              Use
              <kbd className="mx-1 rounded bg-gray-700 px-2 py-1">W</kbd>
              <kbd className="mx-1 rounded bg-gray-700 px-2 py-1">A</kbd>
              <kbd className="mx-1 rounded bg-gray-700 px-2 py-1">S</kbd>
              <kbd className="mx-1 rounded bg-gray-700 px-2 py-1">D</kbd>
              to move. Press
              <kbd className="mx-1 rounded bg-gray-700 px-2 py-1">V</kbd>
              to change camera view.
            </p>
            <p className="mt-2">Walk to the village gate to enter.</p>
          </motion.div>

          {/* Error message display if 3D scene fails */}
          {errorDetails && (
            <div className="absolute top-20 left-4 right-4 z-10 bg-red-900/80 text-white p-3 rounded-lg">
              <h3 className="font-bold">Error Loading 3D Scene:</h3>
              <p>{errorDetails}</p>
            </div>
          )}

          {has3DError ? (
            <ThreeSceneFallback onGateClick={handleGateClick} />
          ) : (
            <Suspense fallback={<LoadingScreen />}>
              <div className="h-screen w-full">
                <ThreeSceneWithErrorBoundary
                  onGateClick={handleGateClick}
                  isDayMode={isDayMode}
                  onPlayerReachedGate={handlePlayerReachedGate}
                  onError={handle3DError}
                  onPlayerPositionUpdate={handlePlayerPositionUpdate}
                />
              </div>
            </Suspense>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center text-white">
            <motion.h1
              className="mb-2 font-ninja text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Ashwin Kumar Uma Sankar
            </motion.h1>
            <motion.p className="text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              Software Engineer | Walk to the gate to enter
            </motion.p>
            <motion.div
              className="mt-4 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="h-4 w-64 rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      ) : showIntro ? (
        <PortfolioContent isDayMode={isDayMode} toggleDayMode={() => setIsDayMode(!isDayMode)} />
      ) : (
        <motion.div
          className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-blue-900 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="mb-4 text-6xl">🍃</div>
            <h2 className="font-ninja text-2xl font-bold text-white">Entering Konahapuram...</h2>
            <div className="mt-4 h-4 w-64 rounded-full bg-gray-700">
              <motion.div
                className="h-full rounded-full bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                onAnimationComplete={() => {
                  console.log("Transition animation complete, showing intro")
                  setShowIntro(true)
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </main>
  )
}

// Portfolio Content Component - This contains all the redesigned cards
function PortfolioContent({ isDayMode, toggleDayMode }) {
  console.log("PortfolioContent rendering with isDayMode:", isDayMode)
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0])
  const [playerRotation, setPlayerRotation] = useState(0)
  const isMobile = useMobile()

  // Simulate player movement for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerPosition([Math.sin(Date.now() / 5000) * 30, 0, Math.cos(Date.now() / 5000) * 30])
      setPlayerRotation(Date.now() / 1000)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`min-h-screen w-full py-4 sm:py-6 px-3 sm:px-4 md:px-8 ${
        isDayMode ? "bg-gradient-to-b from-blue-50 to-sky-100" : "akatsuki-bg bg-gradient-to-b from-gray-900 to-black"
      }`}
    >
      <div className="container mx-auto max-w-6xl space-y-4 sm:space-y-8">
        {/* 1. Hero Section (Top Bar) */}
        <HeroSection isDayMode={isDayMode} toggleDayMode={toggleDayMode} />

        {/* Main content grid - Stacked on mobile, grid on larger screens */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {/* Left column */}
          <div className="space-y-4 sm:space-y-6 order-2 md:order-1 md:col-span-1">
            {/* 2. About Me – Developer Persona Panel */}
            <AboutMeCard isDayMode={isDayMode} />

            {/* 5. Certifications & Tools Panel */}
            <CertificationsCard isDayMode={isDayMode} />
          </div>

          {/* Right column (wider) */}
          <div className="space-y-4 sm:space-y-6 order-1 md:order-2 md:col-span-2">
            {/* 3. Skills Grid */}
            <SkillsGrid isDayMode={isDayMode} />

            {/* 4. Interactive Konahapuram Map (Projects Portal) */}
            <ProjectsMap isDayMode={isDayMode} />
          </div>
        </div>

        {/* 6. Footer / Contact */}
        <FooterContact isDayMode={isDayMode} />
      </div>
    </div>
  )
}

// 1. Hero Section Component
function HeroSection({ isDayMode, toggleDayMode }) {
  const isMobile = useMobile()

  return (
    <div
      className={`rounded-lg p-4 sm:p-6 shadow-lg backdrop-blur-sm ${
        isDayMode ? "bg-white/80" : "bg-black/50 border border-red-900"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h1
              className={`font-ninja text-2xl sm:text-3xl font-bold ${isDayMode ? "text-orange-600" : "text-red-600"}`}
            >
              Ashwin Kumar Uma Sankar
            </h1>
            <p className={`mt-1 text-xs sm:text-sm md:text-base ${isDayMode ? "text-gray-600" : "text-gray-300"}`}>
              Software Engineer — Full Stack | Cloud-Native | UI/UX
            </p>
            <div className="flex flex-wrap mt-2 gap-2 sm:gap-3">
              <a
                href="https://github.com/Itaxh1"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-xs sm:text-sm ${
                  isDayMode ? "text-gray-700 hover:text-orange-600" : "text-gray-300 hover:text-red-500"
                }`}
              >
                <Github size={14} className="sm:h-4 sm:w-4" />
                <span>GitHub</span>
              </a>
              <Link
                href="/contact"
                className={`inline-flex items-center gap-1 text-xs sm:text-sm ${
                  isDayMode ? "text-gray-700 hover:text-orange-600" : "text-gray-300 hover:text-red-500"
                }`}
              >
                <Mail size={14} className="sm:h-4 sm:w-4" />
                <span>Contact</span>
              </Link>
              <a
                href="https://www.linkedin.com/in/ashwinkumar99/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-xs sm:text-sm ${
                  isDayMode ? "text-gray-700 hover:text-orange-600" : "text-gray-300 hover:text-red-500"
                }`}
              >
                <Linkedin size={14} className="sm:h-4 sm:w-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Itaxh1/konahapuram/blob/main/public/SDE_Ashwin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-xs sm:text-sm ${
                  isDayMode ? "text-gray-700 hover:text-orange-600" : "text-gray-300 hover:text-red-500"
                }`}
              >
                <FileText size={14} className="sm:h-4 sm:w-4" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Theme switcher and Explore button - desktop layout */}
          <div className="hidden sm:flex sm:flex-col sm:items-end sm:gap-3">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 dark:bg-gray-800">
              <Sun className="h-4 w-4 text-yellow-500" />
              <Switch checked={!isDayMode} onCheckedChange={toggleDayMode} aria-label="Toggle day/night mode" />
              <Moon className="h-4 w-4 text-red-600" />
            </div>

            <Link href="/village">
              <Button
                className={`${
                  isDayMode ? "bg-orange-600 hover:bg-orange-700" : "bg-red-800 hover:bg-red-900 border border-red-700"
                } text-sm`}
              >
                Explore Konahapuram <Play className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile controls - only visible on small screens */}
        <div className="flex flex-wrap items-center gap-3 sm:hidden">
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-800">
            <Sun className="h-3 w-3 text-yellow-500" />
            <Switch checked={!isDayMode} onCheckedChange={toggleDayMode} aria-label="Toggle day/night mode" />
            <Moon className="h-3 w-3 text-red-600" />
          </div>

          <Link href="/village" className="flex-grow">
            <Button
              className={`w-full ${
                isDayMode ? "bg-orange-600 hover:bg-orange-700" : "bg-red-800 hover:bg-red-900 border border-red-700"
              } text-xs`}
            >
              Explore Konahapuram <Play className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// About Me Card Component
function AboutMeCard({ isDayMode }) {
  return (
    <Card className={`${isDayMode ? "bg-white/90" : "bg-black/60 border-red-900 text-white"}`}>
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle
          className={`flex items-center gap-2 text-lg sm:text-xl ${isDayMode ? "text-orange-600" : "text-red-600"}`}
        >
          <Cpu className="h-4 w-4 sm:h-5 sm:w-5" />
          About Me
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base">
        <p className={isDayMode ? "text-gray-700" : "text-gray-300"}>
          Software Developer and Data Enthusiast with a strong foundation in Computer Science and a knack for creating
          impactful, scalable solutions.
        </p>
        <p className={isDayMode ? "text-gray-700" : "text-gray-300"}>
          Currently pursuing MEng in Computer Science at Oregon State University, with expertise in full-stack
          development, DevOps, and data analytics.
        </p>

        <div className="pt-1 sm:pt-2">
          <h4 className={`text-xs sm:text-sm font-semibold mb-2 ${isDayMode ? "text-gray-800" : "text-gray-200"}`}>
            🔧 Core Skills
          </h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {["Angular", "Node.js", "DevOps", "Data Analytics", "Machine Learning", "Cybersecurity"].map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className={`text-xs ${
                  isDayMode
                    ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                    : "bg-red-900/40 text-red-100 hover:bg-red-900/60 border border-red-800"
                }`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Skills Grid Component
function SkillsGrid({ isDayMode }) {
  return (
    <Card className={`${isDayMode ? "bg-white/90" : "bg-black/60 border-red-900 text-white"}`}>
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle
          className={`flex items-center gap-2 text-lg sm:text-xl ${isDayMode ? "text-orange-600" : "text-red-600"}`}
        >
          <Code className="h-4 w-4 sm:h-5 sm:w-5" />
          My Tech Stack
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="frontend">
          <TabsList className="grid grid-cols-3 mb-3 sm:mb-4">
            <TabsTrigger
              value="frontend"
              className={`text-xs sm:text-sm px-1 sm:px-2 py-1 ${isDayMode ? "" : "data-[state=active]:bg-red-900 data-[state=active]:text-white"}`}
            >
              <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Frontend
            </TabsTrigger>
            <TabsTrigger
              value="backend"
              className={`text-xs sm:text-sm px-1 sm:px-2 py-1 ${isDayMode ? "" : "data-[state=active]:bg-red-900 data-[state=active]:text-white"}`}
            >
              <Server className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Backend
            </TabsTrigger>
            <TabsTrigger
              value="devops"
              className={`text-xs sm:text-sm px-1 sm:px-2 py-1 ${isDayMode ? "" : "data-[state=active]:bg-red-900 data-[state=active]:text-white"}`}
            >
              <Cloud className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> DevOps
            </TabsTrigger>
          </TabsList>

          <TabsContent value="frontend" className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Angular 14",
                "Drupal 10",
                "UI/UX",
                "SEO",
                "User-centric Design",
                "Monsido",
                "HTML/CSS",
                "JavaScript",
                "Flutter",
              ].map((tech) => (
                <Badge
                  key={tech}
                  className={`justify-center py-1 sm:py-2 text-xs sm:text-sm ${
                    isDayMode
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      : "bg-red-900/40 text-red-100 hover:bg-red-900/60 border border-red-800"
                  }`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backend" className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "CI/CD Pipelines",
                "Python",
                "GCP",
                "ETL Pipeline",
                "Apache Kafka",
                "NDVI Analysis",
                "Google Earth Engine",
                "Data Analytics",
                "API Design",
              ].map((tech) => (
                <Badge
                  key={tech}
                  className={`justify-center py-1 sm:py-2 text-xs sm:text-sm ${
                    isDayMode
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-900/40 text-red-100 hover:bg-red-900/60 border border-red-800"
                  }`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="devops" className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "DevOps",
                "Secure Infrastructure",
                "GCP",
                "Real-time Monitoring",
                "Manual to Digital",
                "Scaling Systems",
                "Process Optimization",
                "Cybersecurity",
                "Machine Learning",
              ].map((tech) => (
                <Badge
                  key={tech}
                  className={`justify-center py-1 sm:py-2 text-xs sm:text-sm ${
                    isDayMode
                      ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                      : "bg-red-900/40 text-red-100 hover:bg-red-900/60 border border-red-800"
                  }`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Projects Map Component
function ProjectsMap({ isDayMode }) {
  return (
    <Card className={`${isDayMode ? "bg-white/90" : "bg-black/60 border-red-900 text-white"}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Briefcase className={`h-6 w-6 ${isDayMode ? "text-orange-500" : "text-red-600"}`} />
          <CardTitle className={`text-xl sm:text-2xl ${isDayMode ? "text-orange-600" : "text-red-600"}`}>
            Explore Konahapuram Projects
          </CardTitle>
        </div>
        <CardDescription className={`mt-1 text-sm ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>
          Each location represents a project. Click to learn more or visit the 3D village.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Map Visualization - Responsive height */}
        <div
          className={`relative h-64 sm:h-96 w-full rounded-lg ${
            isDayMode ? "bg-amber-50" : "bg-red-950/20"
          } overflow-hidden`}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12 grid-rows-4 sm:grid-rows-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`grid-col-${i}`}
                className={`border-l ${isDayMode ? "border-blue-100/50" : "border-red-900/20"} ${
                  i >= 6 ? "hidden sm:block" : ""
                }`}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`grid-row-${i}`}
                className={`border-t ${isDayMode ? "border-blue-100/50" : "border-red-900/20"} ${
                  i >= 4 ? "hidden sm:block" : ""
                }`}
              />
            ))}
          </div>

          {/* Center Village */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={`h-16 w-16 sm:h-20 sm:w-20 rounded-full ${
                isDayMode ? "bg-orange-100" : "bg-red-900/30"
              } flex items-center justify-center`}
            >
              <div
                className={`h-12 w-12 sm:h-16 sm:w-16 rounded-full ${
                  isDayMode ? "bg-orange-500" : "bg-red-700"
                } flex items-center justify-center`}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-8 sm:w-8 text-white">
                  <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                </svg>
              </div>
            </div>
            <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-center text-xs sm:text-sm font-medium">
              <span className={isDayMode ? "text-orange-600" : "text-red-500"}>Konahapuram Village</span>
            </div>
          </div>

          {/* Project Dots - Adjusted for mobile */}
          <div className="absolute left-1/4 top-1/3">
            <div className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full ${isDayMode ? "bg-orange-500" : "bg-red-600"}`}></div>
          </div>
          <div className="absolute left-3/4 top-1/3">
            <div className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full ${isDayMode ? "bg-orange-500" : "bg-red-600"}`}></div>
          </div>
          <div className="absolute left-1/3 top-2/3">
            <div className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full ${isDayMode ? "bg-orange-500" : "bg-red-600"}`}></div>
          </div>
          <div className="absolute left-3/4 top-3/4">
            <div className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full ${isDayMode ? "bg-orange-500" : "bg-red-600"}`}></div>
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: "none" }}>
            <line
              x1="25%"
              y1="33%"
              x2="50%"
              y2="50%"
              stroke={isDayMode ? "#f97316" : "#dc2626"}
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="75%"
              y1="33%"
              x2="50%"
              y2="50%"
              stroke={isDayMode ? "#f97316" : "#dc2626"}
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="33%"
              y1="67%"
              x2="50%"
              y2="50%"
              stroke={isDayMode ? "#f97316" : "#dc2626"}
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="75%"
              y1="75%"
              x2="50%"
              y2="50%"
              stroke={isDayMode ? "#f97316" : "#dc2626"}
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </div>

        {/* Featured Projects */}
        <div>
          <h3 className={`mb-3 sm:mb-4 text-lg sm:text-xl font-bold ${isDayMode ? "text-gray-800" : "text-white"}`}>
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {/* SCARR Framework */}
            <a
              href="https://github.com/Itaxh1/scarr-framework"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4 transition-colors ${
                isDayMode
                  ? "border-orange-200 bg-orange-50 hover:bg-orange-100"
                  : "border-red-900 bg-red-900/20 hover:bg-red-900/30"
              }`}
            >
              <div
                className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full ${
                  isDayMode ? "bg-orange-500" : "bg-red-700"
                }`}
              >
                <Code className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h4 className={`font-medium text-base sm:text-lg ${isDayMode ? "text-orange-800" : "text-red-400"}`}>
                  SCARR Framework
                </h4>
                <p className={`text-xs sm:text-sm ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
                  Python optimization framework with multicore profiling
                </p>
              </div>
            </a>

            {/* DeepSeeker AI */}
            <a
              href="https://github.com/Itaxh1/deepseeker"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4 transition-colors ${
                isDayMode
                  ? "border-orange-200 bg-orange-50 hover:bg-orange-100"
                  : "border-red-900 bg-red-900/20 hover:bg-red-900/30"
              }`}
            >
              <div
                className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full ${
                  isDayMode ? "bg-orange-500" : "bg-red-700"
                }`}
              >
                <Server className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h4 className={`font-medium text-base sm:text-lg ${isDayMode ? "text-orange-800" : "text-red-400"}`}>
                  DeepSeeker AI
                </h4>
                <p className={`text-xs sm:text-sm ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
                  RAG-based AI for Stack Overflow & Medium content
                </p>
              </div>
            </a>

            {/* Library Content Manager */}
            <a
              href="https://github.com/Itaxh1/library-manager"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4 transition-colors ${
                isDayMode
                  ? "border-orange-200 bg-orange-50 hover:bg-orange-100"
                  : "border-red-900 bg-red-900/20 hover:bg-red-900/30"
              }`}
            >
              <div
                className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full ${
                  isDayMode ? "bg-orange-500" : "bg-red-700"
                }`}
              >
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h4 className={`font-medium text-base sm:text-lg ${isDayMode ? "text-orange-800" : "text-red-400"}`}>
                  Library Content Manager
                </h4>
                <p className={`text-xs sm:text-sm ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
                  Node.js microservices with MongoDB & RabbitMQ
                </p>
              </div>
            </a>

            {/* Naruto Portfolio */}
            <a
              href="https://github.com/Itaxh1/naruto-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4 transition-colors ${
                isDayMode
                  ? "border-orange-200 bg-orange-50 hover:bg-orange-100"
                  : "border-red-900 bg-red-900/20 hover:bg-red-900/30"
              }`}
            >
              <div
                className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full ${
                  isDayMode ? "bg-orange-500" : "bg-red-700"
                }`}
              >
                <Code className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h4 className={`font-medium text-base sm:text-lg ${isDayMode ? "text-orange-800" : "text-red-400"}`}>
                  Naruto Portfolio
                </h4>
                <p className={`text-xs sm:text-sm ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
                  Interactive 3D portfolio with Three.js & Next.js
                </p>
              </div>
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/village" className="w-full">
          <Button
            className={`w-full ${
              isDayMode
                ? "bg-orange-600 hover:bg-orange-700 text-white"
                : "bg-red-800 hover:bg-red-900 border border-red-700 text-white"
            }`}
          >
            Enter 3D Interactive Village
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

// Certifications Card Component
function CertificationsCard({ isDayMode }) {
  return (
    <Card className={`${isDayMode ? "bg-white/90" : "bg-black/60 border-red-900 text-white"}`}>
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle
          className={`flex items-center gap-2 text-lg sm:text-xl ${isDayMode ? "text-orange-600" : "text-red-600"}`}
        >
          <Award className="h-4 w-4 sm:h-5 sm:w-5" />
          Education & Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div>
          <h4
            className={`text-xs sm:text-sm font-semibold mb-2 flex items-center gap-1 ${
              isDayMode ? "text-gray-800" : "text-gray-200"
            }`}
          >
            <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
            Education
          </h4>
          <ul className={`space-y-2 text-xs sm:text-sm ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
            <li className="flex items-start gap-2">
              <Badge
                className={`text-xs ${isDayMode ? "bg-blue-100 text-blue-800" : "bg-red-900/40 text-red-100 border border-red-800"}`}
              >
                Current
              </Badge>
              <span>MEng in Computer Science at Oregon State University (GPA: 3.6/4.0)</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge
                className={`text-xs ${isDayMode ? "bg-blue-100 text-blue-800" : "bg-red-900/40 text-red-100 border border-red-800"}`}
              >
                Graduated
              </Badge>
              <span>BTech in Computer Science from Hindustan Institute of Technology and Science (GPA: 3.6/4.0)</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={`text-xs sm:text-sm font-semibold mb-2 ${isDayMode ? "text-gray-800" : "text-gray-200"}`}>
            🛠️ Professional Experience
          </h4>
          <ul className={`space-y-2 text-xs sm:text-sm ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
            <li className="flex items-start gap-2">
              <Badge
                className={
                  isDayMode ? "bg-green-100 text-green-800" : "bg-red-900/40 text-red-100 border border-red-800"
                }
              >
                2024-Present
              </Badge>
              <span>Web Developer @ Oregon State University - College of Engineering</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge
                className={
                  isDayMode ? "bg-green-100 text-green-800" : "bg-red-900/40 text-red-100 border border-red-800"
                }
              >
                2022-2023
              </Badge>
              <span>Associate Software Developer @ AgroSperity KIVI (Chennai, India)</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge
                className={
                  isDayMode ? "bg-green-100 text-green-800" : "bg-red-900/40 text-red-100 border border-red-800"
                }
              >
                2022
              </Badge>
              <span>Data Analyst Consultant @ GenWorks Healthcare (Remote Internship)</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

// Footer Contact Component - Updated for better mobile responsiveness
function FooterContact({ isDayMode }) {
  const isMobile = useMobile()

  return (
    <div
      className={`mt-12 rounded-lg p-6 text-center ${isDayMode ? "bg-white/80" : "bg-black/50 border border-red-900"}`}
    >
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${isDayMode ? "text-gray-800" : "text-white"}`}>
        Wanna build something cool? Let's connect.
      </h2>
      <a
        href="mailto:ufoundashwin@gmail.com"
        className={`inline-flex items-center gap-2 text-lg sm:text-xl font-medium ${
          isDayMode ? "text-orange-600 hover:text-orange-700" : "text-red-500 hover:text-red-400"
        }`}
      >
        <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
        ufoundashwin@gmail.com
      </a>

      {/* Social links - Improved for mobile */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6">
        <a
          href="https://github.com/Itaxh1"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-base sm:text-lg ${
            isDayMode ? "text-gray-700 hover:text-orange-600" : "text-gray-300 hover:text-red-500"
          }`}
        >
          <Github size={20} className="sm:h-6 sm:w-6" />
          <span>GitHub</span>
        </a>
        <Link
          href="/contact"
          className={`inline-flex items-center gap-2 text-base sm:text-lg ${
            isDayMode ? "text-gray-700 hover:text-orange-600" : "text-gray-300 hover:text-red-500"
          }`}
        >
          <Mail size={20} className="sm:h-6 sm:w-6" />
          <span>Contact</span>
        </Link>
        <a
          href="https://www.linkedin.com/in/ashwinkumar99/"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-base sm:text-lg ${
            isDayMode ? "text-gray-700 hover:text-orange-600" : "text-gray-300 hover:text-red-500"
          }`}
        >
          <Linkedin size={20} className="sm:h-6 sm:w-6" />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/Itaxh1/konahapuram/blob/main/public/SDE_Ashwin.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-base sm:text-lg ${
            isDayMode ? "text-gray-700 hover:text-orange-600" : "text-gray-300 hover:text-red-500"
          }`}
        >
          <FileText size={20} className="sm:h-6 sm:w-6" />
          <span>Resume Download</span>
        </a>
      </div>

      <div className={`mt-6 text-sm ${isDayMode ? "text-gray-500" : "text-gray-400"}`}>
        © {new Date().getFullYear()} Ashwin Kumar Uma Sankar. All rights reserved.
      </div>
    </div>
  )
}
