"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Send, Sun, Moon, Scroll, Mail, User, MessageSquare, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

export default function ContactPage() {
  const { theme, setTheme } = useTheme()
  const isDayMode = theme !== "dark"
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)

  // Handle theme mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would send the form data to your backend here
    console.log("Form submitted:", formState)

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", subject: "", message: "" })
  }

  // Chakra particles animation
  const ChakraParticles = ({ color }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${color} opacity-70`}
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
              y: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
              opacity: [0.7, 0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
            }}
          />
        ))}
      </div>
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`min-h-screen ${
        isDayMode
          ? "bg-gradient-to-br from-amber-50 to-orange-50"
          : "bg-gradient-to-br from-gray-900 to-red-950 akatsuki-bg"
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Chakra particles */}
        <ChakraParticles color={isDayMode ? "bg-orange-500" : "bg-red-600"} />

        {/* Decorative scrolls */}
        <div className="absolute -left-16 top-1/4 h-32 w-64 rotate-45 rounded-full border-8 border-orange-500/20 dark:border-red-900/20" />
        <div className="absolute -right-16 top-2/3 h-32 w-64 -rotate-45 rounded-full border-8 border-orange-500/20 dark:border-red-900/20" />

        {/* Spiral pattern */}
        <svg
          className="absolute left-0 top-0 h-full w-full opacity-5"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M500,500 m0,0 a1,1 0 1,0 2,0 a1,1 0 1,0 -2,0 M500,500 m0,10 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M500,500 m0,30 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0 M500,500 m0,60 a60,60 0 1,0 120,0 a60,60 0 1,0 -120,0 M500,500 m0,100 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0 M500,500 m0,150 a150,150 0 1,0 300,0 a150,150 0 1,0 -300,0 M500,500 m0,210 a210,210 0 1,0 420,0 a210,210 0 1,0 -420,0 M500,500 m0,280 a280,280 0 1,0 560,0 a280,280 0 1,0 -560,0 M500,500 m0,360 a360,360 0 1,0 720,0 a360,360 0 1,0 -720,0"
            fill="none"
            stroke={isDayMode ? "#FF9800" : "#c41e3a"}
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Button
              variant="outline"
              className={`flex items-center gap-2 ${
                isDayMode ? "bg-white/80 hover:bg-white/90" : "bg-black/50 border-red-900 text-white hover:bg-black/60"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Village
            </Button>
          </Link>

          <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 shadow-lg backdrop-blur-sm dark:bg-black/50 dark:border dark:border-red-900">
            <Sun className="h-4 w-4 text-yellow-500" />
            <Switch
              checked={!isDayMode}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              aria-label="Toggle day/night mode"
            />
            <Moon className="h-4 w-4 text-blue-800 dark:text-red-600" />
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden rounded-lg shadow-xl ${
              isDayMode
                ? "bg-white/90 backdrop-blur-sm"
                : "bg-black/60 border border-red-900 text-white backdrop-blur-sm"
            }`}
          >
            {/* Decorative scroll ends */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2">
              <div className={`h-20 w-12 rounded-r-full ${isDayMode ? "bg-orange-500" : "bg-red-700"}`} />
            </div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2">
              <div className={`h-20 w-12 rounded-l-full ${isDayMode ? "bg-orange-500" : "bg-red-700"}`} />
            </div>

            <div className="grid md:grid-cols-5">
              {/* Left side - decorative */}
              <div className="hidden md:block md:col-span-2 relative overflow-hidden">
                <div className={`absolute inset-0 ${isDayMode ? "bg-orange-500" : "bg-red-800"}`}>
                  {/* Decorative pattern */}
                  <svg
                    className="absolute inset-0 h-full w-full opacity-10"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <pattern
                      id="pattern"
                      patternUnits="userSpaceOnUse"
                      width="10"
                      height="10"
                      patternTransform="rotate(45)"
                    >
                      <line x1="0" y="0" x2="0" y2="10" stroke="white" strokeWidth="2" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#pattern)" />
                  </svg>
                </div>

                {/* Ninja symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="relative h-48 w-48"
                  >
                    <svg viewBox="0 0 100 100" className="h-full w-full text-white opacity-80">
                      <path
                        d="M50 15 L85 85 L15 85 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinejoin="round"
                      />
                      <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="5" />
                    </svg>
                  </motion.div>
                </div>

                {/* Contact info */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-6 text-white">
                  <h3 className="font-ninja text-xl mb-4">Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5" />
                      <span>ufoundashwin@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      <span>Ashwin Kumar Uma Sankar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - form */}
              <div className="p-8 md:p-10 md:col-span-3">
                <div className="mb-6 flex items-center justify-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${
                      isDayMode ? "bg-orange-500" : "bg-red-700"
                    }`}
                  >
                    <Scroll className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h1
                  className={`mb-2 text-center font-ninja text-3xl font-bold ${
                    isDayMode ? "text-orange-600" : "text-red-600"
                  }`}
                >
                  Send a Message Scroll
                </h1>

                <p className={`mb-8 text-center ${isDayMode ? "text-gray-600" : "text-gray-300"}`}>
                  Have a question or want to work together? Send me a message scroll!
                </p>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`rounded-lg p-6 text-center ${
                        isDayMode
                          ? "bg-green-50 text-green-800"
                          : "bg-green-900/20 border border-green-700 text-green-300"
                      }`}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100 }}
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
                      >
                        <svg
                          className="h-8 w-8 text-green-600 dark:text-green-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="mb-2 text-xl font-bold">Message Scroll Sent!</h3>
                      <p className="mb-4">Thank you for your message. I'll respond as soon as possible.</p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className={
                          isDayMode
                            ? "bg-orange-600 hover:bg-orange-700"
                            : "bg-red-800 hover:bg-red-900 border border-red-700"
                        }
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className={isDayMode ? "text-gray-700" : "text-gray-200"}>
                            Your Name
                          </Label>
                          <div className="relative">
                            <Input
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              onFocus={() => setActiveField("name")}
                              onBlur={() => setActiveField(null)}
                              placeholder="Naruto Uzumaki"
                              required
                              className={`pl-10 transition-all duration-300 ${
                                isDayMode
                                  ? "bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                  : "bg-gray-800/70 border-gray-700 focus:border-red-600 focus:ring-red-600 text-white"
                              } ${activeField === "name" ? "border-2" : ""}`}
                            />
                            <User
                              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                                isDayMode ? "text-gray-400" : "text-gray-500"
                              } ${activeField === "name" ? (isDayMode ? "text-orange-500" : "text-red-500") : ""}`}
                            />

                            {activeField === "name" && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full ${
                                  isDayMode ? "bg-orange-500" : "bg-red-600"
                                } text-white`}
                              >
                                <span className="text-xs">✓</span>
                              </motion.span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className={isDayMode ? "text-gray-700" : "text-gray-200"}>
                            Your Email
                          </Label>
                          <div className="relative">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formState.email}
                              onChange={handleChange}
                              onFocus={() => setActiveField("email")}
                              onBlur={() => setActiveField(null)}
                              placeholder="naruto@konoha.com"
                              required
                              className={`pl-10 transition-all duration-300 ${
                                isDayMode
                                  ? "bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                  : "bg-gray-800/70 border-gray-700 focus:border-red-600 focus:ring-red-600 text-white"
                              } ${activeField === "email" ? "border-2" : ""}`}
                            />
                            <Mail
                              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                                isDayMode ? "text-gray-400" : "text-gray-500"
                              } ${activeField === "email" ? (isDayMode ? "text-orange-500" : "text-red-500") : ""}`}
                            />

                            {activeField === "email" && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full ${
                                  isDayMode ? "bg-orange-500" : "bg-red-600"
                                } text-white`}
                              >
                                <span className="text-xs">✓</span>
                              </motion.span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className={isDayMode ? "text-gray-700" : "text-gray-200"}>
                          Subject
                        </Label>
                        <div className="relative">
                          <Input
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            onFocus={() => setActiveField("subject")}
                            onBlur={() => setActiveField(null)}
                            placeholder="Project Collaboration"
                            required
                            className={`pl-10 transition-all duration-300 ${
                              isDayMode
                                ? "bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                : "bg-gray-800/70 border-gray-700 focus:border-red-600 focus:ring-red-600 text-white"
                            } ${activeField === "subject" ? "border-2" : ""}`}
                          />
                          <FileText
                            className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                              isDayMode ? "text-gray-400" : "text-gray-500"
                            } ${activeField === "subject" ? (isDayMode ? "text-orange-500" : "text-red-500") : ""}`}
                          />

                          {activeField === "subject" && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full ${
                                isDayMode ? "bg-orange-500" : "bg-red-600"
                              } text-white`}
                            >
                              <span className="text-xs">✓</span>
                            </motion.span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className={isDayMode ? "text-gray-700" : "text-gray-200"}>
                          Your Message
                        </Label>
                        <div className="relative">
                          <Textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            onFocus={() => setActiveField("message")}
                            onBlur={() => setActiveField(null)}
                            placeholder="Write your message here..."
                            required
                            className={`min-h-[150px] pl-10 transition-all duration-300 ${
                              isDayMode
                                ? "bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                : "bg-gray-800/70 border-gray-700 focus:border-red-600 focus:ring-red-600 text-white"
                            } ${activeField === "message" ? "border-2" : ""}`}
                          />
                          <MessageSquare
                            className={`absolute left-3 top-6 h-4 w-4 ${
                              isDayMode ? "text-gray-400" : "text-gray-500"
                            } ${activeField === "message" ? (isDayMode ? "text-orange-500" : "text-red-500") : ""}`}
                          />

                          {activeField === "message" && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full ${
                                isDayMode ? "bg-orange-500" : "bg-red-600"
                              } text-white`}
                            >
                              <span className="text-xs">✓</span>
                            </motion.span>
                          )}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`relative w-full overflow-hidden ${
                          isDayMode
                            ? "bg-orange-600 hover:bg-orange-700"
                            : "bg-red-800 hover:bg-red-900 border border-red-700"
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending Message...
                          </span>
                        ) : (
                          <>
                            <span className="flex items-center gap-2 relative z-10">
                              <Send className="h-4 w-4" />
                              Send Message Scroll
                            </span>
                            <motion.div
                              className={`absolute inset-0 ${isDayMode ? "bg-orange-500" : "bg-red-700"}`}
                              initial={{ x: "-100%" }}
                              whileHover={{ x: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Mobile contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mt-6 rounded-lg p-6 md:hidden ${
              isDayMode
                ? "bg-white/90 backdrop-blur-sm"
                : "bg-black/60 border border-red-900 text-white backdrop-blur-sm"
            }`}
          >
            <h3 className={`font-ninja text-xl mb-4 ${isDayMode ? "text-orange-600" : "text-red-600"}`}>
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    isDayMode ? "bg-orange-100" : "bg-red-900/50"
                  }`}
                >
                  <Mail className={`h-4 w-4 ${isDayMode ? "text-orange-600" : "text-red-400"}`} />
                </div>
                <span>ufoundashwin@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    isDayMode ? "bg-orange-100" : "bg-red-900/50"
                  }`}
                >
                  <User className={`h-4 w-4 ${isDayMode ? "text-orange-600" : "text-red-400"}`} />
                </div>
                <span>Ashwin Kumar Uma Sankar</span>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`h-16 w-4 rounded-full ${isDayMode ? "bg-orange-500" : "bg-red-700"}`}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 5 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`h-24 w-4 rounded-full ${isDayMode ? "bg-orange-500" : "bg-red-700"}`}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className={`h-16 w-4 rounded-full ${isDayMode ? "bg-orange-500" : "bg-red-700"}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
