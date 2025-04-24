"use client"

import { useState } from "react"
import { Scroll } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContactScroll from "@/components/contact-scroll"

interface ContactButtonProps {
  isDayMode?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function ContactButton({
  isDayMode = true,
  variant = "default",
  size = "default",
  className = "",
}: ContactButtonProps) {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setIsContactOpen(true)} className={className}>
        <Scroll className="mr-2 h-4 w-4" />
        Contact Me
      </Button>

      <ContactScroll isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} isDayMode={isDayMode} />
    </>
  )
}
