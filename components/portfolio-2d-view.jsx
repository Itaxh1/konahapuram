"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Book, Code, Award, User, ChevronRight } from "lucide-react"

export default function Portfolio2DView({ isDayMode, onSelectLocation }) {
  const [hoveredSection, setHoveredSection] = useState(null)

  // Define the sections of the portfolio
  const sections = [
    {
      id: "konohaVillage",
      title: "About Me",
      description: "Software engineer with expertise in Angular, Node.js, and cloud infrastructure",
      icon: <User className="h-8 w-8" />,
      color: "bg-orange-500",
      position: { x: 0, y: 0 }, // Center
    },
    {
      id: "oregonState",
      title: "Oregon State University",
      description: "Web Developer (Oct 2024 - Present)",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-blue-500",
      position: { x: -1, y: -1 }, // Top left
    },
    {
      id: "agrosperity",
      title: "Agrosperity Kivi",
      description: "Associate Software Developer (Jun 2022 - Aug 2023)",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-blue-600",
      position: { x: 1, y: -1 }, // Top right
    },
    {
      id: "hakatours",
      title: "Hakatours New Zealand",
      description: "UI/UX Design Intern (Mar 2020 - Oct 2020)",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-blue-700",
      position: { x: -1, y: 1 }, // Bottom left
    },
    {
      id: "skills",
      title: "Technical Skills",
      description: "Python, JavaScript, TypeScript, Angular, React, Cloud Platforms",
      icon: <Code className="h-8 w-8" />,
      color: "bg-green-500",
      position: { x: 1, y: 1 }, // Bottom right
    },
    {
      id: "certifications",
      title: "Certifications",
      description: "Cyber Security & Forensics, Google Cloud Essentials",
      icon: <Award className="h-8 w-8" />,
      color: "bg-green-600",
      position: { x: -2, y: 0 }, // Left
    },
    {
      id: "education",
      title: "Education",
      description: "MEng in Computer Science | Oregon State University",
      icon: <Book className="h-8 w-8" />,
      color: "bg-purple-500",
      position: { x: 2, y: 0 }, // Right
    },
    {
      id: "projects",
      title: "Academic Projects",
      description: "SCARR Framework, DeepSeeker Scraper & AI, Library Content Manager",
      icon: <Code className="h-8 w-8" />,
      color: "bg-yellow-500",
      position: { x: 0, y: 2 }, // Bottom
    },
  ]

  // Calculate position for each section in a spiral pattern
  const calculatePosition = (position) => {
    const baseSize = 180 // Base size of each card
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2 - 50 // Adjust for better centering

    // Calculate position based on the spiral pattern
    const distance = Math.sqrt(position.x * position.x + position.y * position.y) * baseSize
    const angle = Math.atan2(position.y, position.x)

    // Add some randomness to make it look more natural
    const randomOffset = Math.random() * 20 - 10

    return {
      left: centerX + Math.cos(angle) * distance + randomOffset,
      top: centerY + Math.sin(angle) * distance + randomOffset,
    }
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${isDayMode ? "bg-amber-50" : "bg-gray-900"}`}>
      {/* Background pattern - Chakravyuha spiral */}
      <svg
        className="absolute left-0 top-0 h-full w-full opacity-10"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M500,500 m0,0 a1,1 0 1,0 2,0 a1,1 0 1,0 -2,0 M500,500 m0,10 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M500,500 m0,30 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0 M500,500 m0,60 a60,60 0 1,0 120,0 a60,60 0 1,0 -120,0 M500,500 m0,100 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0 M500,500 m0,150 a150,150 0 1,0 300,0 a150,150 0 1,0 -300,0 M500,500 m0,210 a210,210 0 1,0 420,0 a210,210 0 1,0 -420,0 M500,500 m0,280 a280,280 0 1,0 560,0 a280,280 0 1,0 -560,0 M500,500 m0,360 a360,360 0 1,0 720,0 a360,360 0 1,0 -720,0"
          fill="none"
          stroke={isDayMode ? "#FF9800" : "#FFD700"}
          strokeWidth="2"
        />
      </svg>

      {/* Title */}
      <div className="absolute left-0 right-0 top-24 text-center">
        <h1
          className={`font-ninja text-4xl font-bold ${
            isDayMode ? "text-orange-600" : "text-orange-400"
          } drop-shadow-lg`}
        >
          Chakravyuha Portfolio
        </h1>
        <p className={`mt-2 ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
          Explore my journey through the spiral of experience
        </p>
      </div>

      {/* Portfolio sections */}
      {sections.map((section) => {
        const position = calculatePosition(section.position)
        const isHovered = hoveredSection === section.id

        return (
          <motion.div
            key={section.id}
            className="absolute"
            style={{
              left: position.left - 90, // Half the width
              top: position.top - 75, // Half the height
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            onHoverStart={() => setHoveredSection(section.id)}
            onHoverEnd={() => setHoveredSection(null)}
            onClick={() => onSelectLocation(section.id)}
          >
            <Card
              className={`w-64 cursor-pointer transition-all ${
                isDayMode ? "bg-white" : "bg-gray-800 text-white"
              } hover:shadow-lg`}
            >
              <CardHeader className={`flex flex-row items-center gap-3 ${section.color} p-3 text-white`}>
                {section.icon}
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className={`text-sm ${isDayMode ? "text-gray-600" : "text-gray-300"}`}>{section.description}</p>
                {isHovered && (
                  <div className="mt-2 flex items-center text-xs font-medium text-orange-600">
                    View details <ChevronRight className="ml-1 h-3 w-3" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )
      })}

      {/* Center decoration - Hokage symbol */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className={`flex h-24 w-24 items-center justify-center rounded-full ${
            isDayMode ? "bg-orange-500" : "bg-orange-600"
          } shadow-lg`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="h-16 w-16 text-white">
            <path d="M50 15 L85 85 L15 85 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="5" />
          </svg>
        </motion.div>
      </div>

      {/* Connecting lines */}
      <svg className="absolute left-0 top-0 h-full w-full pointer-events-none">
        <g
          stroke={isDayMode ? "#FF9800" : "#FFD700"}
          strokeWidth="2"
          strokeD="asharray"
          strokeOpacity="0.5"
          fill="none"
        >
          {sections
            .filter((section) => section.id !== "konohaVillage") // Skip the center
            .map((section) => {
              const position = calculatePosition(section.position)
              const centerX = window.innerWidth / 2
              const centerY = window.innerHeight / 2 - 50

              return (
                <line
                  key={section.id}
                  x1={centerX}
                  y1={centerY}
                  x2={position.left}
                  y2={position.top}
                  strokeDasharray="5,5"
                />
              )
            })}
        </g>
      </svg>
    </div>
  )
}
