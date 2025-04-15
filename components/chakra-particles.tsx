"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function ChakraParticles({ count = 50, colors = ["#4FC3F7", "#FF5252", "#66BB6A"] }) {
  const particlesRef = useRef()
  const particlePositions = useRef([])
  const particleSpeeds = useRef([])

  // Initialize particle positions and speeds
  if (particlePositions.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particlePositions.current.push([
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50 + 25,
        (Math.random() - 0.5) * 100,
      ])

      particleSpeeds.current.push([
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.05,
      ])
    }
  }

  // Animate particles
  useFrame(() => {
    if (particlesRef.current) {
      const particles = particlesRef.current.children

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        const pos = particlePositions.current[i]
        const speed = particleSpeeds.current[i]

        // Update position
        pos[0] += speed[0]
        pos[1] += speed[1]
        pos[2] += speed[2]

        // Boundary check and wrap around
        if (pos[0] < -50) pos[0] = 50
        if (pos[0] > 50) pos[0] = -50
        if (pos[1] < 0) pos[1] = 50
        if (pos[1] > 50) pos[1] = 0
        if (pos[2] < -50) pos[2] = 50
        if (pos[2] > 50) pos[2] = -50

        // Apply position
        particle.position.set(pos[0], pos[1], pos[2])
      }
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: count }).map((_, i) => {
        const colorIndex = Math.floor(Math.random() * colors.length)
        const size = Math.random() * 0.3 + 0.1
        const position = particlePositions.current[i]

        return (
          <mesh key={i} position={position}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshStandardMaterial
              color={colors[colorIndex]}
              emissive={colors[colorIndex]}
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}
