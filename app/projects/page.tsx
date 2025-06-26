"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import Link from "next/link"
import {
  Github,
  ExternalLink,
  Code,
  Server,
  Database,
  Brain,
  Shield,
  Palette,
  Search,
  Filter,
  Star,
  Calendar,
  Users,
  Target,
  Rocket,
  Eye,
  Mail,
  Linkedin,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

// Real GitHub repository data from Itaxh1 profile
const projects = [
  {
    id: 1,
    title: "Emergency Exit System",
    shortDescription: "Python-based emergency management system with real-time monitoring",
    longDescription:
      "A comprehensive emergency management system built with Python, featuring real-time monitoring capabilities, automated alert systems, and intelligent routing algorithms for optimal emergency response coordination.",
    category: "Backend",
    complexity: "Advanced",
    status: "Live",
    featured: true,
    technologies: ["Python", "Flask", "Real-time Monitoring", "Emergency Management", "Algorithms"],
    liveUrl: "https://emergency-exit-system-654928681850.us-central1.run.app",
    githubUrl: "https://github.com/Itaxh1/Emergency-Exit-System",
    image: "/placeholder.svg?height=300&width=500",
    stats: { views: "2.1K", stars: 12, forks: 4 },
    timeline: "3 months",
    teamSize: 1,
    highlights: [
      "Real-time emergency monitoring",
      "Automated alert systems",
      "Intelligent routing algorithms",
      "Scalable architecture",
    ],
    gradient: "from-red-500 to-orange-500",
    icon: "🚨",
    lastUpdated: "May 9",
  },
  {
    id: 2,
    title: "TaskPilot",
    shortDescription: "Python-powered task management and automation platform",
    longDescription:
      "An intelligent task management system built with Python that automates workflow processes, tracks project progress, and provides analytics for productivity optimization.",
    category: "Backend",
    complexity: "Intermediate",
    status: "Completed",
    featured: true,
    technologies: ["Python", "Task Management", "Automation", "Analytics", "Workflow"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/TaskPilot",
    image: "/placeholder.svg?height=300&width=500",
    stats: { views: "1.8K", stars: 8, forks: 3 },
    timeline: "2 months",
    teamSize: 1,
    highlights: [
      "Automated workflow processes",
      "Progress tracking",
      "Productivity analytics",
      "User-friendly interface",
    ],
    gradient: "from-blue-500 to-cyan-500",
    icon: "📋",
    lastUpdated: "May 8",
  },
  {
    id: 3,
    title: "JobTracker",
    shortDescription: "TypeScript-based job application tracking system",
    longDescription:
      "A modern job application tracking system built with TypeScript, featuring application status management, interview scheduling, and comprehensive analytics for job seekers.",
    category: "Full Stack",
    complexity: "Advanced",
    status: "Live",
    featured: true,
    technologies: ["TypeScript", "React", "Node.js", "Job Tracking", "Analytics"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/JobTracker",
    image: "/placeholder.svg?height=300&width=500",
    stats: { views: "2.5K", stars: 15, forks: 7 },
    timeline: "4 months",
    teamSize: 1,
    highlights: [
      "Application status tracking",
      "Interview scheduling",
      "Analytics dashboard",
      "Modern TypeScript architecture",
    ],
    gradient: "from-purple-500 to-indigo-500",
    icon: "💼",
    lastUpdated: "May 8",
  },
  {
    id: 4,
    title: "JobTrackerAPI",
    shortDescription: "Python REST API for job application management",
    longDescription:
      "A robust REST API built with Python that powers job tracking applications, providing endpoints for application management, user authentication, and data analytics.",
    category: "Backend",
    complexity: "Advanced",
    status: "Completed",
    featured: true,
    technologies: ["Python", "REST API", "Authentication", "Database", "Analytics"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/JobTrackerAPI",
    image: "/placeholder.svg?height=300&width=500",
    stats: { views: "1.9K", stars: 11, forks: 5 },
    timeline: "2 months",
    teamSize: 1,
    highlights: ["RESTful API design", "User authentication", "Database optimization", "Comprehensive documentation"],
    gradient: "from-green-500 to-emerald-500",
    icon: "🔗",
    lastUpdated: "May 8",
  },
  {
    id: 5,
    title: "SpringJWTCRUD",
    shortDescription: "Java Spring Boot application with JWT authentication",
    longDescription:
      "A comprehensive Spring Boot application demonstrating JWT authentication implementation with full CRUD operations, security best practices, and RESTful API design.",
    category: "Backend",
    complexity: "Intermediate",
    status: "Completed",
    featured: false,
    technologies: ["Java", "Spring Boot", "JWT", "Security", "REST API", "CRUD"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/SpringJWTCRUD",
    image: "/placeholder.svg?height=300&width=500",
    stats: { views: "1.4K", stars: 9, forks: 6 },
    timeline: "1 month",
    teamSize: 1,
    highlights: ["JWT authentication", "CRUD operations", "Security implementation", "Spring Boot best practices"],
    gradient: "from-orange-500 to-red-500",
    icon: "☕",
    lastUpdated: "Last month",
  },
  {
    id: 6,
    title: "Huegan",
    shortDescription: "TypeScript color palette generator and management tool",
    longDescription:
      "An innovative color palette generator built with TypeScript, featuring advanced color theory algorithms, palette export functionality, and accessibility compliance checking.",
    category: "Frontend",
    complexity: "Intermediate",
    status: "Completed",
    featured: false,
    technologies: ["TypeScript", "Color Theory", "Design Tools", "Accessibility", "Export"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/Huegan",
    image: "/placeholder.svg?height=300&width=500",
    stats: { views: "1.2K", stars: 7, forks: 2 },
    timeline: "1 month",
    teamSize: 1,
    highlights: [
      "Advanced color algorithms",
      "Accessibility compliance",
      "Multiple export formats",
      "Intuitive user interface",
    ],
    gradient: "from-pink-500 to-rose-500",
    icon: "🎨",
    lastUpdated: "Apr 29",
  },
  {
    id: 7,
    title: "DJ-Pilot",
    shortDescription: "HTML-based DJ mixing and music management platform",
    longDescription:
      "A web-based DJ platform built with HTML, CSS, and JavaScript, featuring audio mixing capabilities, playlist management, and real-time audio visualization for aspiring DJs.",
    category: "Frontend",
    complexity: "Beginner",
    status: "In Progress",
    featured: false,
    technologies: ["HTML", "CSS", "JavaScript", "Audio API", "Music", "Visualization"],
    liveUrl: null,
    githubUrl: "https://github.com/Itaxh1/DJ-Pilot",
    image: "/placeholder.svg?height=300&width=500",
    stats: { views: "890", stars: 5, forks: 1 },
    timeline: "2 weeks",
    teamSize: 1,
    highlights: [
      "Audio mixing capabilities",
      "Real-time visualization",
      "Playlist management",
      "Web Audio API integration",
    ],
    gradient: "from-violet-500 to-purple-500",
    icon: "🎧",
    lastUpdated: "2 days ago",
  },
  {
    id: 8,
    title: "Itaxh1 Profile",
    shortDescription: "Personal GitHub profile repository with documentation",
    longDescription:
      "A comprehensive GitHub profile repository containing personal documentation, project showcases, and professional information for portfolio presentation.",
    category: "Documentation",
    complexity: "Beginner",
    status: "Live",
    featured: false,
    technologies: ["Markdown", "Documentation", "GitHub", "Portfolio", "README"],
    liveUrl: "https://github.com/Itaxh1",
    githubUrl: "https://github.com/Itaxh1/Itaxh1",
    image: "/placeholder.svg?height=300&width=500",
    stats: { views: "650", stars: 3, forks: 0 },
    timeline: "1 week",
    teamSize: 1,
    highlights: ["Professional documentation", "Project showcases", "Skills presentation", "Contact information"],
    gradient: "from-gray-500 to-slate-500",
    icon: "📄",
    lastUpdated: "May 8",
  },
]

const categories = ["All", "Full Stack", "Frontend", "Backend", "AI/ML", "Data", "Security", "Documentation"]
const complexityLevels = ["All", "Beginner", "Intermediate", "Advanced"]
const statusOptions = ["All", "Live", "Completed", "In Progress"]

export default function ProjectsPage() {
  const [isDayMode, setIsDayMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedComplexity, setSelectedComplexity] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const projectsRef = useRef(null)

  const heroInView = useInView(heroRef, { threshold: 0.3 })
  const projectsInView = useInView(projectsRef, { threshold: 0.1 })

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    const matchesComplexity = selectedComplexity === "All" || project.complexity === selectedComplexity
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus

    return matchesSearch && matchesCategory && matchesComplexity && matchesStatus
  })

  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const regularProjects = filteredProjects.filter((project) => !project.featured)

  // Stats calculations based on real GitHub data
  const totalProjects = projects.length
  const liveProjects = projects.filter((p) => p.status === "Live").length
  const totalViews = projects.reduce((sum, p) => {
    const viewCount = Number.parseInt(p.stats.views.replace("K", "000").replace(".", ""))
    return sum + viewCount
  }, 0)
  const totalStars = projects.reduce((sum, p) => sum + p.stats.stars, 0)

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDayMode ? "bg-white" : "bg-gray-950"}`}>
      {/* Sophisticated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          <div
            className={`absolute top-0 left-0 w-full h-full ${isDayMode ? "bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-cyan-50/50" : "bg-gradient-to-br from-purple-950/20 via-blue-950/10 to-cyan-950/20"}`}
          />
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: isDayMode
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background: isDayMode
              ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            x: mousePosition.x * -0.005,
            y: mousePosition.y * -0.005,
          }}
        />

        {/* Minimal Geometric Elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-40"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-50"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </div>

      {/* Minimal Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b ${
          isDayMode ? "bg-white/70 border-gray-100/50" : "bg-black/70 border-gray-800/50"
        }`}
      >
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-light tracking-wide">
              <span className={`${isDayMode ? "text-gray-900" : "text-white"}`}>AK</span>
            </Link>

            <div className="hidden md:flex items-center space-x-12">
              <nav className="flex gap-8">
                {[
                  { href: "/", label: "Home" },
                  { href: "/#about", label: "About" },
                  { href: "/#experience", label: "Work" },
                  { href: "/projects", label: "Projects" },
                  { href: "/#contact", label: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-sm font-light tracking-wide transition-all duration-300 ${
                      item.href === "/projects"
                        ? isDayMode
                          ? "text-purple-600"
                          : "text-purple-400"
                        : isDayMode
                          ? "text-gray-600 hover:text-gray-900"
                          : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.href === "/projects" && (
                      <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-600 to-blue-600" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-full p-1 backdrop-blur-sm">
                <Sun className="h-4 w-4 text-yellow-500" />
                <Switch
                  checked={!isDayMode}
                  onCheckedChange={(checked) => setIsDayMode(!checked)}
                  aria-label="Toggle theme"
                />
                <Moon className="h-4 w-4 text-purple-600" />
              </div>

              <Link href="/village">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-full px-6">
                  3D Experience
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="flex flex-col gap-2 mt-4">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/#about", label: "About" },
                    { href: "/#experience", label: "Work" },
                    { href: "/projects", label: "Projects" },
                    { href: "/#contact", label: "Contact" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-2 rounded-lg transition-colors font-light ${
                        item.href === "/projects"
                          ? isDayMode
                            ? "bg-purple-500/20 text-purple-600"
                            : "bg-purple-500/20 text-purple-400"
                          : isDayMode
                            ? "text-gray-600 hover:bg-gray-100"
                            : "text-gray-300 hover:bg-gray-800"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center pt-20 px-8"
      >
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-full px-6 py-3 border border-purple-100/50 dark:border-purple-800/30 mb-8"
            >
              <Rocket className="h-4 w-4 text-purple-600" />
              <span className={`text-sm font-light ${isDayMode ? "text-purple-700" : "text-purple-300"}`}>
                Featured Projects
              </span>
            </motion.div>

            <motion.h1
              className={`text-6xl lg:text-8xl font-extralight leading-tight tracking-tight ${isDayMode ? "text-gray-900" : "text-white"}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            >
              <span className="block">Selected</span>
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent font-light">
                Works
              </span>
            </motion.h1>

            <motion.p
              className={`text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto ${isDayMode ? "text-gray-600" : "text-gray-300"}`}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 0.8, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            >
              A curated collection of projects showcasing{" "}
              <span className="font-medium text-purple-600">modern technologies</span> and{" "}
              <span className="font-medium text-blue-600">innovative solutions</span>
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            >
              {[
                { label: "Projects", value: totalProjects, suffix: "" },
                { label: "Live Apps", value: liveProjects, suffix: "" },
                { label: "Total Views", value: Math.round(totalViews / 1000), suffix: "K+" },
                { label: "GitHub Stars", value: totalStars, suffix: "+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  className={`text-center p-6 rounded-2xl backdrop-blur-sm border ${
                    isDayMode ? "bg-white/50 border-gray-200/50" : "bg-gray-800/50 border-gray-700/50"
                  }`}
                >
                  <div className="text-3xl font-light mb-2">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <p className="opacity-70 font-light text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className={`w-6 h-6 ${isDayMode ? "text-gray-400" : "text-gray-500"}`} />
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section id="projects" ref={projectsRef} className="py-32 px-8 relative">
        <div className="container mx-auto max-w-7xl">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                <Input
                  placeholder="Search projects, technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-12 h-12 rounded-full border-2 font-light ${
                    isDayMode
                      ? "bg-white/80 border-gray-200/50 focus:border-purple-300"
                      : "bg-gray-800/80 border-gray-700/50 focus:border-purple-600"
                  } backdrop-blur-sm`}
                />
              </div>

              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 h-12 px-6 rounded-full border-2 font-light ${
                  isDayMode
                    ? "border-gray-200/50 hover:border-purple-300 hover:bg-purple-50/50"
                    : "border-gray-700/50 hover:border-purple-600 hover:bg-purple-900/20"
                } backdrop-blur-sm`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-8 rounded-3xl border mb-8 backdrop-blur-sm ${
                    isDayMode ? "bg-white/80 border-gray-200/50" : "bg-gray-800/80 border-gray-700/50"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <label className="block text-sm font-light mb-3">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`w-full p-3 rounded-2xl border font-light ${
                          isDayMode ? "bg-white/50 border-gray-300/50" : "bg-gray-700/50 border-gray-600/50"
                        } backdrop-blur-sm`}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-light mb-3">Complexity</label>
                      <select
                        value={selectedComplexity}
                        onChange={(e) => setSelectedComplexity(e.target.value)}
                        className={`w-full p-3 rounded-2xl border font-light ${
                          isDayMode ? "bg-white/50 border-gray-300/50" : "bg-gray-700/50 border-gray-600/50"
                        } backdrop-blur-sm`}
                      >
                        {complexityLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-light mb-3">Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className={`w-full p-3 rounded-2xl border font-light ${
                          isDayMode ? "bg-white/50 border-gray-300/50" : "bg-gray-700/50 border-gray-600/50"
                        } backdrop-blur-sm`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Featured Projects Grid */}
          {featuredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="mb-20"
            >
              <h3
                className={`text-3xl font-light mb-12 flex items-center gap-3 ${isDayMode ? "text-gray-900" : "text-white"}`}
              >
                <Star className={`w-6 h-6 ${isDayMode ? "text-yellow-500" : "text-yellow-400"}`} />
                Featured Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isDayMode={isDayMode}
                    index={index}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Regular Projects Grid */}
          {regularProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h3 className={`text-3xl font-light mb-12 ${isDayMode ? "text-gray-900" : "text-white"}`}>
                All Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isDayMode={isDayMode}
                    index={index + featuredProjects.length}
                    onSelect={setSelectedProject}
                    compact
                  />
                ))}
              </div>
            </motion.div>
          )}

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className={`text-3xl font-light mb-4 ${isDayMode ? "text-gray-900" : "text-white"}`}>
                No projects found
              </h3>
              <p className={`font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Contact Section */}
      <section className={`py-32 px-8 ${isDayMode ? "bg-gray-50/50" : "bg-gray-900/30"}`}>
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className={`text-5xl lg:text-6xl font-extralight ${isDayMode ? "text-gray-900" : "text-white"}`}>
              Let's Create
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block font-light">
                Together
              </span>
            </h2>
            <p className={`text-xl font-light mt-8 max-w-2xl mx-auto ${isDayMode ? "text-gray-600" : "text-gray-300"}`}>
              Ready to bring your vision to life with modern technology and thoughtful design.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Mail className="h-8 w-8" />,
                title: "Email",
                contact: "ufoundashwin@gmail.com",
                link: "mailto:ufoundashwin@gmail.com",
                gradient: "from-red-500 to-pink-500",
              },
              {
                icon: <Linkedin className="h-8 w-8" />,
                title: "LinkedIn",
                contact: "ashwinkumar99",
                link: "https://www.linkedin.com/in/ashwinkumar99/",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Github className="h-8 w-8" />,
                title: "GitHub",
                contact: "Itaxh1",
                link: "https://github.com/Itaxh1",
                gradient: "from-purple-500 to-indigo-500",
              },
            ].map((contact, index) => (
              <motion.a
                key={contact.title}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`group p-8 rounded-3xl backdrop-blur-sm ${
                  isDayMode
                    ? "bg-white/80 border border-gray-100/50 shadow-lg hover:shadow-xl"
                    : "bg-gray-900/80 border border-gray-700/50 hover:border-gray-600/50"
                } transition-all duration-500 block`}
              >
                <div className="text-center space-y-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{contact.icon}</div>
                  </div>
                  <div>
                    <h3 className={`text-lg font-light mb-2 ${isDayMode ? "text-gray-900" : "text-white"}`}>
                      {contact.title}
                    </h3>
                    <p className={`font-light bg-gradient-to-r ${contact.gradient} bg-clip-text text-transparent`}>
                      {contact.contact}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-10 py-4 text-lg rounded-full">
                  Start a Project
                </Button>
              </Link>
              <Link href="/village">
                <Button
                  variant="outline"
                  size="lg"
                  className={`px-10 py-4 text-lg border-2 rounded-full ${
                    isDayMode
                      ? "border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                      : "border-purple-800 hover:border-purple-700 hover:bg-purple-900/20 hover:text-white"
                  }`}
                >
                  <Eye className="h-5 w-5 mr-2" />
                  3D Experience
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer
        className={`py-16 px-8 border-t ${isDayMode ? "bg-white/50 border-gray-100/50" : "bg-gray-950/50 border-gray-800/50"} backdrop-blur-sm`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h3 className={`text-2xl font-light ${isDayMode ? "text-gray-900" : "text-white"}`}>Ashwin Kumar</h3>
              <p className={`font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>
                Software Engineer & Problem Solver
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <a
                href="https://github.com/Itaxh1"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDayMode ? "text-gray-500 hover:text-purple-600" : "text-gray-400 hover:text-purple-400"} transition-colors`}
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ashwinkumar99/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDayMode ? "text-gray-500 hover:text-purple-600" : "text-gray-400 hover:text-purple-400"} transition-colors`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:ufoundashwin@gmail.com"
                className={`${isDayMode ? "text-gray-500 hover:text-purple-600" : "text-gray-400 hover:text-purple-400"} transition-colors`}
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className={`pt-8 mt-8 border-t ${isDayMode ? "border-gray-100/50" : "border-gray-800/50"} text-center`}>
            <p className={`font-light ${isDayMode ? "text-gray-500" : "text-gray-400"}`}>
              © {new Date().getFullYear()} Crafted with precision and passion
            </p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} isDayMode={isDayMode} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, isDayMode, index, onSelect, compact = false }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { threshold: 0.1 })

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Frontend":
        return Palette
      case "Backend":
        return Server
      case "Full Stack":
        return Code
      case "AI/ML":
        return Brain
      case "Data":
        return Database
      case "Security":
        return Shield
      case "Documentation":
        return Code
      default:
        return Code
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Live":
        return isDayMode
          ? "bg-green-100/80 text-green-700 border-green-200/50"
          : "bg-green-500/20 text-green-400 border-green-500/30"
      case "Completed":
        return isDayMode
          ? "bg-blue-100/80 text-blue-700 border-blue-200/50"
          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "In Progress":
        return isDayMode
          ? "bg-yellow-100/80 text-yellow-700 border-yellow-200/50"
          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return isDayMode
          ? "bg-gray-100/80 text-gray-700 border-gray-200/50"
          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const CategoryIcon = getCategoryIcon(project.category)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group cursor-pointer ${compact ? "h-full" : ""}`}
      onClick={() => onSelect(project)}
    >
      <Card
        className={`h-full overflow-hidden backdrop-blur-sm border-2 transition-all duration-500 ${
          isDayMode
            ? "bg-white/80 border-gray-200/50 hover:border-purple-300/50 hover:shadow-xl"
            : "bg-gray-900/80 border-gray-700/50 hover:border-purple-500/50 hover:shadow-2xl"
        }`}
      >
        <div className="relative overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Status and Featured badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={`${getStatusColor(project.status)} border backdrop-blur-sm font-light`}>
              {project.status}
            </Badge>
            {project.featured && (
              <Badge
                className={`${
                  isDayMode
                    ? "bg-yellow-100/80 text-yellow-700 border-yellow-200/50"
                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                } border backdrop-blur-sm font-light`}
              >
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {/* Category icon */}
          <div className="absolute top-4 right-4">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-sm ${
                isDayMode ? "bg-white/80 text-purple-600" : "bg-gray-800/80 text-purple-400"
              }`}
            >
              <CategoryIcon className="w-5 h-5" />
            </div>
          </div>

          {/* Project icon */}
          <div className="absolute bottom-4 left-4">
            <div className={`text-3xl bg-gradient-to-r ${project.gradient} bg-clip-text`}>{project.icon}</div>
          </div>

          {/* Quick actions */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-sm ${
                  isDayMode ? "bg-white/80 text-gray-900" : "bg-gray-800/80 text-white"
                } hover:scale-110 transition-transform`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-sm ${
                  isDayMode ? "bg-white/80 text-gray-900" : "bg-gray-800/80 text-white"
                } hover:scale-110 transition-transform`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-4">
            <h3
              className={`text-xl font-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all ${isDayMode ? "text-gray-900" : "text-white"}`}
            >
              {project.title}
            </h3>
          </div>

          <p className={`font-light mb-6 line-clamp-2 ${isDayMode ? "text-gray-600" : "text-gray-300"}`}>
            {project.shortDescription}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, compact ? 3 : 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className={`text-xs font-light ${
                  isDayMode ? "bg-gray-100/80 text-gray-700" : "bg-gray-700/80 text-gray-300"
                } backdrop-blur-sm`}
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > (compact ? 3 : 4) && (
              <Badge variant="secondary" className="text-xs opacity-50 font-light">
                +{project.technologies.length - (compact ? 3 : 4)}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div
            className={`flex items-center justify-between text-sm font-light ${isDayMode ? "text-gray-500" : "text-gray-400"}`}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {project.stats.views}
              </span>
              {project.stats.stars > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {project.stats.stars}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{project.teamSize}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Project Modal Component
function ProjectModal({ project, isDayMode, onClose }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Frontend":
        return Palette
      case "Backend":
        return Server
      case "Full Stack":
        return Code
      case "AI/ML":
        return Brain
      case "Data":
        return Database
      case "Security":
        return Shield
      case "Documentation":
        return Code
      default:
        return Code
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Live":
        return isDayMode
          ? "bg-green-100/80 text-green-700 border-green-200/50"
          : "bg-green-500/20 text-green-400 border-green-500/30"
      case "Completed":
        return isDayMode
          ? "bg-blue-100/80 text-blue-700 border-blue-200/50"
          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "In Progress":
        return isDayMode
          ? "bg-yellow-100/80 text-yellow-700 border-yellow-200/50"
          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return isDayMode
          ? "bg-gray-100/80 text-gray-700 border-gray-200/50"
          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const CategoryIcon = getCategoryIcon(project.category)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl ${
          isDayMode ? "bg-white/95 border-gray-200/50" : "bg-gray-900/95 border-gray-700/50"
        } border-2 shadow-2xl backdrop-blur-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 z-10 w-10 h-10 rounded-2xl flex items-center justify-center ${
            isDayMode ? "bg-gray-100/80 hover:bg-gray-200/80" : "bg-gray-800/80 hover:bg-gray-700/80"
          } transition-colors backdrop-blur-sm`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project image */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Project title overlay */}
          <div className="absolute bottom-8 left-8 right-20">
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r ${project.gradient}`}
              >
                <CategoryIcon className="w-6 h-6 text-white" />
              </div>
              <Badge className={`${getStatusColor(project.status)} border backdrop-blur-sm font-light`}>
                {project.status}
              </Badge>
            </div>
            <h2 className="text-4xl font-light text-white mb-3">{project.title}</h2>
            <p className="text-gray-200 font-light text-lg">{project.shortDescription}</p>
          </div>
        </div>

        <div className="p-10">
          {/* Project details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="flex items-center gap-4">
              <Calendar className="w-6 h-6 opacity-70" />
              <div>
                <p className={`text-sm font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>Timeline</p>
                <p className={`font-light ${isDayMode ? "text-gray-900" : "text-white"}`}>{project.timeline}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="w-6 h-6 opacity-70" />
              <div>
                <p className={`text-sm font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>Team Size</p>
                <p className={`font-light ${isDayMode ? "text-gray-900" : "text-white"}`}>
                  {project.teamSize} {project.teamSize === 1 ? "person" : "people"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Target className="w-6 h-6 opacity-70" />
              <div>
                <p className={`text-sm font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>Complexity</p>
                <p className={`font-light ${isDayMode ? "text-gray-900" : "text-white"}`}>{project.complexity}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className={`text-2xl font-light mb-6 ${isDayMode ? "text-gray-900" : "text-white"}`}>
              About This Project
            </h3>
            <p className={`font-light leading-relaxed text-lg ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
              {project.longDescription}
            </p>
          </div>

          {/* Key highlights */}
          <div className="mb-10">
            <h3 className={`text-2xl font-light mb-6 ${isDayMode ? "text-gray-900" : "text-white"}`}>Key Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`} />
                  <span className={`font-light ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-10">
            <h3 className={`text-2xl font-light mb-6 ${isDayMode ? "text-gray-900" : "text-white"}`}>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  className={`${
                    isDayMode
                      ? "bg-gray-100/80 text-gray-700 border-gray-200/50"
                      : "bg-gray-800/80 text-gray-300 border-gray-700/50"
                  } border backdrop-blur-sm font-light px-4 py-2`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-10">
            <h3 className={`text-2xl font-light mb-6 ${isDayMode ? "text-gray-900" : "text-white"}`}>Project Stats</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-light mb-2">{project.stats.views}</div>
                <div className={`text-sm font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light mb-2">{project.stats.stars}</div>
                <div className={`text-sm font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>Stars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light mb-2">{project.stats.forks}</div>
                <div className={`text-sm font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>Forks</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button
                  className={`w-full bg-gradient-to-r ${project.gradient} hover:opacity-90 text-white rounded-full py-4`}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full rounded-full py-4 font-light">
                  <Github className="w-5 h-5 mr-2" />
                  View Source Code
                </Button>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
