"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink, Terminal, Activity, Code, Zap } from "lucide-react"

// GitHub API integration for activity only
const GITHUB_USERNAME = "Itaxh1"
const GITHUB_API_BASE = "https://api.github.com"

// GitHub API functions for activity feed only
const fetchGitHubActivity = async () => {
  try {
    const [userResponse, eventsResponse] = await Promise.all([
      fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`),
      fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=8`),
    ])

    const user = await userResponse.json()
    const events = await eventsResponse.json()

    return { user, events }
  } catch (error) {
    console.error("GitHub API Error:", error)
    return null
  }
}

const formatGitHubEvent = (event) => {
  const time = new Date(event.created_at).toLocaleTimeString("en-US", { hour12: false })
  const repo = event.repo.name.split("/")[1]

  switch (event.type) {
    case "PushEvent":
      const commits = event.payload.commits?.length || 1
      const message = event.payload.commits?.[0]?.message || "Updated code"
      return `[${time}] PUSH_EVENT | ${repo} | ${commits} commit${commits > 1 ? "s" : ""} | "${message.substring(0, 40)}${message.length > 40 ? "..." : ""}"`
    case "CreateEvent":
      return `[${time}] CREATE_EVENT | ${repo} | Created ${event.payload.ref_type}`
    case "WatchEvent":
      return `[${time}] STAR_EVENT | ${repo} | Repository starred`
    case "ForkEvent":
      return `[${time}] FORK_EVENT | ${repo} | Repository forked`
    case "IssuesEvent":
      return `[${time}] ISSUE_EVENT | ${repo} | ${event.payload.action} issue`
    case "PullRequestEvent":
      return `[${time}] PR_EVENT | ${repo} | ${event.payload.action} pull request`
    default:
      return `[${time}] ${event.type.toUpperCase()} | ${repo}`
  }
}

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState([
    "SYSTEM_INITIALIZED...",
    "LOADING_PORTFOLIO_V2.0...",
    "CONNECTION_ESTABLISHED",
    "FETCHING_GITHUB_ACTIVITY...",
    "READY_FOR_INPUT",
  ])
  const [githubActivity, setGithubActivity] = useState(null)
  const [systemStats, setSystemStats] = useState({
    uptime: "0d 0h 0m",
    commits: 247,
    repositories: 0,
    linesOfCode: 15420,
    coffeeConsumed: 342,
  })
  const [realtimeActivity, setRealtimeActivity] = useState([])
  const [isLoadingActivity, setIsLoadingActivity] = useState(true)
  const { scrollYProgress } = useScroll()

  // Fetch GitHub activity on component mount
  useEffect(() => {
    const loadGitHubActivity = async () => {
      setIsLoadingActivity(true)
      const data = await fetchGitHubActivity()

      if (data) {
        setGithubActivity(data)

        // Update only repository count from real GitHub data
        setSystemStats((prev) => ({
          ...prev,
          repositories: data.user.public_repos,
        }))

        // Format recent activity
        const formattedActivity = data.events.map(formatGitHubEvent)
        setRealtimeActivity(formattedActivity)

        // Add GitHub connection success to terminal
        setTerminalHistory((prev) => [...prev, "GITHUB_ACTIVITY_CONNECTED | REAL_TIME_FEED_ACTIVE"])
      } else {
        setTerminalHistory((prev) => [...prev, "GITHUB_API_ERROR | USING_FALLBACK_DATA"])
        // Fallback activity
        setRealtimeActivity([
          "[12:34:56] PUSH_EVENT | naruto-portfolio | 2 commits | 'Added real-time GitHub integration'",
          "[11:22:33] CREATE_EVENT | new-project | Created repository",
          "[10:15:42] STAR_EVENT | emergency-exit-system | Repository starred",
          "[09:45:21] PUSH_EVENT | taskpilot | 1 commit | 'Updated documentation'",
        ])
      }

      setIsLoadingActivity(false)
    }

    loadGitHubActivity()

    // Refresh GitHub activity every 5 minutes
    const activityInterval = setInterval(loadGitHubActivity, 5 * 60 * 1000)

    return () => clearInterval(activityInterval)
  }, [])

  // Terminal-style time update
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

    // Loading animation
    setTimeout(() => setIsLoaded(true), 500)

    return () => clearInterval(interval)
  }, [])

  // System stats update
  useEffect(() => {
    const startTime = new Date("2024-01-01")
    const updateStats = () => {
      const now = new Date()
      const diff = now.getTime() - startTime.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setSystemStats((prev) => ({
        ...prev,
        uptime: `${days}d ${hours}h ${minutes}m`,
        commits: 247 + Math.floor(Math.random() * 3),
        linesOfCode: 15420 + Math.floor(Math.random() * 50),
        coffeeConsumed: 342 + Math.floor(Math.random() * 2),
      }))
    }

    updateStats()
    const interval = setInterval(updateStats, 30000)
    return () => clearInterval(interval)
  }, [])

  // Scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const section = Math.floor(scrolled / windowHeight)
      setActiveSection(section)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTerminalCommand = (command) => {
    const cmd = command.toLowerCase().trim()
    let response = ""

    switch (cmd) {
      case "help":
        response = "AVAILABLE_COMMANDS: help, about, skills, projects, contact, clear, whoami, status"
        break
      case "about":
        response = "FULL_STACK_ENGINEER | OREGON_STATE_UNIVERSITY_GRADUATE | 2+_YEARS_EXPERIENCE"
        break
      case "skills":
        response = "PYTHON | TYPESCRIPT | REACT | NODE.JS | FLASK | NEXT.JS | DOCKER | GCP"
        break
      case "projects":
        response = `${systemStats.repositories}_REPOSITORIES | 4_LIVE_DEPLOYMENTS | CHECK_/PROJECTS_FOR_DETAILS`
        break
      case "contact":
        response = "EMAIL: ufoundashwin@gmail.com | LINKEDIN: ashwinkumar99 | GITHUB: Itaxh1"
        break
      case "status":
        response = "STATUS: ACTIVELY_SEEKING_OPPORTUNITIES | MASTER'S_COMPLETED | AVAILABLE_IMMEDIATELY"
        break
      case "clear":
        setTerminalHistory(["TERMINAL_CLEARED"])
        setTerminalInput("")
        return
      case "whoami":
        response = "ASHWIN_KUMAR | SOFTWARE_ENGINEER | PROBLEM_SOLVER | CODE_ARCHITECT"
        break
      default:
        response = `COMMAND_NOT_FOUND: ${command} | TYPE 'help' FOR_AVAILABLE_COMMANDS`
    }

    setTerminalHistory((prev) => [...prev, `> ${command}`, response])
    setTerminalInput("")
  }

  const sections = [
    {
      id: "intro",
      title: "ASHWIN_KUMAR.DEV",
      subtitle: "FULL-STACK ENGINEER.",
      description: "PROBLEM SOLVER. CODE ARCHITECT.",
      location: "Arizona, US",
    },
    {
      id: "system",
      title: "SYSTEM_STATUS.LOG",
      subtitle: "REAL-TIME METRICS.",
      description: "LIVE GITHUB ACTIVITY FEED.",
      location: "ACTIVE",
    },
    {
      id: "terminal",
      title: "INTERACTIVE_TERMINAL.SH",
      subtitle: "COMMAND INTERFACE.",
      description: "TRY TYPING 'STATUS' OR 'HELP'.",
      location: "READY",
    },
    {
      id: "journey",
      title: "CAREER_TIMELINE.JSON",
      subtitle: "PROFESSIONAL JOURNEY.",
      description: "FROM STUDENT TO ENGINEER.",
      location: "2022-2025",
    },
    {
      id: "work",
      title: "SELECTED_WORKS.JSON",
      subtitle: "DIGITAL SOLUTIONS.",
      description: "REAL-WORLD IMPACT.",
      location: "2024",
    },
    {
      id: "about",
      title: "ABOUT_ME.MD",
      subtitle: "RECENT GRADUATE.",
      description: "SEEKING NEW OPPORTUNITIES.",
      location: "AVAILABLE",
    },
    {
      id: "contact",
      title: "CONNECT.SH",
      subtitle: "LET'S BUILD TOGETHER.",
      description: "AVAILABLE FOR OPPORTUNITIES.",
      location: "READY",
    },
  ]

  const projects = [
    {
      name: "EMERGENCY_EXIT_SYSTEM",
      type: "REAL_TIME_MANAGEMENT",
      tech: "PYTHON_FLASK_GCP",
      status: "LIVE",
      url: "https://emergency-exit-system-654928681850.us-central1.run.app",
      github: "https://github.com/Itaxh1/Emergency-Exit-System",
      year: "2024",
    },
    {
      name: "TASKPILOT",
      type: "WORKFLOW_AUTOMATION",
      tech: "PYTHON_ANALYTICS",
      status: "COMPLETE",
      url: null,
      github: "https://github.com/Itaxh1/TaskPilot",
      year: "2024",
    },
    {
      name: "JOBTRACKER",
      type: "APPLICATION_MANAGEMENT",
      tech: "TYPESCRIPT_REACT",
      status: "ACTIVE",
      url: null,
      github: "https://github.com/Itaxh1/JobTracker",
      year: "2024",
    },
    {
      name: "NARUTO_PORTFOLIO",
      type: "3D_EXPERIENCE",
      tech: "NEXTJS_THREEJS",
      status: "LIVE",
      url: "/village",
      github: "https://github.com/Itaxh1/naruto-portfolio",
      year: "2024",
    },
  ]

  const timeline = [
    {
      year: "2025",
      title: "ACTIVELY_SEEKING_OPPORTUNITIES",
      company: "FULL_STACK_ENGINEER_ROLES",
      type: "ONGOING",
      description: "OPEN_TO_REMOTE | ON_SITE | HYBRID_POSITIONS",
    },
    {
      year: "2025",
      title: "MASTER_OF_ENGINEERING",
      company: "OREGON_STATE_UNIVERSITY",
      type: "COMPLETED",
      description: "COMPUTER_SCIENCE | GPA_3.6/4.0 | GRADUATED_MARCH_2025",
    },
    {
      year: "2024",
      title: "WEB_DEVELOPER",
      company: "OREGON_STATE_UNIVERSITY",
      type: "COMPLETED",
      description: "ANGULAR_14 | DRUPAL_10 | SEO_OPTIMIZATION | PROJECT_COMPLETED",
    },
    {
      year: "2023",
      title: "ASSOCIATE_SOFTWARE_DEVELOPER",
      company: "AGROSPERITY_KIVI",
      type: "COMPLETED",
      description: "CI/CD_PIPELINES | APACHE_KAFKA | GOOGLE_EARTH_ENGINE",
    },
    {
      year: "2022",
      title: "DATA_ANALYST_CONSULTANT",
      company: "GENWORKS_HEALTHCARE",
      type: "COMPLETED",
      description: "HEALTHCARE_ANALYTICS | PYTHON | SQL | DASHBOARDS",
    },
  ]

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen overflow-x-hidden">
      {/* Terminal Loading Effect */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-green-400 text-xl mb-4"
              >
                INITIALIZING...
              </motion.div>
              <div className="text-green-600 text-sm">LOADING PORTFOLIO_V2.0</div>
              <div className="text-green-600 text-xs mt-2">CONNECTING_TO_GITHUB_ACTIVITY...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6"
      >
        <div className="flex justify-between items-center">
          <div className="text-sm flex items-center gap-2">
            <span className="text-green-600">~/</span>
            <span className="text-green-400">ASHWIN_KUMAR</span>
            {isLoadingActivity && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-green-600 text-xs"
              >
                [SYNCING_ACTIVITY]
              </motion.div>
            )}
            {githubActivity && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-400 text-xs flex items-center gap-1"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                ACTIVITY_LIVE
              </motion.div>
            )}
          </div>
          <div className="text-sm text-green-600">PDT_{currentTime}</div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Section Content */}
            <div className="max-w-5xl w-full">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
                className="space-y-8 md:space-y-12 lg:space-y-16"
              >
                {/* Section Header */}
                <div className="space-y-4 md:space-y-6">
                  <motion.h1
                    className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight break-words"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {section.title}
                  </motion.h1>
                  <motion.div
                    className="text-lg md:text-xl lg:text-2xl text-green-300"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {section.subtitle}
                  </motion.div>
                  <motion.div
                    className="text-base md:text-lg text-green-500"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {section.description}
                  </motion.div>
                </div>

                {/* Section-specific Content */}
                {section.id === "intro" && (
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-8 md:space-y-10"
                  >
                    <div className="text-green-600 text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <span>CURRENT_STATUS: ACTIVELY_SEEKING_OPPORTUNITIES</span>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="w-2 h-2 bg-yellow-400 rounded-full"
                        />
                      </div>
                      <div>LOCATION: {section.location}</div>
                      <div>SPECIALIZATION: FULL_STACK_DEVELOPMENT</div>
                      <div>EDUCATION: MASTER'S_COMPLETED_MARCH_2025</div>
                      {githubActivity && (
                        <div className="flex items-center gap-2">
                          <span>GITHUB_ACTIVITY: LIVE_FEED_CONNECTED</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                     
                        <Link href="http://claw.codes/">
                        <motion.button
                          whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto px-6 py-3 border border-green-400 text-green-400 hover:text-black transition-all duration-300"
                        >
                          CLAW LLM [Game Generation LLM]
                        </motion.button>
                      </Link>
                      <Link href="/village">
                        <motion.button
                          whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto px-6 py-3 border border-green-400 text-green-400 hover:text-black transition-all duration-300"
                        >
                          3D RESUME GAME [PC_ONLY]
                        </motion.button>
                      </Link>
                     <Link href="https://www.ashxinkumar.me/projects">
                        <motion.button
                          whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto px-6 py-3 border border-green-400 text-green-400 hover:text-black transition-all duration-300"
                        >
                          VIEW_PROJECTS.SH
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )}

                {section.id === "system" && (
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-10 md:space-y-12"
                  >
                    <div className="text-green-600 text-sm mb-8 flex items-center gap-2">
                      <span>MONITORING_ACTIVE | LAST_UPDATE: {currentTime}</span>
                      {githubActivity && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {[
                        { label: "SYSTEM_UPTIME", value: systemStats.uptime, icon: Activity },
                        { label: "GITHUB_REPOS", value: systemStats.repositories, icon: Github },
                        { label: "TOTAL_COMMITS", value: systemStats.commits, icon: Github },
                        { label: "LINES_OF_CODE", value: systemStats.linesOfCode.toLocaleString(), icon: Code },
                        { label: "COFFEE_CONSUMED", value: `${systemStats.coffeeConsumed} CUPS`, icon: Zap },
                        { label: "JOB_SEARCH_STATUS", value: "ACTIVE", icon: Activity },
                      ].map((stat, idx) => (
                        <motion.div
                          key={stat.label}
                          initial={{ x: -50, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          whileHover={{ x: 10, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                          className="border border-green-800 p-6 md:p-8 hover:border-green-400 transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <stat.icon className="w-5 h-5 text-green-500" />
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: idx * 0.5 }}
                              className={`w-2 h-2 rounded-full ${
                                stat.label === "JOB_SEARCH_STATUS" ? "bg-yellow-400" : "bg-green-400"
                              }`}
                            />
                          </div>
                          <div className="text-green-300 group-hover:text-green-200 text-lg md:text-xl font-bold">
                            {stat.value}
                          </div>
                          <div className="text-green-600 text-sm">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="border border-green-800 p-6 md:p-8">
                      <div className="text-green-300 mb-6 flex items-center gap-2">
                        <span>REAL_TIME_GITHUB_ACTIVITY:</span>
                        {isLoadingActivity && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"
                          />
                        )}
                      </div>
                      <div className="space-y-3 text-sm max-h-48 overflow-y-auto">
                        {realtimeActivity.length > 0 ? (
                          realtimeActivity.map((log, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="text-green-600 break-words"
                            >
                              {log}
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-green-600">LOADING_GITHUB_ACTIVITY...</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {section.id === "terminal" && (
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-8 md:space-y-10"
                  >
                    <div className="text-green-600 text-sm mb-8">
                      INTERACTIVE_MODE | TRY_'status'_FOR_JOB_SEARCH_INFO
                    </div>

                    <div className="border border-green-800 bg-black/50 p-6 md:p-8 h-72 md:h-80 overflow-y-auto">
                      <div className="space-y-3 text-sm">
                        {terminalHistory.map((line, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={line.startsWith(">") ? "text-green-300" : "text-green-500"}
                          >
                            {line}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border border-green-800 p-4">
                      <span className="text-green-400">$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && terminalInput.trim()) {
                            handleTerminalCommand(terminalInput)
                          }
                        }}
                        className="flex-1 bg-transparent text-green-400 outline-none placeholder-green-600"
                        placeholder="TYPE_COMMAND_HERE..."
                      />
                      <Terminal className="w-4 h-4 text-green-600" />
                    </div>

                    <div className="text-green-600 text-xs">
                      NEW_COMMAND: 'status' (job search status), 'help' (all commands)
                    </div>
                  </motion.div>
                )}

                {section.id === "journey" && (
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-10 md:space-y-12"
                  >
                    <div className="text-green-600 text-sm mb-10">CAREER_PROGRESSION | CHRONOLOGICAL_ORDER</div>

                    <div className="space-y-8">
                      {timeline.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -50, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          whileHover={{ x: 10, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                          className="border border-green-800 p-6 md:p-8 hover:border-green-400 transition-all duration-300 group"
                        >
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                            <div>
                              <h3 className="text-lg md:text-xl text-green-300 group-hover:text-green-200 mb-2">
                                {item.title}
                              </h3>
                              <div className="text-green-500 mb-3">{item.company}</div>
                              <div className="text-green-600 text-sm">{item.description}</div>
                            </div>
                            <div className="flex gap-3 mt-4 md:mt-0">
                              <span className="text-xs px-3 py-1 border border-green-600 text-green-600">
                                {item.year}
                              </span>
                              <span
                                className={`text-xs px-3 py-1 border ${
                                  item.type === "ONGOING"
                                    ? "border-yellow-400 text-yellow-400"
                                    : item.type === "COMPLETED"
                                      ? "border-blue-400 text-blue-400"
                                      : "border-green-400 text-green-400"
                                }`}
                              >
                                {item.type}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {section.id === "work" && (
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-10 md:space-y-12"
                  >
                    <div className="text-green-600 text-sm mb-10">
                      PROJECTS_COUNT: {projects.length} | GITHUB_REPOS: {systemStats.repositories} | STATUS:
                      ACTIVE_DEVELOPMENT
                    </div>

                    <div className="grid gap-6 md:gap-8">
                      {projects.map((project, idx) => (
                        <motion.div
                          key={project.name}
                          initial={{ x: -50, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          whileHover={{ x: 10, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                          className="border border-green-800 p-6 md:p-8 hover:border-green-400 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg md:text-xl text-green-300 group-hover:text-green-200 break-words mb-2">
                                {project.name}
                              </h3>
                              <div className="text-green-600 text-sm break-words">
                                {project.type} | {project.tech}
                              </div>
                            </div>
                            <div className="flex gap-3 mt-4 md:mt-0 flex-shrink-0">
                              <span
                                className={`text-xs px-3 py-1 border ${
                                  project.status === "LIVE"
                                    ? "border-green-400 text-green-400"
                                    : project.status === "ACTIVE"
                                      ? "border-yellow-400 text-yellow-400"
                                      : "border-blue-400 text-blue-400"
                                }`}
                              >
                                {project.status}
                              </span>
                              <span className="text-xs px-3 py-1 border border-green-600 text-green-600">
                                {project.year}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 hover:text-green-300 flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                LIVE_DEMO <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-500 hover:text-green-300 flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              SOURCE_CODE <Github className="w-3 h-3" />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <Link href="/projects">
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-6 py-3 border border-green-400 text-green-400 hover:text-black transition-all duration-300 mt-10"
                      >
                        VIEW_ALL_PROJECTS.JSON
                      </motion.button>
                    </Link>
                  </motion.div>
                )}

                {section.id === "about" && (
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-8 md:space-y-10"
                  >
                    <div className="text-green-600 text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <span>STATUS: ACTIVELY_SEEKING_FULL_STACK_ROLES</span>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="w-2 h-2 bg-yellow-400 rounded-full"
                        />
                      </div>
                      <div>EDUCATION: MASTER_OF_ENGINEERING_CS | COMPLETED_MARCH_2025</div>
                      <div>INSTITUTION: OREGON_STATE_UNIVERSITY</div>
                      <div>GPA: 3.6/4.0 | RECENT_GRADUATE</div>
                      <div>EXPERIENCE: 2+_YEARS_PROFESSIONAL</div>
                      <div>AVAILABILITY: IMMEDIATE_START</div>
                    </div>

                    <div className="space-y-6">
                      <div className="text-green-300">TECHNICAL_STACK:</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                        {[
                          "PYTHON",
                          "TYPESCRIPT",
                          "REACT",
                          "NODE.JS",
                          "FLASK",
                          "NEXT.JS",
                          "DOCKER",
                          "GCP",
                          "POSTGRESQL",
                          "MONGODB",
                          "REDIS",
                          "KAFKA",
                        ].map((tech, idx) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="text-green-500 hover:text-green-300 cursor-default"
                          >
                            • {tech}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-green-300">RECENT_EXPERIENCE:</div>
                      <div className="text-green-600 text-sm space-y-2">
                        <div>WEB_DEVELOPER @ OREGON_STATE_UNIVERSITY (2024-COMPLETED)</div>
                        <div>ASSOCIATE_SOFTWARE_DEVELOPER @ AGROSPERITY_KIVI (2022-2023)</div>
                        <div>DATA_ANALYST_CONSULTANT @ GENWORKS_HEALTHCARE (2022)</div>
                      </div>
                    </div>

                    <div className="border border-yellow-400 p-6 bg-yellow-400/5">
                      <div className="text-yellow-400 text-sm font-bold mb-4">🎯 CURRENTLY_SEEKING:</div>
                      <div className="text-green-600 text-sm space-y-2">
                        <div>• FULL_STACK_ENGINEER_POSITIONS</div>
                        <div>• REMOTE | HYBRID | ON_SITE_OPPORTUNITIES</div>
                        <div>• IMMEDIATE_AVAILABILITY</div>
                        <div>• OPEN_TO_RELOCATION</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {section.id === "contact" && (
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-10 md:space-y-12"
                  >
                    <div className="text-green-600 text-sm">
                      RESPONSE_TIME: WITHIN_24_HOURS | TIMEZONE: PST | AVAILABLE_FOR_INTERVIEWS
                    </div>

                    <div className="space-y-8">
                      <div className="grid gap-6">
                        {[
                          {
                            label: "EMAIL.PRIMARY",
                            value: "ufoundashwin@gmail.com",
                            href: "mailto:ufoundashwin@gmail.com",
                            icon: Mail,
                          },
                          {
                            label: "LINKEDIN.PROFILE",
                            value: "ashwinkumar99",
                            href: "https://www.linkedin.com/in/ashwinkumar99/",
                            icon: Linkedin,
                          },
                          {
                            label: "GITHUB.REPOSITORIES",
                            value: `Itaxh1 | ${systemStats.repositories}_REPOS`,
                            href: "https://github.com/Itaxh1",
                            icon: Github,
                          },
                        ].map((contact, idx) => (
                          <motion.a
                            key={contact.label}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ x: 10, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                            className="block border border-green-800 p-6 hover:border-green-400 transition-all duration-300 group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="min-w-0 flex-1">
                                <div className="text-green-300 group-hover:text-green-200 break-words mb-2">
                                  {contact.label}
                                </div>
                                <div className="text-green-600 text-sm break-words">{contact.value}</div>
                              </div>
                              <contact.icon className="w-5 h-5 text-green-500 group-hover:text-green-300 flex-shrink-0 ml-4" />
                            </div>
                          </motion.a>
                        ))}
                      </div>

                      <Link href="/contact">
                        <motion.button
                          whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto px-6 py-3 border border-green-400 text-green-400 hover:text-black transition-all duration-300"
                        >
                          CONTACT_FORM.HTML
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Section Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="fixed bottom-8 left-4 md:left-6 z-30"
            >
              <div className="flex flex-col gap-3">
                {sections.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      const element = document.getElementById(sections[idx].id)
                      element?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`w-2 h-8 md:h-10 transition-all duration-300 ${
                      activeSection === idx ? "bg-green-400" : "bg-green-800 hover:bg-green-600"
                    }`}
                    whileHover={{ scaleX: 1.5 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            {index < sections.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 right-4 md:right-6 text-green-600"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="text-xs">SCROLL</div>
                  <div className="w-px h-8 md:h-10 bg-green-600" />
                </motion.div>
              </motion.div>
            )}
          </motion.section>
        ))}
      </div>

      {/* Terminal Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="border-t border-green-800 p-8 md:p-12 text-center mt-16"
      >
        <div className="text-green-600 text-sm space-y-2">
          <div>© 2025 ASHWIN_KUMAR.DEV | ALL_RIGHTS_RESERVED</div>
          <div>BUILT_WITH: NEXTJS + FRAMER_MOTION + GITHUB_API + PASSION</div>
          <div>LAST_UPDATED: {new Date().toLocaleDateString()} | STATUS: SEEKING_OPPORTUNITIES</div>
        </div>
      </motion.footer>
    </div>
  )
}
