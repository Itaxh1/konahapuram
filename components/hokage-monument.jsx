"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

// Simplified Hokage Monument
export default function HokageMonument({ position = [0, 0, 0] }) {
  const groupRef = useRef()

  // Gentle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Mountain base */}
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <boxGeometry args={[40, 20, 10]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>

      {/* Face carving - main face area */}
      <mesh position={[0, 5, 5.1]} castShadow>
        <boxGeometry args={[30, 10, 0.5]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>

      {/* First Hokage */}
      <group position={[-15, 5, 5.2]}>
        {/* Eyes */}
        <mesh position={[-2, 1, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[2, 1, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[3, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Second Hokage */}
      <group position={[-5, 5, 5.2]}>
        {/* Eyes */}
        <mesh position={[-2, 1, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[2, 1, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[3, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Third Hokage */}
      <group position={[5, 5, 5.2]}>
        {/* Eyes */}
        <mesh position={[-2, 1, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[2, 1, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[3, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Fourth Hokage */}
      <group position={[15, 5, 5.2]}>
        {/* Eyes */}
        <mesh position={[-2, 1, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[2, 1, 0]} castShadow>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[3, 0.5, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>
    </group>
  )
}
