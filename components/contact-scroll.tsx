"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Scroll } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactScrollProps {
  isOpen: boolean
  onClose: () => void
  isDayMode?: boolean
}

export default function ContactScroll({ isOpen, onClose, isDayMode = true }: ContactScrollProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

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
    setFormState({ name: "", email: "", message: "" })
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormState({ name: "", email: "", message: "" })
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative mx-4 max-h-[90vh] w-full max-w-md overflow-auto rounded-lg p-6 shadow-xl ${
              isDayMode ? "bg-white" : "bg-gray-900 border border-red-900 text-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="mb-4 flex justify-center">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${
                  isDayMode ? "bg-orange-500" : "bg-red-700"
                }`}
              >
                <Scroll className="h-6 w-6 text-white" />
              </div>
            </div>

            <h2 className={`mb-2 text-center text-xl font-bold ${isDayMode ? "text-orange-600" : "text-red-600"}`}>
              Send a Message Scroll
            </h2>

            <p className={`mb-6 text-center text-sm ${isDayMode ? "text-gray-600" : "text-gray-300"}`}>
              Have a question or want to work together?
            </p>

            {isSubmitted ? (
              <div
                className={`rounded-lg p-4 text-center ${
                  isDayMode ? "bg-green-50 text-green-800" : "bg-green-900/20 border border-green-700 text-green-300"
                }`}
              >
                <h3 className="mb-2 font-bold">Message Scroll Sent!</h3>
                <p className="mb-4 text-sm">Thank you for your message. I'll respond as soon as possible.</p>
                <Button
                  onClick={resetForm}
                  className={
                    isDayMode
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-red-800 hover:bg-red-900 border border-red-700"
                  }
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={isDayMode ? "text-gray-700" : "text-gray-200"}>
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Naruto Uzumaki"
                    required
                    className={isDayMode ? "bg-white" : "bg-gray-800 border-gray-700 text-white"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={isDayMode ? "text-gray-700" : "text-gray-200"}>
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="naruto@konoha.com"
                    required
                    className={isDayMode ? "bg-white" : "bg-gray-800 border-gray-700 text-white"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className={isDayMode ? "text-gray-700" : "text-gray-200"}>
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    className={`min-h-[120px] ${isDayMode ? "bg-white" : "bg-gray-800 border-gray-700 text-white"}`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
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
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}

            {/* Decorative scroll ends */}
            <div className="mt-6 flex justify-center">
              <div className="relative h-4 w-32">
                <div className={`absolute left-0 h-4 w-4 rounded-full ${isDayMode ? "bg-orange-500" : "bg-red-700"}`} />
                <div
                  className={`absolute right-0 h-4 w-4 rounded-full ${isDayMode ? "bg-orange-500" : "bg-red-700"}`}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
