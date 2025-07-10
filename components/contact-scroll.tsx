"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactScrollProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactScroll({ isOpen, onClose }: ContactScrollProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: "Contact from Naruto Portfolio - Village Contact Scroll",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "MESSAGE_TRANSMITTED | RESPONSE_INCOMING_24H",
        })
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "TRANSMISSION_FAILED | RETRY_REQUIRED",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "NETWORK_ERROR | CHECK_CONNECTION",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-black border-2 border-green-400 p-6 md:p-8 max-w-md w-full font-mono text-green-400 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-green-600 hover:text-green-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-green-300 mb-2">CONTACT_SCROLL.SH</h2>
              <div className="text-sm text-green-600">SECURE_TRANSMISSION_ACTIVE</div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scroll-name" className="text-green-400 text-sm">
                  SENDER_NAME*
                </Label>
                <Input
                  id="scroll-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-black border-green-800 text-green-400 focus:border-green-400 text-sm"
                  placeholder="YOUR_NAME"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scroll-email" className="text-green-400 text-sm">
                  EMAIL_ADDRESS*
                </Label>
                <Input
                  id="scroll-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-black border-green-800 text-green-400 focus:border-green-400 text-sm"
                  placeholder="your.email@domain.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scroll-message" className="text-green-400 text-sm">
                  MESSAGE_CONTENT*
                </Label>
                <Textarea
                  id="scroll-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="bg-black border-green-800 text-green-400 focus:border-green-400 resize-none text-sm"
                  placeholder="TYPE_MESSAGE_HERE..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 border text-xs ${
                    submitStatus.type === "success"
                      ? "border-green-400 text-green-300 bg-green-400/10"
                      : "border-red-400 text-red-300 bg-red-400/10"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-transparent border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 disabled:opacity-50 text-sm"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    SENDING...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    TRANSMIT_MESSAGE
                  </div>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-green-800">
              <div className="text-xs text-green-600 text-center">RESPONSE_TIME: {"<24H"} | ENCRYPTION: ENABLED</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
