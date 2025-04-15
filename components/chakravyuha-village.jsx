"use client"

import { useRef } from "react"
import { Text } from "@react-three/drei"
import { Html } from "@react-three/drei"

// Function to generate points along a Chakravyuha spiral - simplified
function generateChakravyuhaPoints(radius, turns, pointsPerTurn) {
  const points = []
  const totalPoints = Math.min(turns * pointsPerTurn, 60) // Further limit total points

  // Generate spiral points
  for (let i = 0; i < totalPoints; i++) {
    const angle = (i / pointsPerTurn) * Math.PI * 2
    const r = (radius * (totalPoints - i)) / totalPoints
    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r
    points.push({ x, z, angle, radius: r })
  }

  // Add entrance path (bottom opening) - simplified
  const entranceLength = radius * 0.4
  const entrancePoints = Math.floor(pointsPerTurn * 0.2)

  for (let i = 0; i < entrancePoints; i += 2) {
    // Skip every other point
    const ratio = i / entrancePoints
    const z = radius + entranceLength * ratio
    points.push({ x: 0, z: z, angle: Math.PI * 1.5, radius: 0 })
  }

  return points
}

// Building component with resume theme - simplified
function Building({ position, size, height, color, type, name, onClick, locationId }) {
  // Building style based on type
  let buildingGeometry
  let roofGeometry
  const roofPosition = [0, height, 0]
  let roofColor = "#B22222"

  // Scale factor to make everything smaller
  const scaleFactor = 0.8 // 0.8x scale (20% smaller)
  const scaledSize = size * scaleFactor
  const scaledHeight = height * scaleFactor
  const scaledPosition = [position.x * scaleFactor, 0, position.z * scaleFactor]

  switch (type) {
    case "hokage": // Center - Summary
      buildingGeometry = <cylinderGeometry args={[scaledSize * 0.8, scaledSize, scaledHeight, 12]} /> // Reduced segments
      roofGeometry = <coneGeometry args={[scaledSize * 0.8, scaledSize * 0.5, 12]} /> // Reduced segments
      roofColor = "#FF4500"
      break
    case "work": // Work Experience
      buildingGeometry = <boxGeometry args={[scaledSize, scaledHeight, scaledSize]} />
      roofGeometry = <coneGeometry args={[scaledSize * 0.8, scaledSize * 0.5, 4]} />
      roofColor = "#4169E1" // Royal Blue
      break
    case "skills": // Skills
      buildingGeometry = <cylinderGeometry args={[scaledSize * 0.6, scaledSize * 0.8, scaledHeight, 6]} />
      roofGeometry = <coneGeometry args={[scaledSize * 0.8, scaledSize * 0.5, 6]} />
      roofColor = "#32CD32" // Lime Green
      break
    case "education": // Education
      buildingGeometry = <boxGeometry args={[scaledSize * 1.5, scaledHeight, scaledSize]} />
      roofGeometry = <boxGeometry args={[scaledSize * 1.7, scaledSize * 0.3, scaledSize * 1.2]} />
      roofColor = "#9370DB" // Medium Purple
      break
    case "projects": // Projects
      buildingGeometry = <cylinderGeometry args={[scaledSize * 0.7, scaledSize * 0.5, scaledHeight, 8]} />
      roofGeometry = <sphereGeometry args={[scaledSize * 0.5, 12, 12]} /> // Reduced segments
      roofColor = "#FFD700" // Gold
      break
    default:
      buildingGeometry = <boxGeometry args={[scaledSize, scaledHeight, scaledSize]} />
      roofGeometry = <coneGeometry args={[scaledSize * 0.8, scaledSize * 0.5, 4]} />
  }

  // Calculate sign position and rotation based on building position
  const signPosition = [0, scaledHeight * 0.5, scaledSize * 0.51] // Front of building
  const signRotation = [0, 0, 0] // Facing forward

  // For buildings not at center, rotate sign to face center
  if (position.x !== 0 || position.z !== 0) {
    const angle = Math.atan2(position.x, position.z)
    signRotation[1] = angle

    // Position sign on the side facing the center
    signPosition[0] = Math.sin(angle) * scaledSize * 0.51
    signPosition[2] = Math.cos(angle) * scaledSize * 0.51
  }

  return (
    <group position={scaledPosition} onClick={() => onClick && onClick(locationId)}>
      {/* Main building */}
      <mesh position={[0, scaledHeight / 2, 0]} castShadow>
        {buildingGeometry}
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, scaledHeight, 0]} castShadow>
        {roofGeometry}
        <meshStandardMaterial color={roofColor} />
      </mesh>

      {/* Building name */}
      <Text
        position={[0, scaledHeight + scaledSize * 0.5, 0]}
        fontSize={scaledSize * 0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
        font="/fonts/ninja-naruto.woff2"
      >
        {name}
      </Text>

      {/* Interactive indicator */}
      <mesh position={[0, scaledHeight + scaledSize * 0.3, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[scaledSize * 0.1, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
      </mesh>

      {/* Info card that appears on hover */}
      <Html
        position={[0, scaledHeight * 1.5, 0]}
        distanceFactor={15}
        occlude
        transform
        sprite
        className="pointer-events-none"
      >
        <div className="w-48 rounded-lg bg-white/90 p-3 shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-bold text-orange-600">{name}</h3>
          <p className="text-xs mt-1 text-gray-700">Click to view details</p>
        </div>
      </Html>
    </group>
  )
}

// Path segment - simplified
function PathSegment({ start, end, width = 1 }) {
  // Scale factor to make everything smaller
  const scaleFactor = 0.8

  // Calculate midpoint
  const midX = ((start.x + end.x) / 2) * scaleFactor
  const midZ = ((start.z + end.z) / 2) * scaleFactor

  // Calculate length and angle
  const dx = (end.x - start.x) * scaleFactor
  const dz = (end.z - start.z) * scaleFactor
  const length = Math.sqrt(dx * dx + dz * dz)
  const angle = Math.atan2(dz, dx)

  return (
    <mesh position={[midX, 0.05, midZ]} rotation={[0, angle, 0]} receiveShadow>
      <boxGeometry args={[length, 0.1, width * scaleFactor]} />
      <meshStandardMaterial color="#D2B48C" />
    </mesh>
  )
}

// Main Chakravyuha Village component based on resume - simplified
export default function ChakravyuhaVillage({ position = [0, 0, 0], radius = 50, turns = 5, onClick }) {
  const groupRef = useRef()

  // Scale factor to make everything smaller
  const scaleFactor = 0.8
  const scaledRadius = radius * scaleFactor

  // Generate points along the Chakravyuha pattern
  const pathPoints = generateChakravyuhaPoints(radius, turns, 8) // Reduced points per turn

  // Create path segments - simplified
  const pathSegments = []
  for (let i = 0; i < pathPoints.length - 1; i += 2) {
    // Skip every other segment
    if (i + 1 >= pathPoints.length) break
    const start = pathPoints[i]
    const end = pathPoints[i + 1]
    pathSegments.push(<PathSegment key={`path-${i}`} start={start} end={end} width={3} />)
  }

  // Resume-based buildings
  const buildings = []

  // Center - Summary (Hokage Tower)
  buildings.push(
    <Building
      key="hokage-tower"
      position={{ x: 0, z: 0 }}
      size={8}
      height={12}
      color="#FF6347" // Tomato
      type="hokage"
      name="Ashwin Kumar"
      onClick={onClick}
      locationId="konohaVillage"
    />,
  )

  // Work Experience - Inner Spiral
  // Oregon State University
  buildings.push(
    <Building
      key="oregon-state"
      position={{ x: 20, z: 5 }}
      size={6}
      height={8}
      color="#4169E1" // Royal Blue
      type="work"
      name="Oregon State University"
      onClick={onClick}
      locationId="oregonState"
    />,
  )

  // Agrosperity Kivi
  buildings.push(
    <Building
      key="agrosperity"
      position={{ x: -15, z: 20 }}
      size={7}
      height={10}
      color="#4169E1" // Royal Blue
      type="work"
      name="Agrosperity Kivi"
      onClick={onClick}
      locationId="agrosperity"
    />,
  )

  // Hakatours
  buildings.push(
    <Building
      key="hakatours"
      position={{ x: -25, z: -10 }}
      size={5}
      height={7}
      color="#4169E1" // Royal Blue
      type="work"
      name="Hakatours"
      onClick={onClick}
      locationId="hakatours"
    />,
  )

  // Skills - Middle Spiral
  buildings.push(
    <Building
      key="skills"
      position={{ x: 30, z: -20 }}
      size={6}
      height={8}
      color="#32CD32" // Lime Green
      type="skills"
      name="Technical Skills"
      onClick={onClick}
      locationId="skills"
    />,
  )

  // Certifications
  buildings.push(
    <Building
      key="certifications"
      position={{ x: 10, z: -35 }}
      size={5}
      height={6}
      color="#32CD32" // Lime Green
      type="skills"
      name="Certifications"
      onClick={onClick}
      locationId="certifications"
    />,
  )

  // Education - Outer Spiral
  buildings.push(
    <Building
      key="education"
      position={{ x: -35, z: -30 }}
      size={6}
      height={9}
      color="#9370DB" // Medium Purple
      type="education"
      name="Education"
      onClick={onClick}
      locationId="education"
    />,
  )

  // Projects - Outer Spiral
  buildings.push(
    <Building
      key="projects"
      position={{ x: -40, z: 30 }}
      size={6}
      height={8}
      color="#FFD700" // Gold
      type="projects"
      name="Projects"
      onClick={onClick}
      locationId="projects"
    />,
  )

  // Create ground plane
  const groundSize = radius * 2.5 * scaleFactor

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[groundSize, groundSize]} />
        <meshStandardMaterial color="#7CFC00" />
      </mesh>

      {/* Paths */}
      <group>{pathSegments}</group>

      {/* Buildings */}
      <group>{buildings}</group>

      {/* Village name */}
      <Text
        position={[0, 20 * scaleFactor, 0]}
        fontSize={8 * scaleFactor}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.2}
        outlineColor="#000000"
        font="/fonts/ninja-naruto.woff2"
      >
        Ashwin Kumar's Portfolio
      </Text>
    </group>
  )
}
