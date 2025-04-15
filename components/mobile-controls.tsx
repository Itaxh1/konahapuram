"use client"

import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

interface MobileControlsProps {
  onDirectionChange: (directions: { [key: string]: boolean }) => void
}

export function MobileControls({ onDirectionChange }: MobileControlsProps) {
  const isMobile = useMobile()
  const [activeDirections, setActiveDirections] = useState<{ [key: string]: boolean }>({
    w: false,
    s: false,
    a: false,
    d: false,
  })
  const joystickRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const [joystickActive, setJoystickActive] = useState(false)
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 })
  const touchIdRef = useRef<number | null>(null)

  // Handle button press for directional buttons
  const handleDirectionPress = (key: string, isPressed: boolean) => {
    setActiveDirections((prev) => {
      const newDirections = { ...prev, [key]: isPressed }
      onDirectionChange(newDirections)
      return newDirections
    })
  }

  // Handle joystick touch events
  useEffect(() => {
    if (!isMobile || !joystickRef.current || !knobRef.current) return

    const joystick = joystickRef.current
    const knob = knobRef.current
    const joystickRect = joystick.getBoundingClientRect()
    const centerX = joystickRect.width / 2
    const centerY = joystickRect.height / 2
    const maxDistance = joystickRect.width / 3

    const handleTouchStart = (e: TouchEvent) => {
      if (touchIdRef.current !== null) return

      const touch = e.touches[0]
      touchIdRef.current = touch.identifier
      setJoystickActive(true)
      updateJoystickPosition(
        touch.clientX - joystickRect.left,
        touch.clientY - joystickRect.top,
        centerX,
        centerY,
        maxDistance,
      )
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (touchIdRef.current === null) return

      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i]
        if (touch.identifier === touchIdRef.current) {
          updateJoystickPosition(
            touch.clientX - joystickRect.left,
            touch.clientY - joystickRect.top,
            centerX,
            centerY,
            maxDistance,
          )
          break
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchIdRef.current === null) return

      let touchFound = false
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === touchIdRef.current) {
          touchFound = true
          break
        }
      }

      if (!touchFound) {
        resetJoystick()
      }
    }

    const updateJoystickPosition = (x: number, y: number, centerX: number, centerY: number, maxDistance: number) => {
      const dx = x - centerX
      const dy = y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      let newX = dx
      let newY = dy

      if (distance > maxDistance) {
        const angle = Math.atan2(dy, dx)
        newX = Math.cos(angle) * maxDistance
        newY = Math.sin(angle) * maxDistance
      }

      setJoystickPosition({ x: newX, y: newY })

      // Convert joystick position to WASD controls
      const directions = {
        w: newY < -maxDistance * 0.3,
        s: newY > maxDistance * 0.3,
        a: newX < -maxDistance * 0.3,
        d: newX > maxDistance * 0.3,
      }

      setActiveDirections(directions)
      onDirectionChange(directions)
    }

    const resetJoystick = () => {
      setJoystickActive(false)
      setJoystickPosition({ x: 0, y: 0 })
      touchIdRef.current = null
      setActiveDirections({ w: false, s: false, a: false, d: false })
      onDirectionChange({ w: false, s: false, a: false, d: false })
    }

    joystick.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("touchcancel", handleTouchEnd)

    return () => {
      joystick.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("touchcancel", handleTouchEnd)
    }
  }, [isMobile, onDirectionChange])

  if (!isMobile) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between p-4 pointer-events-none">
      {/* Virtual joystick */}
      <div
        ref={joystickRef}
        className="relative w-32 h-32 rounded-full bg-black/20 backdrop-blur-md pointer-events-auto touch-none"
      >
        <div
          ref={knobRef}
          className={`absolute w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border-2 ${joystickActive ? "border-orange-500" : "border-white/50"} transform -translate-x-1/2 -translate-y-1/2 transition-colors`}
          style={{
            left: `calc(50% + ${joystickPosition.x}px)`,
            top: `calc(50% + ${joystickPosition.y}px)`,
          }}
        />
      </div>

      {/* Directional buttons */}
      <div className="grid grid-cols-3 gap-2 pointer-events-auto">
        <div className="col-start-2">
          <button
            className={`w-14 h-14 flex items-center justify-center rounded-full ${activeDirections.w ? "bg-orange-500" : "bg-black/20"} backdrop-blur-md`}
            onTouchStart={() => handleDirectionPress("w", true)}
            onTouchEnd={() => handleDirectionPress("w", false)}
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button
            className={`w-14 h-14 flex items-center justify-center rounded-full ${activeDirections.a ? "bg-orange-500" : "bg-black/20"} backdrop-blur-md`}
            onTouchStart={() => handleDirectionPress("a", true)}
            onTouchEnd={() => handleDirectionPress("a", false)}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="col-start-2 row-start-2">
          <button
            className={`w-14 h-14 flex items-center justify-center rounded-full ${activeDirections.s ? "bg-orange-500" : "bg-black/20"} backdrop-blur-md`}
            onTouchStart={() => handleDirectionPress("s", true)}
            onTouchEnd={() => handleDirectionPress("s", false)}
          >
            <ArrowDown className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="col-start-3 row-start-2">
          <button
            className={`w-14 h-14 flex items-center justify-center rounded-full ${activeDirections.d ? "bg-orange-500" : "bg-black/20"} backdrop-blur-md`}
            onTouchStart={() => handleDirectionPress("d", true)}
            onTouchEnd={() => handleDirectionPress("d", false)}
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
