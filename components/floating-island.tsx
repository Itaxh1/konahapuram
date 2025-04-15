"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"

// Minecraft-style block
function Block({ position, size = 1, color = "#8B4513" }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Create a floating island with Minecraft-style blocks
export default function FloatingIsland({
  position = [0, 0, 0],
  size = 10,
  height = 3,
  name,
  color = "#8B5A2B",
  onClick,
  locationId,
}) {
  const groupRef = useRef()
  const particlesRef = useRef()

  // Animate the island and particles
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }

    if (particlesRef.current) {
      // Rotate particles
      particlesRef.current.rotation.y += 0.005
    }
  })

  // Generate blocks for the island
  const blocks = []

  // Create a simple platform with some depth
  for (let x = -size / 2; x < size / 2; x += 1) {
    for (let z = -size / 2; z < size / 2; z += 1) {
      const distance = Math.sqrt(x * x + z * z)
      const heightScale = Math.max(0, 1 - (distance / (size / 2)) * 0.8)

      if (distance < size / 2) {
        // Top layer with grass
        blocks.push(
          <Block key={`top-${x}-${z}`} position={[x, 0, z]} color={color === "#8B5A2B" ? "#7CFC00" : color} />,
        )

        // Add some depth blocks
        if (Math.random() > 0.5) {
          blocks.push(<Block key={`depth-${x}-${z}`} position={[x, -1, z]} color="#8B5A2B" />)
        }

        // Add some stalactites for visual interest
        if (Math.random() > 0.8 && distance > size / 3) {
          const stalactiteHeight = Math.floor(Math.random() * 3) + 1
          for (let y = 1; y <= stalactiteHeight; y++) {
            blocks.push(<Block key={`stalactite-${x}-${z}-${y}`} position={[x, -y, z]} color="#A9A9A9" />)
          }
        }
      }
    }
  }

  // Create chakra particles
  const particles = []
  const particleCount = 10
  const particleColors = ["#4FC3F7", "#FF5252", "#66BB6A"] // Blue, red, green chakra

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = size / 2 + Math.random() * 2
    const height = Math.random() * 5 + 2
    const particleSize = Math.random() * 0.3 + 0.1
    const colorIndex = Math.floor(Math.random() * particleColors.length)

    particles.push(
      <mesh key={`particle-${i}`} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
        <sphereGeometry args={[particleSize, 8, 8]} />
        <meshStandardMaterial
          color={particleColors[colorIndex]}
          emissive={particleColors[colorIndex]}
          emissiveIntensity={2}
        />
      </mesh>,
    )
  }

  // Create clouds beneath the island
  const clouds = []
  const cloudCount = 4

  for (let i = 0; i < cloudCount; i++) {
    const angle = (i / cloudCount) * Math.PI * 2
    const radius = size / 3 + Math.random() * (size / 2)
    const cloudY = -2 - Math.random() * 3

    clouds.push(
      <group key={`cloud-${i}`} position={[Math.cos(angle) * radius, cloudY, Math.sin(angle) * radius]}>
        <mesh>
          <sphereGeometry args={[1 + Math.random(), 8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.8} />
        </mesh>
        <mesh position={[1, 0, 0]}>
          <sphereGeometry args={[0.8 + Math.random() * 0.5, 8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.8} />
        </mesh>
      </group>,
    )
  }

  // Add some structures to the island
  const structures = []

  // Central structure
  structures.push(
    <group key="central-structure" position={[0, 1, 0]}>
      <mesh castShadow>
        <boxGeometry args={[2, 4, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[1.5, 2, 4]} />
        <meshStandardMaterial color="#A52A2A" />
      </mesh>
    </group>,
  )

  return (
    <group ref={groupRef} position={position} onClick={() => onClick && onClick(locationId)}>
      {/* Island blocks */}
      <group>{blocks}</group>

      {/* Structures */}
      <group>{structures}</group>

      {/* Chakra particles */}
      <group ref={particlesRef}>{particles}</group>

      {/* Clouds */}
      <group>{clouds}</group>

      {/* Island name */}
      {name && (
        <Text
          position={[0, 6, 0]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {name}
        </Text>
      )}
    </group>
  )
}
