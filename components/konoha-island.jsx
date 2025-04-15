"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"

// Create a simplified circular village on a mountain
export default function KonohaIsland({
  position = [0, 0, 0],
  size = 20,
  height = 10,
  name = "Konoha Village",
  onClick,
  locationId,
}) {
  const groupRef = useRef()

  // Simple animation
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position} onClick={() => onClick && onClick(locationId)}>
      {/* Mountain base */}
      <mesh castShadow receiveShadow>
        <coneGeometry args={[size, height, 32]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>

      {/* Flat top for buildings */}
      <mesh position={[0, height * 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[size * 0.6, size * 0.8, height * 0.2, 32]} />
        <meshStandardMaterial color="#7CFC00" />
      </mesh>

      {/* Central building (Hokage office) */}
      <mesh position={[0, height * 0.6, 0]} castShadow>
        <cylinderGeometry args={[size * 0.15, size * 0.2, height * 0.3, 16]} />
        <meshStandardMaterial color="#FF4500" />
      </mesh>
      <mesh position={[0, height * 0.8, 0]} castShadow>
        <cylinderGeometry args={[size * 0.1, size * 0.15, height * 0.1, 16]} />
        <meshStandardMaterial color="#B22222" />
      </mesh>

      {/* Outer buildings - simplified as boxes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = size * 0.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh key={`building-${i}`} position={[x, height * 0.5, z]} castShadow>
            <boxGeometry args={[size * 0.1, height * 0.15, size * 0.1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        )
      })}

      {/* Island name */}
      {name && (
        <Text
          position={[0, height + 2, 0]}
          fontSize={size * 0.15}
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
