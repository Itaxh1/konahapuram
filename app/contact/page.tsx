"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Send, Mail, Github, Linkedin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "MESSAGE_SENT_SUCCESSFULLY | RESPONSE_WITHIN_24_HOURS",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "TRANSMISSION_FAILED | PLEASE_RETRY",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "NETWORK_ERROR | CHECK_CONNECTION_AND_RETRY",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 border-b border-green-800"
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link href="/">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-green-400 hover:text-green-300"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK_TO_PORTFOLIO
            </motion.button>
          </Link>
          <div className="text-sm text-green-600">CONTACT_FORM.HTML | STATUS: ACTIVE</div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 py-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.h1
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold"
            >
              CONTACT_INTERFACE.SH
            </motion.h1>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-green-300"
            >
              SECURE_COMMUNICATION_CHANNEL
            </motion.div>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-green-600 text-sm"
            >
              RESPONSE_TIME: WITHIN_24_HOURS | ENCRYPTION: ENABLED | STATUS: MONITORING
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <div className="border border-green-800 p-6">
                <h2 className="text-xl text-green-300 mb-6">SEND_MESSAGE.FORM</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-green-400 text-sm">
                      SENDER_NAME*
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-black border-green-800 text-green-400 focus:border-green-400"
                      placeholder="YOUR_NAME_HERE"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-green-400 text-sm">
                      EMAIL_ADDRESS*
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-black border-green-800 text-green-400 focus:border-green-400"
                      placeholder="your.email@domain.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-green-400 text-sm">
                      MESSAGE_SUBJECT
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-black border-green-800 text-green-400 focus:border-green-400"
                      placeholder="SUBJECT_LINE_HERE"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-green-400 text-sm">
                      MESSAGE_CONTENT*
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-black border-green-800 text-green-400 focus:border-green-400 resize-none"
                      placeholder="TYPE_YOUR_MESSAGE_HERE..."
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 border text-sm ${
                        submitStatus.type === "success"
                          ? "border-green-400 text-green-300 bg-green-400/5"
                          : "border-red-400 text-red-300 bg-red-400/5"
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-transparent border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        TRANSMITTING...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        SEND_MESSAGE.EXE
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-8"
            >
              <div className="border border-green-800 p-6">
                <h2 className="text-xl text-green-300 mb-6">DIRECT_CHANNELS.INFO</h2>

                <div className="space-y-6">
                  {[
                    {
                      label: "PRIMARY_EMAIL",
                      value: "ufoundashwin@gmail.com",
                      href: "mailto:ufoundashwin@gmail.com",
                      icon: Mail,
                    },
                    {
                      label: "LINKEDIN_PROFILE",
                      value: "ashwinkumar99",
                      href: "https://www.linkedin.com/in/ashwinkumar99/",
                      icon: Linkedin,
                    },
                    {
                      label: "GITHUB_REPOSITORIES",
                      value: "Itaxh1",
                      href: "https://github.com/Itaxh1",
                      icon: Github,
                    },
                  ].map((contact, idx) => (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      whileHover={{ x: 5, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                      className="flex items-center gap-4 p-4 border border-green-800 hover:border-green-400 transition-all duration-300 group"
                    >
                      <contact.icon className="w-5 h-5 text-green-500 group-hover:text-green-300" />
                      <div>
                        <div className="text-green-300 group-hover:text-green-200 text-sm">{contact.label}</div>
                        <div className="text-green-600 text-xs">{contact.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="border border-green-800 p-6">
                <h2 className="text-xl text-green-300 mb-4">SYSTEM_STATUS.LOG</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-600">FORM_HANDLER: ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-600">EMAIL_SERVICE: OPERATIONAL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <span className="text-green-600">JOB_SEARCH: ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-600">RESPONSE_TIME: {"<24H"}</span>
                  </div>
                </div>
              </div>

              <div className="border border-yellow-400 p-6 bg-yellow-400/5">
                <h2 className="text-yellow-400 text-lg mb-4">🎯 CURRENTLY_SEEKING</h2>
                <div className="text-green-600 text-sm space-y-1">
                  <div>• FULL_STACK_ENGINEER_POSITIONS</div>
                  <div>• REMOTE | HYBRID | ON_SITE</div>
                  <div>• IMMEDIATE_AVAILABILITY</div>
                  <div>• OPEN_TO_RELOCATION</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
