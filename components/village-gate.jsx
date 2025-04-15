"use client"

import { useRef } from "react"
import { Text } from "@react-three/drei"

// Improved village gate with better graphics and a sign board
export default function VillageGate({ position = [0, 0, 0], rotation = [0, 0, 0], isDayMode = true }) {
  const lightRef = useRef()

  return (
    <group position={position} rotation={rotation} userData={{ isBuilding: true }}>
      {/* Left pillar */}
      <mesh position={[-5, 5, 0]} castShadow userData={{ isCollider: true }}>
        <boxGeometry args={[2, 10, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Right pillar */}
      <mesh position={[5, 5, 0]} castShadow userData={{ isCollider: true }}>
        <boxGeometry args={[2, 10, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Top beam */}
      <mesh position={[0, 10, 0]} castShadow userData={{ isCollider: true }}>
        <boxGeometry args={[12, 2, 2]} />
        <meshStandardMaterial color="#A52A2A" />
      </mesh>

      {/* Main Sign */}
      <mesh position={[0, 8, 0.5]} castShadow userData={{ isCollider: true }}>
        <boxGeometry args={[8, 1.5, 0.5]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>

      {/* New Sign Board on top - INCREASED WIDTH */}
      <mesh position={[0, 12, 0]} castShadow userData={{ isCollider: true }}>
        <boxGeometry args={[20, 2, 1]} />
        <meshStandardMaterial color="#FF8C00" /> {/* Orange color for visibility */}
      </mesh>

      {/* Sign Text Board */}
      <mesh position={[0, 12, 0.6]} castShadow>
        <boxGeometry args={[19.5, 1.7, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Sign Text - Using default font */}
      <Text position={[0, 12, 0.8]} fontSize={1.2} color="#000000" fontWeight="bold" anchorX="center" anchorY="middle">
        WALK HERE TO VIEW RESUME
      </Text>

      {/* Japanese Lanterns - properly aligned at the ends of the sign board */}
      <JapaneseLantern position={[-10, 11, 0]} color="#FF3B30" isDayMode={isDayMode} />
      <JapaneseLantern position={[10, 11, 0]} color="#FF3B30" isDayMode={isDayMode} />

      {/* Illuminated path in front of gate - simplified */}
      {!isDayMode && (
        <mesh position={[0, 0.06, 5]} castShadow receiveShadow>
          <boxGeometry args={[8, 0.02, 10]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.8} />
        </mesh>
      )}

      {/* Add a single point light for night mode instead of spotlight */}
      {!isDayMode && (
        <pointLight position={[0, 10, 0]} intensity={0.8} distance={20} color="#ffff80" castShadow={false} />
      )}
    </group>
  )
}

// Japanese Lantern Component
function JapaneseLantern({ position, color = "#FF3B30", isDayMode = true }) {
  return (
    <group position={position}>
      {/* Hanging string from the sign board */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.5, 0.2, 12]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Main lantern body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 1, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDayMode ? 0.3 : 0.7}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Bottom cap */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.7, 0.2, 12]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Decorative rings */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <torusGeometry args={[0.62, 0.04, 8, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      <mesh position={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.62, 0.04, 8, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      <mesh position={[0, -0.25, 0]} castShadow>
        <torusGeometry args={[0.62, 0.04, 8, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Light source inside (only visible at night) */}
      {!isDayMode && <pointLight position={[0, 0, 0]} intensity={0.8} distance={5} color="#FFCC88" />}
    </group>
  )
}
