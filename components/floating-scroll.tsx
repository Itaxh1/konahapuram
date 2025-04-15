"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"

export default function FloatingScroll({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  title = "Scroll Title",
  content = "Scroll content goes here...",
  color = "#D2B48C",
}) {
  const scrollRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Animate the scroll
  useFrame((state) => {
    if (scrollRef.current) {
      // Floating animation
      scrollRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1

      // Rotation animation when hovered
      if (hovered) {
        scrollRef.current.rotation.y += 0.01
      } else {
        // Smoothly return to original rotation
        scrollRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      }
    }
  })

  return (
    <group
      ref={scrollRef}
      position={position}
      rotation={rotation}
      onClick={() => setIsOpen(!isOpen)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Scroll cylinder */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>

      {/* Scroll rods */}
      <mesh position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, -1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Scroll title */}
      <Text position={[0, 0, 0.51]} fontSize={0.2} color="#8B4513" anchorX="center" anchorY="middle">
        {title}
      </Text>

      {/* Content panel that appears when clicked */}
      {isOpen && (
        <Html position={[0, 0, 1]} transform distanceFactor={10} className="pointer-events-auto">
          <div className="w-64 max-h-48 overflow-auto bg-amber-50 p-4 rounded-lg border-2 border-amber-800 shadow-lg">
            <h3 className="text-lg font-bold text-amber-900 mb-2">{title}</h3>
            <p className="text-sm text-amber-800">{content}</p>
          </div>
        </Html>
      )}
    </group>
  )
}
