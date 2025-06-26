"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  Code,
  Server,
  Cloud,
  Mail,
  MapPin,
  ExternalLink,
  Zap,
  ArrowRight,
  Eye,
  Layers,
  Cpu,
  Globe,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

export default function ProfilePage() {
  const [isDayMode, setIsDayMode] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isMobile = useMobile()
  const { scrollYProgress } = useScroll()

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-light tracking-wide"
            >
              <span className={`${isDayMode ? "text-gray-900" : "text-white"}`}>AK</span>
            </motion.div>

            {!isMobile && (
              <div className="hidden lg:flex items-center space-x-12">
                {[
                  { id: "hero", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "experience", label: "Work" },
                  { id: "projects", label: "Projects" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative text-sm font-light tracking-wide transition-all duration-300 ${
                      activeSection === item.id
                        ? isDayMode
                          ? "text-purple-600"
                          : "text-purple-400"
                        : isDayMode
                          ? "text-gray-600 hover:text-gray-900"
                          : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-600 to-blue-600"
                        layoutId="activeSection"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

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

              <a
                href="https://github.com/Itaxh1/konahapuram/blob/main/public/SDE_Ashwin.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-full px-6"
                >
                  Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimalist */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-12"
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-full px-6 py-3 border border-purple-100/50 dark:border-purple-800/30"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className={`text-sm font-light ${isDayMode ? "text-purple-700" : "text-purple-300"}`}>
                    Available for opportunities
                  </span>
                </motion.div>

                <div className="space-y-6">
                  <h1
                    className={`text-6xl lg:text-8xl font-extralight leading-tight tracking-tight ${isDayMode ? "text-gray-900" : "text-white"}`}
                  >
                    <span className="block">Crafting</span>
                    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent font-light">
                      Digital
                    </span>
                    <span className="block">Excellence</span>
                  </h1>

                  <p
                    className={`text-xl lg:text-2xl font-light leading-relaxed max-w-2xl ${isDayMode ? "text-gray-600" : "text-gray-300"}`}
                  >
                    Software Engineer specializing in{" "}
                    <span className="font-medium text-purple-600">scalable solutions</span> and{" "}
                    <span className="font-medium text-blue-600">modern architectures</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-6">
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                      Let's Connect
                    </Button>
                  </Link>
                  <Link href="/village">
                    <Button
                      variant="outline"
                      size="lg"
                      className={`px-8 py-4 text-lg border-2 rounded-full ${
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

                <div className="flex items-center space-x-8 pt-6">
                  <a
                    href="https://github.com/Itaxh1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 ${isDayMode ? "text-gray-500 hover:text-purple-600" : "text-gray-400 hover:text-purple-400"} transition-colors`}
                  >
                    <Github className="h-5 w-5" />
                    <span className="font-light">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashwinkumar99/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 ${isDayMode ? "text-gray-500 hover:text-purple-600" : "text-gray-400 hover:text-purple-400"} transition-colors`}
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="font-light">LinkedIn</span>
                  </a>
                  <div className={`flex items-center space-x-2 ${isDayMode ? "text-gray-500" : "text-gray-400"}`}>
                    <MapPin className="h-4 w-4" />
                    <span className="font-light">Oregon, US</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sophisticated Hero Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full h-[600px]">
                <motion.div
                  className={`absolute inset-0 rounded-3xl p-10 backdrop-blur-sm ${
                    isDayMode
                      ? "bg-white/80 shadow-2xl border border-gray-100/50"
                      : "bg-gray-900/80 shadow-2xl border border-gray-700/50"
                  }`}
                  style={{ y: y1 }}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className={`text-2xl font-light ${isDayMode ? "text-gray-900" : "text-white"}`}>
                            Full Stack Engineer
                          </h3>
                          <p className={`text-sm font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>
                            3+ Years Experience
                          </p>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                          <Code className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        {[
                          { icon: <Globe className="h-6 w-6" />, label: "Frontend", count: "8+" },
                          { icon: <Server className="h-6 w-6" />, label: "Backend", count: "6+" },
                          { icon: <Cloud className="h-6 w-6" />, label: "Cloud", count: "4+" },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                            className={`p-6 rounded-2xl text-center ${isDayMode ? "bg-gray-50/50" : "bg-gray-800/50"} backdrop-blur-sm`}
                          >
                            <div
                              className={`${isDayMode ? "text-purple-600" : "text-purple-400"} mb-3 flex justify-center`}
                            >
                              {item.icon}
                            </div>
                            <div className={`text-2xl font-light ${isDayMode ? "text-gray-900" : "text-white"}`}>
                              {item.count}
                            </div>
                            <div className={`text-xs font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>
                              {item.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>
                          Current Focus
                        </span>
                        <span className={`text-sm font-medium ${isDayMode ? "text-purple-600" : "text-purple-400"}`}>
                          MEng Computer Science
                        </span>
                      </div>
                      <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-1">
                        <motion.div
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-1 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "72%" }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs font-light">
                        <span className={isDayMode ? "text-gray-500" : "text-gray-500"}>GPA: 3.6/4.0</span>
                        <span className={isDayMode ? "text-gray-500" : "text-gray-500"}>Expected: 2025</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className={`w-6 h-6 ${isDayMode ? "text-gray-400" : "text-gray-500"}`} />
        </motion.div>
      </section>

      {/* About Section - Refined */}
      <section id="about" className="py-32 px-8 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className={`text-5xl lg:text-6xl font-extralight mb-8 ${isDayMode ? "text-gray-900" : "text-white"}`}>
              Precision in
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block font-light">
                Every Detail
              </span>
            </h2>
            <p
              className={`text-xl font-light max-w-3xl mx-auto leading-relaxed ${isDayMode ? "text-gray-600" : "text-gray-300"}`}
            >
              Master's student at <span className="font-medium text-purple-600">Oregon State University</span> with
              expertise in scalable architectures and modern development practices.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: <Code className="h-8 w-8" />, title: "Clean Architecture", desc: "Maintainable & scalable" },
                  { icon: <Zap className="h-8 w-8" />, title: "Performance", desc: "Optimized solutions" },
                  { icon: <Layers className="h-8 w-8" />, title: "System Design", desc: "Robust foundations" },
                  { icon: <Cpu className="h-8 w-8" />, title: "Innovation", desc: "Cutting-edge tech" },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-8 rounded-3xl backdrop-blur-sm ${
                      isDayMode
                        ? "bg-white/60 border border-gray-100/50 shadow-lg"
                        : "bg-gray-900/60 border border-gray-700/50"
                    }`}
                  >
                    <div className={`${isDayMode ? "text-purple-600" : "text-purple-400"} mb-4`}>{item.icon}</div>
                    <h3 className={`font-medium mb-2 ${isDayMode ? "text-gray-900" : "text-white"}`}>{item.title}</h3>
                    <p className={`text-sm font-light ${isDayMode ? "text-gray-600" : "text-gray-400"}`}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className={`p-10 rounded-3xl backdrop-blur-sm ${
                  isDayMode
                    ? "bg-gradient-to-br from-purple-50/80 to-blue-50/80 border border-purple-100/50"
                    : "bg-gradient-to-br from-purple-950/20 to-blue-950/20 border border-purple-800/30"
                }`}
              >
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className={`text-2xl font-light ${isDayMode ? "text-gray-900" : "text-white"}`}>
                      Ashwin Kumar
                    </h3>
                    <p className={`font-light ${isDayMode ? "text-purple-600" : "text-purple-400"}`}>
                      Software Engineer
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { label: "Experience", value: "2+ Years", progress: 70 },
                      { label: "Projects", value: "15+ Completed", progress: 85 },
                      { label: "Technologies", value: "20+ Mastered", progress: 90 },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-light ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
                            {stat.label}
                          </span>
                          <span className={`text-sm font-medium ${isDayMode ? "text-purple-600" : "text-purple-400"}`}>
                            {stat.value}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-1">
                          <motion.div
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-1 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stat.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section - Streamlined */}
      <section id="experience" className={`py-32 px-8 ${isDayMode ? "bg-gray-50/50" : "bg-gray-900/30"}`}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className={`text-5xl lg:text-6xl font-extralight ${isDayMode ? "text-gray-900" : "text-white"}`}>
              Professional
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block font-light">
                Journey
              </span>
            </h2>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                title: "Web Developer",
                company: "Oregon State University",
                period: "2024 - 2025",
                type: "Full-time",
                focus: ["Angular 14", "Drupal 10", "SEO Optimization", "Accessibility"],
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Associate Software Developer",
                company: "AgroSperity KIVI",
                period: "2022 - 2023",
                type: "Full-time",
                focus: ["CI/CD Pipelines", "Apache Kafka", "Google Earth Engine", "Analytics"],
                gradient: "from-green-500 to-emerald-500",
              },
              {
                title: "Data Analyst Consultant",
                company: "GenWorks Healthcare",
                period: "2022",
                type: "Internship",
                focus: ["Healthcare Analytics", "Python", "SQL", "Dashboards"],
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div
                  className={`p-10 rounded-3xl backdrop-blur-sm ${
                    isDayMode
                      ? "bg-white/80 border border-gray-100/50 shadow-lg"
                      : "bg-gray-900/80 border border-gray-700/50"
                  }`}
                >
                  <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1 space-y-4">
                      <div
                        className={`inline-flex items-center space-x-2 bg-gradient-to-r ${job.gradient} rounded-full px-4 py-2`}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <span className="text-sm font-light text-white">{job.period}</span>
                      </div>

                      <div>
                        <h3 className={`text-2xl font-light mb-2 ${isDayMode ? "text-gray-900" : "text-white"}`}>
                          {job.title}
                        </h3>
                        <p
                          className={`text-lg font-light bg-gradient-to-r ${job.gradient} bg-clip-text text-transparent`}
                        >
                          {job.company}
                        </p>
                        <Badge
                          variant="outline"
                          className={`mt-2 ${isDayMode ? "border-gray-300 text-gray-700" : "border-gray-600 text-gray-300"}`}
                        >
                          {job.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <h4 className={`font-medium mb-6 ${isDayMode ? "text-gray-900" : "text-white"}`}>
                        Key Focus Areas
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {job.focus.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-4 rounded-2xl ${isDayMode ? "bg-gray-50/50" : "bg-gray-800/50"} backdrop-blur-sm`}
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${job.gradient} mb-2`} />
                            <span className={`font-light ${isDayMode ? "text-gray-700" : "text-gray-300"}`}>
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Curated */}
      <section id="projects" className="py-32 px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className={`text-5xl lg:text-6xl font-extralight ${isDayMode ? "text-gray-900" : "text-white"}`}>
              Selected
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block font-light">
                Works
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "Emergency Exit System",
                description: "Real-time emergency management with automated response protocols",
                tech: ["Python", "Flask", "GCP", "WebSockets"],
                link: "https://emergency-exit-system-654928681850.us-central1.run.app",
                github: "https://github.com/Itaxh1/emergency-exit-system",
                gradient: "from-red-500 to-pink-500",
                icon: "🚨",
              },
              {
                title: "DeepSeeker AI",
                description: "RAG-based intelligent content retrieval system",
                tech: ["Python", "RAG", "AI/ML", "Vector DB"],
                link: null,
                github: "https://github.com/Itaxh1/deepseeker",
                gradient: "from-purple-500 to-indigo-500",
                icon: "🤖",
              },
              {
                title: "SCARR Framework",
                description: "Python optimization framework with multicore profiling",
                tech: ["Python", "Multiprocessing", "Performance"],
                link: null,
                github: "https://github.com/Itaxh1/scarr-framework",
                gradient: "from-green-500 to-emerald-500",
                icon: "⚡",
              },
              {
                title: "3D Portfolio",
                description: "Interactive Three.js experience with immersive design",
                tech: ["Next.js", "Three.js", "TypeScript"],
                link: "/village",
                github: "https://github.com/Itaxh1/naruto-portfolio",
                gradient: "from-orange-500 to-yellow-500",
                icon: "🎮",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`group p-8 rounded-3xl backdrop-blur-sm ${
                  isDayMode
                    ? "bg-white/80 border border-gray-100/50 shadow-lg hover:shadow-xl"
                    : "bg-gray-900/80 border border-gray-700/50 hover:border-gray-600/50"
                } transition-all duration-500`}
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl`}
                      >
                        {project.icon}
                      </div>
                      <div>
                        <h3 className={`text-xl font-light ${isDayMode ? "text-gray-900" : "text-white"}`}>
                          {project.title}
                        </h3>
                        {project.link && (
                          <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0 mt-1`}>
                            Live
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className={`font-light leading-relaxed ${isDayMode ? "text-gray-600" : "text-gray-300"}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className={`font-light ${
                          isDayMode
                            ? "bg-gray-100/50 text-gray-700 hover:bg-gray-200/50"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                        }`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-4 pt-4">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button
                          className={`bg-gradient-to-r ${project.gradient} hover:opacity-90 text-white border-0 rounded-full`}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live
                        </Button>
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="rounded-full">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-10 py-4 rounded-full"
              >
                View All Projects
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Elegant */}
      <section id="contact" className={`py-32 px-8 ${isDayMode ? "bg-gray-50/50" : "bg-gray-900/30"}`}>
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
    </div>
  )
}
