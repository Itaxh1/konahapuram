"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink, FileText } from "lucide-react"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "America/Los_Angeles",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    setTimeout(() => setIsLoaded(true), 500)
    return () => clearInterval(interval)
  }, [])

  const links = [
    {
      label: "EMAIL",
      value: "ufoundashwin@gmail.com",
      href: "mailto:ufoundashwin@gmail.com",
      icon: Mail,
    },
    {
      label: "LINKEDIN",
      value: "ashwinkumar99",
      href: "https://www.linkedin.com/in/ashwinkumar99/",
      icon: Linkedin,
    },
    {
      label: "GITHUB",
      value: "Itaxh1",
      href: "https://github.com/Itaxh1",
      icon: Github,
    },
    {
      label: "PORTFOLIO",
      value: "ashxinkumar.me",
      href: "https://www.ashxinkumar.me",
      icon: ExternalLink,
    },
    {
      label: "CLAW_LLM",
      value: "Game Generation LLM",
      href: "http://claw.codes/",
      icon: ExternalLink,
    },
    {
      label: "3D_RESUME",
      value: "Interactive Resume Game",
      href: "/village",
      icon: ExternalLink,
    },
    {
      label: "RESUME",
      value: "View/Download Resume",
      href: "#",
      icon: FileText,
      onClick: () => setIsResumeOpen(true),
    },
  ]

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 text-green-400 font-mono min-h-screen">
      {/* Loading Animation */}
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
                transition={{ duration: 1, repeat: Infinity }}
                className="text-green-400 text-xl mb-4"
              >
                INITIALIZING...
              </motion.div>
              <div className="text-green-600 text-sm">LOADING_PORTFOLIO...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Viewer Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black border border-green-600 w-full max-w-3xl h-[70vh] flex flex-col rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-center p-4 border-b border-green-600">
                <span className="text-green-300 text-sm">ASHWIN_KUMAR_RESUME.PDF</span>
                <div className="flex gap-4">
                  <a
                    href="/ash-resume-2025.pdf"
                    download="Ashwin_Kumar_Resume.pdf"
                    className="text-green-400 hover:text-green-200 flex items-center gap-1 text-sm"
                  >
                    DOWNLOAD <FileText className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="text-green-400 hover:text-green-200 text-sm"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
              <iframe
                src="ash-resume-2025.pdf"
                className="w-full h-full border-none rounded-b-lg"
                title="Resume Viewer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed top-0 left-0 right-0 z-40 p-4"
      >
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="text-sm flex items-center gap-2">
            <span className="text-green-600">~/</span>
            <span className="text-green-400">ASHWIN_KUMAR</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          </div>
          <div className="text-sm text-green-600">PDT_{currentTime}</div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.section
        className="min-h-screen flex items-center justify-center px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-green-300">ASHWIN KUMAR</h1>
            <div className="text-base md:text-lg text-green-500">Arizona, US | Actively Seeking Opportunities</div>
          </motion.div>

          {/* About Me */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-green-600 max-w-2xl mx-auto"
          >
            I'm a recent Master's graduate in Computer Science from Oregon State University (March 2025, GPA 3.6/4.0) with over two years of professional experience in full-stack development. Skilled in Python, TypeScript, React, Node.js, and cloud technologies like GCP and Docker, I specialize in building scalable, impactful solutions. Currently seeking full-stack engineering roles to create innovative software.
          </motion.div>

          {/* Links as Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {links.map((link, idx) => (
              <motion.div
                key={link.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : "_self"}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={link.onClick || (() => {})}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#16a34a", textColor: "#000" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-400 hover:text-black transition-all rounded-md text-sm"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-t border-green-800 p-6 text-center"
      >
        <div className="text-green-600 text-sm">
          © 2025 ASHWIN_KUMAR.DEV | BUILT WITH NEXT.JS + FRAMER MOTION
        </div>
      </motion.footer>
    </div>
  )
}
