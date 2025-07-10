"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Github, ExternalLink, ArrowLeft, Search, Star, Eye, GitFork } from "lucide-react"
import { Input } from "@/components/ui/input"

const projects = [
  {
    id: 1,
    name: "EMERGENCY_EXIT_SYSTEM",
    description:
      "Real-time emergency management system with intelligent routing algorithms and automated alert systems for optimal emergency response coordination.",
    category: "BACKEND",
    complexity: "ADVANCED",
    status: "LIVE",
    technologies: ["PYTHON", "FLASK", "GCP", "REAL_TIME", "ALGORITHMS"],
    liveUrl: "https://emergency-exit-system-654928681850.us-central1.run.app",
    githubUrl: "https://github.com/Itaxh1/Emergency-Exit-System",
    stats: { views: "2.1K", stars: 12, forks: 4 },
    timeline: "3_MONTHS",
    year: "2024",
    lastUpdated: "MAY_9",
    highlights: ["REAL_TIME_MONITORING", "AUTOMATED_ALERTS", "INTELLIGENT_ROUTING", "SCALABLE_ARCHITECTURE"],
  },
  {
    id: 2,
    name: "TASKPILOT",
    description:
      "Intelligent task management system with workflow automation, progress tracking, and analytics for productivity optimization.",
    category: "BACKEND",
    complexity: "INTERMEDIATE",
    status: "COMPLETE",
    technologies: ["PYTHON", "AUTOMATION", "ANALYTICS", "WORKFLOW"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/TaskPilot",
    stats: { views: "1.8K", stars: 8, forks: 3 },
    timeline: "2_MONTHS",
    year: "2024",
    lastUpdated: "MAY_8",
    highlights: ["WORKFLOW_AUTOMATION", "PROGRESS_TRACKING", "ANALYTICS_DASHBOARD", "USER_INTERFACE"],
  },
  {
    id: 3,
    name: "JOBTRACKER",
    description:
      "Modern job application tracking system with status management, interview scheduling, and comprehensive analytics dashboard.",
    category: "FULL_STACK",
    complexity: "ADVANCED",
    status: "ACTIVE",
    technologies: ["TYPESCRIPT", "REACT", "NODEJS", "ANALYTICS"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/JobTracker",
    stats: { views: "2.5K", stars: 15, forks: 7 },
    timeline: "4_MONTHS",
    year: "2024",
    lastUpdated: "MAY_8",
    highlights: ["APPLICATION_TRACKING", "INTERVIEW_SCHEDULING", "ANALYTICS_DASHBOARD", "TYPESCRIPT_ARCHITECTURE"],
  },
  {
    id: 4,
    name: "DEEPSEEKER_AI",
    description:
      "RAG-based intelligent content retrieval system with vector database integration and advanced AI capabilities.",
    category: "AI_ML",
    complexity: "ADVANCED",
    status: "DEVELOPMENT",
    technologies: ["PYTHON", "RAG", "AI_ML", "VECTOR_DB"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/deepseeker",
    stats: { views: "1.2K", stars: 6, forks: 2 },
    timeline: "3_MONTHS",
    year: "2024",
    lastUpdated: "APR_15",
    highlights: ["RAG_IMPLEMENTATION", "VECTOR_DATABASE", "AI_INTEGRATION", "CONTENT_RETRIEVAL"],
  },
  {
    id: 5,
    name: "SCARR_FRAMEWORK",
    description:
      "Python optimization framework with multicore profiling capabilities for performance analysis and enhancement.",
    category: "FRAMEWORK",
    complexity: "ADVANCED",
    status: "COMPLETE",
    technologies: ["PYTHON", "MULTIPROCESSING", "PERFORMANCE", "PROFILING"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/scarr-framework",
    stats: { views: "900", stars: 4, forks: 1 },
    timeline: "2_MONTHS",
    year: "2023",
    lastUpdated: "DEC_20",
    highlights: ["MULTICORE_PROFILING", "PERFORMANCE_OPTIMIZATION", "PYTHON_FRAMEWORK", "ANALYSIS_TOOLS"],
  },
  {
    id: 6,
    name: "NARUTO_PORTFOLIO",
    description:
      "Interactive 3D portfolio experience built with Three.js, featuring immersive design and creative storytelling.",
    category: "FRONTEND",
    complexity: "ADVANCED",
    status: "LIVE",
    technologies: ["NEXTJS", "THREEJS", "TYPESCRIPT", "3D"],
    liveUrl: "/village",
    githubUrl: "https://github.com/Itaxh1/naruto-portfolio",
    stats: { views: "3.1K", stars: 18, forks: 5 },
    timeline: "4_MONTHS",
    year: "2024",
    lastUpdated: "JUN_1",
    highlights: ["3D_EXPERIENCE", "THREEJS_INTEGRATION", "INTERACTIVE_DESIGN", "CREATIVE_STORYTELLING"],
  },
]

const categories = ["ALL", "BACKEND", "FRONTEND", "FULL_STACK", "AI_ML", "FRAMEWORK"]
const statuses = ["ALL", "LIVE", "ACTIVE", "COMPLETE", "DEVELOPMENT"]

export default function ProjectsPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [selectedStatus, setSelectedStatus] = useState("ALL")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "America/Los_Angeles",
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    setTimeout(() => setIsLoaded(true), 300)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let filtered = projects

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    if (selectedStatus !== "ALL") {
      filtered = filtered.filter((project) => project.status === selectedStatus)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredProjects(filtered)
  }, [selectedCategory, selectedStatus, searchTerm])

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen">
      {/* Terminal Loading */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="text-green-400 text-xl"
            >
              LOADING_PROJECTS.JSON...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-green-800 p-4 md:p-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-green-400 hover:text-green-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK_TO_HOME</span>
              </motion.button>
            </Link>
            <div className="text-green-600">|</div>
            <div>
              <span className="text-green-600">~/</span>
              <span className="text-green-400">PROJECTS</span>
            </div>
          </div>
          <div className="text-sm text-green-600">PDT_{currentTime}</div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Title Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 break-words">PROJECT_ARCHIVE.JSON</h1>
          <div className="text-lg md:text-xl text-green-300 mb-2">DIGITAL_SOLUTIONS_PORTFOLIO</div>
          <div className="text-green-600 text-sm">
            TOTAL_PROJECTS: {projects.length} | FILTERED: {filteredProjects.length} | STATUS: ACTIVE_DEVELOPMENT
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 space-y-6"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-600" />
            <Input
              type="text"
              placeholder="SEARCH_PROJECTS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black border-green-800 text-green-400 placeholder-green-600 focus:border-green-400"
            />
          </div>

          {/* Category & Status Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-green-300 mb-3 text-sm">FILTER_BY_CATEGORY:</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 text-xs border transition-all duration-300 ${
                      selectedCategory === category
                        ? "border-green-400 bg-green-400 text-black"
                        : "border-green-800 text-green-400 hover:border-green-400"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-green-300 mb-3 text-sm">FILTER_BY_STATUS:</div>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <motion.button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 text-xs border transition-all duration-300 ${
                      selectedStatus === status
                        ? "border-green-400 bg-green-400 text-black"
                        : "border-green-800 text-green-400 hover:border-green-400"
                    }`}
                  >
                    {status}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid gap-4 md:gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12 text-green-600"
              >
                NO_PROJECTS_FOUND | TRY_DIFFERENT_FILTERS
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10, backgroundColor: "rgba(34, 197, 94, 0.02)" }}
                  className="border border-green-800 p-4 md:p-6 hover:border-green-400 transition-all duration-300 group"
                >
                  {/* Project Header */}
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl md:text-2xl text-green-300 group-hover:text-green-200 mb-2 break-words">
                        {project.name}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs px-2 py-1 border border-green-600 text-green-600">
                          {project.category}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 border ${
                            project.status === "LIVE"
                              ? "border-green-400 text-green-400"
                              : project.status === "ACTIVE"
                                ? "border-yellow-400 text-yellow-400"
                                : project.status === "DEVELOPMENT"
                                  ? "border-blue-400 text-blue-400"
                                  : "border-purple-400 text-purple-400"
                          }`}
                        >
                          {project.status}
                        </span>
                        <span className="text-xs px-2 py-1 border border-green-700 text-green-700">
                          {project.complexity}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-2">
                      <div className="flex gap-4 text-xs text-green-600">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {project.stats.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {project.stats.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {project.stats.forks}
                        </span>
                      </div>
                      <div className="text-xs text-green-700">UPDATED: {project.lastUpdated}</div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-green-500 mb-6 leading-relaxed break-words">{project.description}</p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="text-green-300 text-sm mb-3">TECH_STACK:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-green-900/20 border border-green-800 text-green-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="text-green-300 text-sm mb-3">KEY_FEATURES:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.highlights.map((highlight) => (
                        <div key={highlight} className="text-xs text-green-500 break-words">
                          • {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Meta */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2 text-xs text-green-600">
                    <div>TIMELINE: {project.timeline}</div>
                    <div>YEAR: {project.year}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full px-4 py-2 border border-green-400 text-green-400 hover:text-black transition-all duration-300 text-sm flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-3 h-3" />
                          LIVE_DEMO
                        </motion.button>
                      </a>
                    )}
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 border border-green-400 text-green-400 hover:text-black transition-all duration-300 text-sm flex items-center justify-center gap-2"
                      >
                        <Github className="w-3 h-3" />
                        SOURCE_CODE
                      </motion.button>
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t border-green-800 p-4 md:p-6 mt-12"
      >
        <div className="max-w-7xl mx-auto text-center text-green-600 text-sm space-y-1">
          <div>END_OF_PROJECTS_LIST | TOTAL_DISPLAYED: {filteredProjects.length}</div>
          <div>© 2024 ASHWIN_KUMAR.DEV | PORTFOLIO_V2.0</div>
        </div>
      </motion.footer>
    </div>
  )
}
