"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { Html } from "@react-three/drei"

// Message Scroll Hall building for the village
export default function ContactBuilding({ position = [0, 0, 0], onClick, isDayMode = true }) {
  const groupRef = useRef()
  const glowRef = useRef()

  // Simple animation
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }

    // Glow effect animation
    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position} onClick={onClick} userData={{ isBuilding: true }}>
      {/* Base platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[8, 7, 0.4, 16]} />
        <meshStandardMaterial color={isDayMode ? "#FF9800" : "#c41e3a"} />
      </mesh>

      {/* Main building - scroll-shaped structure */}
      <mesh position={[0, 5, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[3, 3, 10, 16]} />
        <meshStandardMaterial color={isDayMode ? "#FFA726" : "#d32f2f"} />
      </mesh>

      {/* Scroll caps */}
      <mesh position={[0, 10.5, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[3.5, 3.5, 1, 16]} />
        <meshStandardMaterial color={isDayMode ? "#E65100" : "#b71c1c"} />
      </mesh>

      <mesh position={[0, -0.5, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[3.5, 3.5, 1, 16]} />
        <meshStandardMaterial color={isDayMode ? "#E65100" : "#b71c1c"} />
      </mesh>

      {/* Scroll details - horizontal lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`line-${i}`} position={[0, 3 + i * 2, 3.1]} castShadow>
          <boxGeometry args={[5, 0.3, 0.1]} />
          <meshStandardMaterial color={isDayMode ? "#E65100" : "#b71c1c"} />
        </mesh>
      ))}

      {/* Glowing effect for night mode */}
      {!isDayMode && <pointLight ref={glowRef} position={[0, 5, 0]} color="#ff6666" intensity={2} distance={15} />}

      {/* Building name */}
      <Text
        position={[0, 12, 0]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        Message Scroll Hall
      </Text>

      {/* Interactive indicator */}
      <Html position={[0, 7, 4]} distanceFactor={15} occlude transform sprite className="pointer-events-none">
        <div className="w-48 rounded-lg bg-white/90 p-3 shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-bold text-orange-600">Message Scroll Hall</h3>
          <p className="text-xs mt-1 text-gray-700">Click to send a message</p>
        </div>
      </Html>
    </group>
  )
}
