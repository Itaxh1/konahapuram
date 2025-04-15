"use client"

import { useState } from "react"

// Landmark component with hover effect
function Landmark({ position, name, color = "red", hoverColor = "orange", onSelect, locationId }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect(locationId)}
    >
      {/* Building */}
      <mesh castShadow position={[0, 2, 0]}>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color={hovered ? hoverColor : color} />
      </mesh>

      {/* Roof */}
      <mesh castShadow position={[0, 5, 0]}>
        <coneGeometry args={[3, 2, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Label */}
      <mesh position={[0, 7, 0]}>
        <boxGeometry args={[3, 0.5, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}

// Main component with all landmarks
export default function NarutoLandmarks({ onSelectLocation }) {
  return (
    <group>
      {/* Hokage Tower */}
      <Landmark
        position={[0, 0, 0]}
        name="Hokage Tower"
        color="#FF5733"
        hoverColor="#FFC300"
        onSelect={onSelectLocation}
        locationId="hokageTower"
      />

      {/* Ninja Academy */}
      <Landmark
        position={[-20, 0, 10]}
        name="Ninja Academy"
        color="#33A8FF"
        hoverColor="#33FFF6"
        onSelect={onSelectLocation}
        locationId="ninjaAcademy"
      />

      {/* Ichiraku Ramen */}
      <Landmark
        position={[15, 0, -15]}
        name="Ichiraku Ramen"
        color="#FF33A8"
        hoverColor="#FF33F5"
        onSelect={onSelectLocation}
        locationId="ramenShop"
      />

      {/* Training Ground */}
      <Landmark
        position={[-15, 0, -20]}
        name="Training Ground"
        color="#33FF57"
        hoverColor="#B2FF33"
        onSelect={onSelectLocation}
        locationId="trainingGround"
      />

      {/* Hospital */}
      <Landmark
        position={[25, 0, 15]}
        name="Konoha Hospital"
        color="#FFFFFF"
        hoverColor="#E0E0E0"
        onSelect={onSelectLocation}
        locationId="hospital"
      />

      {/* Roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[5, 100]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.01, 0]}>
        <planeGeometry args={[5, 100]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}
