"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sky, Text } from "@react-three/drei"

// Simple Chakravyuha pattern
function ChakravyuhaPattern({ radius = 30, turns = 5 }) {
  const groupRef = useRef()

  // Generate points along a spiral
  const pathPoints = []
  const pointsPerTurn = 20
  const totalPoints = turns * pointsPerTurn

  for (let i = 0; i < totalPoints; i++) {
    const angle = (i / pointsPerTurn) * Math.PI * 2
    const r = (radius * (totalPoints - i)) / totalPoints
    pathPoints.push({
      x: Math.cos(angle) * r,
      z: Math.sin(angle) * r,
    })
  }

  // Add entrance path
  const entrancePoints = Math.floor(pointsPerTurn * 0.2)
  for (let i = 0; i < entrancePoints; i++) {
    const ratio = i / entrancePoints
    const z = radius + radius * 0.4 * ratio
    pathPoints.push({ x: 0, z: z })
  }

  // Animate the pattern
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.1, 0]}>
        <planeGeometry args={[radius * 3, radius * 3]} />
        <meshStandardMaterial color="#7CFC00" />
      </mesh>

      {/* Path */}
      {pathPoints.map((point, i) => (
        <mesh key={`point-${i}`} position={[point.x, 0, point.z]}>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color="#D2B48C" />
        </mesh>
      ))}

      {/* Center building */}
      <mesh position={[0, 5, 0]} castShadow>
        <cylinderGeometry args={[3, 5, 10, 16]} />
        <meshStandardMaterial color="#FF4500" />
      </mesh>

      {/* Village name */}
      <Text
        position={[0, 15, 0]}
        fontSize={5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        Chakravyuha Village
      </Text>
    </group>
  )
}

// Simple scene for low-performance devices
export default function SimpleChakravyuha({ isDayMode }) {
  return (
    <Canvas shadows camera={{ position: [0, 30, 60], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 5]} intensity={1} castShadow />

      {isDayMode && <Sky sunPosition={[100, 10, 100]} />}

      <ChakravyuhaPattern />
    </Canvas>
  )
}
