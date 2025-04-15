"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

// Scale factor to make everything smaller
const scaleFactor = 0.8

// Tree component - simplified
function MinecraftTree({ position, height = 5, leafSize = 3 }) {
  // Scale position
  const scaledPosition = [position[0] * scaleFactor, position[1], position[2] * scaleFactor]
  const scaledHeight = height * scaleFactor
  const scaledLeafSize = leafSize * scaleFactor

  return (
    <group position={scaledPosition}>
      {/* Trunk - simplified */}
      <mesh position={[0, scaledHeight / 2, 0]} castShadow>
        <boxGeometry args={[1 * scaleFactor, scaledHeight, 1 * scaleFactor]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Leaves - simplified to a single mesh */}
      <mesh position={[0, scaledHeight + scaledLeafSize / 2, 0]} castShadow>
        <boxGeometry args={[scaledLeafSize, scaledLeafSize, scaledLeafSize]} />
        <meshStandardMaterial color="darkgreen" />
      </mesh>
    </group>
  )
}

// Floating scroll with information - simplified
function FloatingScroll({ position, title, content }) {
  const scrollRef = useRef()

  // Scale position
  const scaledPosition = [position[0] * scaleFactor, position[1] * scaleFactor, position[2] * scaleFactor]

  // Animate the scroll - reduced animation complexity
  useFrame((state) => {
    if (scrollRef.current) {
      scrollRef.current.position.y = scaledPosition[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3 * scaleFactor
      scrollRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={scrollRef} position={scaledPosition}>
      <mesh castShadow>
        <cylinderGeometry args={[0.5 * scaleFactor, 0.5 * scaleFactor, 2 * scaleFactor, 8]} /> {/* Reduced segments */}
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      <mesh position={[0, 1.1 * scaleFactor, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1 * scaleFactor, 0.1 * scaleFactor, 0.6 * scaleFactor, 6]} />{" "}
        {/* Reduced segments */}
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, -1.1 * scaleFactor, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1 * scaleFactor, 0.1 * scaleFactor, 0.6 * scaleFactor, 6]} />{" "}
        {/* Reduced segments */}
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}

// Chakra particles for visual effect - significantly reduced count
function ChakraParticles({ count = 10, colors = ["#4FC3F7", "#FF5252", "#66BB6A"] }) {
  // Reduced count
  const particlesRef = useRef()
  const particlePositions = useRef([])
  const particleSpeeds = useRef([])

  // Initialize particle positions and speeds
  if (particlePositions.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particlePositions.current.push([
        (Math.random() - 0.5) * 100 * scaleFactor,
        (Math.random() - 0.5) * 30 * scaleFactor + 20 * scaleFactor,
        (Math.random() - 0.5) * 100 * scaleFactor,
      ])

      particleSpeeds.current.push([
        (Math.random() - 0.5) * 0.05 * scaleFactor,
        (Math.random() - 0.5) * 0.03 * scaleFactor,
        (Math.random() - 0.5) * 0.05 * scaleFactor,
      ])
    }
  }

  // Animate particles - reduced update frequency
  useFrame((state) => {
    if (particlesRef.current && state.clock.elapsedTime % 0.1 < 0.01) {
      // Only update every ~10 frames
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
        if (pos[0] < -50 * scaleFactor) pos[0] = 50 * scaleFactor
        if (pos[0] > 50 * scaleFactor) pos[0] = -50 * scaleFactor
        if (pos[1] < 0) pos[1] = 50 * scaleFactor
        if (pos[1] > 50 * scaleFactor) pos[1] = 0
        if (pos[2] < -50 * scaleFactor) pos[2] = 50 * scaleFactor
        if (pos[2] > 50 * scaleFactor) pos[2] = -50 * scaleFactor

        // Apply position
        particle.position.set(pos[0], pos[1], pos[2])
      }
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: count }).map((_, i) => {
        const colorIndex = Math.floor(Math.random() * colors.length)
        const size = (Math.random() * 0.3 + 0.1) * scaleFactor
        const position = particlePositions.current[i]

        return (
          <mesh key={i} position={position}>
            <sphereGeometry args={[size, 6, 6]} /> {/* Reduced segments */}
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

// Dummy components to resolve undeclared variable errors
function ModernTree({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 5, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}

function DecorativeElement({ position, type, isDayMode }) {
  const color = isDayMode ? "yellow" : "blue"
  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function LampPost({ position, isDayMode }) {
  const color = isDayMode ? "gray" : "white"
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.2, 0.2, 3, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Main decorations component - significantly reduced
function VillageDecorations({ isDayMode }) {
  // Position trees in a more organized, aesthetic way - reduced count
  const treePositions = [
    // Entrance area trees
    [-5, -35],
    [5, -35],
    // Trees along the paths
    [-25, -25],
    [25, -25],
    [-25, 25],
    [25, 25],
    // Border trees
    [-60, -60],
    [60, 60],
  ]

  // Position decorative elements - reduced count
  const decorPositions = [
    // Center area decorations
    [-10, 10],
    [10, -10],
    // Path decorations
    [-20, -20],
    [20, 20],
  ]

  return (
    <group>
      {/* Trees - using smoother geometry */}
      {treePositions.map((pos, i) => (
        <ModernTree key={`tree-${i}`} position={[pos[0], 0, pos[1]]} />
      ))}

      {/* Decorative elements - using smoother geometry */}
      {decorPositions.map((pos, i) => (
        <DecorativeElement key={`decor-${i}`} position={[pos[0], 0, pos[1]]} type={i % 3} isDayMode={isDayMode} />
      ))}

      {/* Lamp posts - reduced count */}
      {[
        [-25, -25],
        [25, 25],
        [0, -35],
        [0, 35],
      ].map((pos, i) => (
        <LampPost key={`lamp-${i}`} position={[pos[0], 0, pos[1]]} isDayMode={isDayMode} />
      ))}
    </group>
  )
}
