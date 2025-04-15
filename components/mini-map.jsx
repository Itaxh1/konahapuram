"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

// Mini-map component that shows a top-down view of the village with all buildings
export default function MiniMap({
  playerPosition = [0, 0, 0],
  playerRotation = 0,
  isDayMode = true,
  locations = [],
  currentLocation = null,
  isExpanded = false,
  onToggleExpand = () => {},
}) {
  const mapRef = useRef(null)
  const [mapSize, setMapSize] = useState(isExpanded ? 280 : 180)
  const isMobile = useMobile()

  // Update map size when expanded state changes
  useEffect(() => {
    setMapSize(isExpanded ? 280 : 180)
  }, [isExpanded])

  // Calculate player position on the map
  const playerX = ((playerPosition[0] + 150) / 300) * mapSize
  const playerZ = ((playerPosition[2] + 150) / 300) * mapSize

  // Define building colors based on their type
  const getBuildingColor = (locationId) => {
    if (!isDayMode) {
      // Akatsuki theme colors for dark mode
      switch (locationId) {
        case "konohaVillage":
          return "#c41e3a" // Akatsuki red for Summary Hall
        case "education":
          return "#d81f44" // Lighter red for Education Tower
        case "oregonState":
        case "agrosperity":
        case "hakatours":
          return "#b01c36" // Darker red for Work Experience
        case "skills":
          return "#e32f4c" // Brighter red for Skills
        case "certifications":
          return "#a71a32" // Deep red for Certifications
        case "projects":
          return "#f04c64" // Pink-red for Projects
        default:
          return "#7d1425" // Dark red for Default
      }
    } else {
      // Original day mode colors
      switch (locationId) {
        case "konohaVillage":
          return "#FF6347" // Summary Hall - Tomato
        case "education":
          return "#9b59b6" // Education Tower - Purple
        case "oregonState":
        case "agrosperity":
        case "hakatours":
          return "#3498db" // Work Experience - Blue
        case "skills":
          return "#2ecc71" // Skills - Green
        case "certifications":
          return "#3498db" // Certifications - Blue
        case "projects":
          return "#f39c12" // Projects - Orange
        default:
          return "#95a5a6" // Default - Gray
      }
    }
  }

  // Get building size based on importance
  const getBuildingSize = (locationId) => {
    if (locationId === "konohaVillage") return 12
    return 8
  }

  return (
    <motion.div
      className={`fixed ${isMobile ? "bottom-32 right-2" : "bottom-4 right-4"} z-30 transition-all duration-300 ease-in-out ${
        isExpanded ? "h-64 w-64" : `h-${isMobile ? "16" : "24"} w-${isMobile ? "16" : "24"}`
      } rounded-lg ${
        isDayMode ? "bg-white/80" : "bg-black/80 border border-red-900"
      } p-2 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Map header */}
      <div className="mb-1 flex items-center justify-between">
        <h3 className={`text-xs font-bold ${isDayMode ? "text-gray-800" : "text-red-500"}`}>KONAHAPURAM</h3>
        <button
          onClick={onToggleExpand}
          className={`rounded-full p-1 text-xs ${isDayMode ? "bg-gray-200 text-gray-800" : "bg-red-900 text-white"}`}
        >
          {isExpanded ? "−" : "+"}
        </button>
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        className={`relative rounded-lg ${
          isDayMode ? "bg-green-200/70" : "bg-gray-900/70 border border-red-900"
        } overflow-hidden`}
        style={{ height: mapSize, width: mapSize }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`grid-row-${i}`}
              className={`border-t ${isDayMode ? "border-green-300/50" : "border-red-900/30"}`}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`grid-col-${i}`}
              className={`border-l ${isDayMode ? "border-green-300/50" : "border-red-900/30"}`}
            />
          ))}
        </div>

        {/* Roads */}
        <div className="absolute inset-0">
          {/* Central vertical road */}
          <div className="absolute left-1/2 top-0 h-full w-[6px] -translate-x-1/2 bg-gray-400/70 dark:bg-gray-700/70">
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-yellow-400/90 dark:bg-red-500/90"></div>
          </div>

          {/* Central horizontal road */}
          <div className="absolute left-0 top-1/2 h-[6px] w-full -translate-y-1/2 bg-gray-400/70 dark:bg-gray-700/70">
            <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-yellow-400/90 dark:bg-red-500/90"></div>
          </div>

          {/* Circular road around center */}
          <div className="absolute left-1/2 top-1/2 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-gray-400/70 dark:border-gray-700/70">
            <div className="absolute inset-0 rounded-full border-[2px] border-yellow-400/90 dark:border-red-500/90"></div>
          </div>
        </div>

        {/* Buildings */}
        {locations.map((location) => {
          // Calculate position on the map
          const locX = ((location.position[0] + 150) / 300) * mapSize
          const locZ = ((location.position[2] + 150) / 300) * mapSize
          const size = getBuildingSize(location.id)
          const color = getBuildingColor(location.id)
          const isActive = currentLocation === location.id

          return (
            <div
              key={location.id}
              className={`absolute rounded-sm ${isActive ? "ring-2 ring-white dark:ring-red-500" : ""}`}
              style={{
                left: locX - size / 2,
                top: locZ - size / 2,
                width: size,
                height: size,
                backgroundColor: color,
                transform: location.id === "konohaVillage" ? "rotate(45deg)" : "",
              }}
            />
          )
        })}

        {/* Player marker */}
        <div
          className="absolute h-3 w-3 rounded-full bg-orange-500 ring-2 ring-white dark:bg-red-500 dark:ring-red-300"
          style={{
            left: playerX - 3,
            top: playerZ - 3,
            transform: `rotate(${playerRotation}rad)`,
          }}
        >
          {/* Direction indicator */}
          <div className="absolute left-1/2 top-0 h-4 w-0 -translate-x-1/2 border-l border-white dark:border-red-300"></div>
        </div>

        {/* North indicator */}
        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-xs font-bold text-gray-800 dark:bg-red-900/80 dark:text-white">
          N
        </div>

        {/* Map scale */}
        {isExpanded && (
          <div className="absolute bottom-2 left-2 flex flex-col items-center">
            <div className="h-[20px] w-[2px] bg-white dark:bg-red-500"></div>
            <div className="text-[8px] text-white">100m</div>
          </div>
        )}
      </div>

      {/* Location name (if in a location) */}
      {currentLocation && (
        <div className={`mt-1 text-center text-xs font-medium ${isDayMode ? "text-gray-800" : "text-red-400"}`}>
          {locations.find((loc) => loc.id === currentLocation)?.name || ""}
        </div>
      )}
    </motion.div>
  )
}
