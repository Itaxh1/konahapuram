"use client"

import { useEffect, Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sky, Stars, Text, Html } from "@react-three/drei"
import CharacterController from "@/components/character-controller"
import VillageGate from "@/components/village-gate"
import * as THREE from "three"

// Improved scene with better graphics while maintaining performance
export default function NarutoScene({ isDayMode, onSelectLocation, onError, onPlayerPositionUpdate }) {
  // Error handling
  useEffect(() => {
    const handleError = (error) => {
      console.error("WebGL error:", error)
      if (onError) onError(error)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [onError])

  // Handle location entry - modified to not interrupt movement
  const handleLocationEnter = (locationId) => {
    if (onSelectLocation) {
      onSelectLocation(locationId)
    }
  }

  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        camera={{ position: [0, 5, 15], fov: 60, near: 0.1, far: 1000 }}
        onCreated={(state) => {
          // Set pixel ratio to a reasonable value for performance
          state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

          // Enable shadows but with lower quality for performance
          state.gl.shadowMap.enabled = true
          state.gl.shadowMap.type = 2 // PCFSoftShadowMap

          // Ensure camera is properly initialized
          state.camera.updateProjectionMatrix()
        }}
        dpr={[1, 1.5]} // Better resolution
      >
        <ambientLight intensity={isDayMode ? 0.5 : 0.1} />
        <directionalLight
          position={[10, 20, 5]}
          intensity={isDayMode ? 1 : 0.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />

        {/* Sky or stars based on day/night mode */}
        {isDayMode ? (
          <>
            <Sky sunPosition={[100, 10, 100]} turbidity={10} rayleigh={0.5} />
          </>
        ) : (
          <>
            <Stars radius={100} depth={50} count={1000} factor={4} />

            {/* Additional moonlight for night mode */}
            <directionalLight
              position={[-10, 20, -5]}
              intensity={0.2}
              color="#b4c9ff"
              castShadow
              shadow-mapSize={[512, 512]}
            />
          </>
        )}

        <Suspense fallback={null}>
          {/* Village layout with proper organization */}
          <VillageLayout isDayMode={isDayMode} onSelectLocation={onSelectLocation} />

          {/* Character Controller - always active */}
          <CharacterController
            onLocationEnter={handleLocationEnter}
            isDayMode={isDayMode}
            onPlayerPositionUpdate={onPlayerPositionUpdate}
          />
        </Suspense>
      </Canvas>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="mx-auto inline-block rounded-lg bg-black/70 px-4 py-2 text-white">
          <p>Use W to move backward, S to move forward, A/D to turn. Hold left mouse button to look around.</p>
        </div>
      </div>
    </div>
  )
}

// Main village layout with all buildings organized in a grid arrangement
function VillageLayout({ isDayMode, onSelectLocation }) {
  // Add this function inside the VillageLayout component, right after the return statement's opening tag
  function CameraAttachmentHelper() {
    const { camera } = useThree()

    // This is a backup to ensure camera stays attached
    useFrame((state) => {
      if (camera && camera.position.y < 0) {
        // If camera somehow goes below ground, reset its height
        camera.position.y = 4
      }
    })

    return null
  }

  // Then add the component inside the group in the VillageLayout return statement
  return (
    <group>
      <CameraAttachmentHelper />
      {/* Ground with better texture */}
      <Ground isDayMode={isDayMode} />

      {/* Central path system connecting all buildings */}
      <PathSystem isDayMode={isDayMode} />

      {/* Village Gate at the entrance */}
      <VillageGate position={[0, 0, -70]} rotation={[0, 0, 0]} isDayMode={isDayMode} />

      {/* 1. The Summary Hall (Central Castle) - Central position */}
      <SummaryCastle position={[0, 0, 0]} name="Summary Hall" locationId="konohaVillage" onClick={onSelectLocation} />

      {/* 2. Education Tower - Northwest quadrant */}
      <EducationTower
        position={[-50, 0, -50]}
        name="Education Tower"
        locationId="education"
        onClick={onSelectLocation}
      />

      {/* 3. Work Experience District - Arranged in grid */}
      {/* Oregon State - Northeast */}
      <WorkBuilding
        position={[50, 0, -50]}
        name="Oregon State"
        locationId="oregonState"
        onClick={onSelectLocation}
        color="#FF8C00" // Dark Orange
        modern={true}
      />

      {/* Agrosperity - Southeast */}
      <WorkBuilding
        position={[50, 0, 50]}
        name="Agrosperity"
        locationId="agrosperity"
        onClick={onSelectLocation}
        color="#4169E1" // Royal Blue
        modern={true}
      />

      {/* Hakatours - Southwest */}
      <WorkBuilding
        position={[-50, 0, 50]}
        name="Hakatours"
        locationId="hakatours"
        onClick={onSelectLocation}
        color="#1E90FF" // Dodger Blue
        modern={true}
      />

      {/* 4. Projects Square - South */}
      <ProjectsSquare position={[0, 0, 50]} name="Projects Square" locationId="projects" onClick={onSelectLocation} />

      {/* 5. Skill Forge - North */}
      <SkillForge position={[0, 0, -50]} name="Skill Forge" locationId="skills" onClick={onSelectLocation} />

      {/* 6. Certification Shrine - West */}
      <CertificationShrine
        position={[-50, 0, 0]}
        name="Certification Shrine"
        locationId="certifications"
        onClick={onSelectLocation}
      />

      {/* Add decorative elements and trees throughout the village */}
      <VillageDecorations isDayMode={isDayMode} />

      {/* Add invisible boundary walls to prevent falling off the map */}
      <BoundaryWalls />
    </group>
  )
}

// Add invisible boundary walls
function BoundaryWalls() {
  return (
    <group>
      {/* North wall */}
      <mesh position={[0, 5, -150]} userData={{ isCollider: true }}>
        <boxGeometry args={[300, 10, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* South wall */}
      <mesh position={[0, 5, 150]} userData={{ isCollider: true }}>
        <boxGeometry args={[300, 10, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* East wall */}
      <mesh position={[150, 5, 0]} userData={{ isCollider: true }}>
        <boxGeometry args={[1, 10, 300]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* West wall */}
      <mesh position={[-150, 5, 0]} userData={{ isCollider: true }}>
        <boxGeometry args={[1, 10, 300]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}

// Modern ground with better texture - UPDATED FOR SMOOTHER TERRAIN
function Ground({ isDayMode }) {
  return (
    <group>
      {/* Main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color={isDayMode ? "#7cba3f" : "#2a5117"} />
      </mesh>

      {/* Center plaza around the Summary Castle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <circleGeometry args={[20, 36]} />
        <meshStandardMaterial color={isDayMode ? "#e0e0e0" : "#404040"} />
      </mesh>

      {/* Smooth terrain features instead of small hills */}
      {[
        [-70, -70],
        [70, -70],
        [-70, 70],
        [70, 70],
      ].map((pos, i) => (
        <mesh key={i} position={[pos[0], -1, pos[1]]} receiveShadow castShadow userData={{ isCollider: true }}>
          <sphereGeometry args={[10, 32, 32]} /> {/* Increased segments for smoother appearance */}
          <meshStandardMaterial color={isDayMode ? "#8dd147" : "#2f5a1a"} />
        </mesh>
      ))}
    </group>
  )
}

// Path system connecting all buildings in a grid with illuminated stripes
function PathSystem({ isDayMode }) {
  // Create path material
  const pathMaterial = new THREE.MeshStandardMaterial({
    color: isDayMode ? "#c2c2c2" : "#555555",
    roughness: 0.8,
  })

  // Illuminated stripe material
  const stripeMaterial = new THREE.MeshStandardMaterial({
    color: "#ffff00",
    emissive: "#ffff00",
    emissiveIntensity: isDayMode ? 0.2 : 0.8,
    roughness: 0.3,
  })

  // Helper function to create a path between two points with illuminated stripes
  const createPath = (start, end, width = 3) => {
    const direction = new THREE.Vector3().subVectors(
      new THREE.Vector3(end[0], 0, end[2]),
      new THREE.Vector3(start[0], 0, start[2]),
    )
    const length = direction.length()
    direction.normalize()

    // Calculate angle
    const angle = Math.atan2(direction.x, direction.z)

    // Calculate midpoint
    const midpoint = [
      start[0] + (direction.x * length) / 2,
      0.02, // Slightly above ground to prevent z-fighting
      start[2] + (direction.z * length) / 2,
    ]

    return (
      <group position={midpoint} rotation={[0, angle, 0]}>
        {/* Main path */}
        <mesh receiveShadow>
          <boxGeometry args={[length, 0.1, width]} />
          <meshStandardMaterial color={isDayMode ? "#c2c2c2" : "#555555"} roughness={0.8} />
        </mesh>

        {/* Illuminated yellow stripes in the middle - single stripe instead of multiple */}
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
          <boxGeometry args={[length, 0.02, 0.5]} />
          <meshStandardMaterial
            color="#ffff00"
            emissive="#ffff00"
            emissiveIntensity={isDayMode ? 0.2 : 0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Add a single light for night mode instead of multiple */}
        {!isDayMode && (
          <pointLight position={[0, 1, 0]} intensity={0.3} distance={10} color="#ffff80" castShadow={false} />
        )}
      </group>
    )
  }

  // Define main locations in grid layout
  const locations = {
    center: [0, 0, 0],
    north: [0, 0, -50],
    south: [0, 0, 50],
    east: [50, 0, 0],
    west: [-50, 0, 0],
    northeast: [50, 0, -50],
    northwest: [-50, 0, -50],
    southeast: [50, 0, 50],
    southwest: [-50, 0, 50],
    gate: [0, 0, -70],
  }

  // Create paths connecting all locations
  return (
    <group>
      {/* Main radial paths from center */}
      {createPath(locations.center, locations.north, 5)}
      {createPath(locations.center, locations.south, 5)}
      {createPath(locations.center, locations.east, 5)}
      {createPath(locations.center, locations.west, 5)}

      {/* Grid connections - reduced number of paths */}
      {createPath(locations.north, locations.northeast, 4)}
      {createPath(locations.north, locations.northwest, 4)}
      {createPath(locations.south, locations.southeast, 4)}
      {createPath(locations.south, locations.southwest, 4)}

      {/* Path to gate */}
      {createPath(locations.north, locations.gate, 5)}

      {/* Circular path around center */}
      <group>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[18, 20, 36]} />
          <meshStandardMaterial color={isDayMode ? "#c2c2c2" : "#555555"} roughness={0.8} />
        </mesh>

        {/* Illuminated ring */}
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
          <ringGeometry args={[19, 19.5, 36]} />
          <meshStandardMaterial
            color="#ffff00"
            emissive="#ffff00"
            emissiveIntensity={isDayMode ? 0.2 : 0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Single light for the center area in night mode */}
        {!isDayMode && (
          <pointLight position={[0, 2, 0]} intensity={0.5} distance={25} color="#ffff80" castShadow={false} />
        )}
      </group>
    </group>
  )
}

// Village decorations like trees, benches, lamps etc.
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
      {/* Trees */}
      {treePositions.map((pos, i) => (
        <ModernTree key={`tree-${i}`} position={[pos[0], 0, pos[1]]} />
      ))}

      {/* Decorative elements */}
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

// Better looking tree with modern design - UPDATED FOR SMOOTHER APPEARANCE
function ModernTree({ position }) {
  return (
    <group position={position} userData={{ isCollider: true }}>
      {/* Trunk with gradient */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.6, 4, 16]} /> {/* Increased segments */}
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Modern foliage - smoother spheres with more segments */}
      <mesh position={[0, 4, 0]} castShadow>
        <sphereGeometry args={[1.5, 32, 32]} /> {/* Increased segments */}
        <meshStandardMaterial color="#2e7d32" />
      </mesh>
      <mesh position={[0, 5.5, 0]} castShadow>
        <sphereGeometry args={[1.2, 32, 32]} /> {/* Increased segments */}
        <meshStandardMaterial color="#388e3c" />
      </mesh>
      <mesh position={[0, 6.7, 0]} castShadow>
        <sphereGeometry args={[0.9, 32, 32]} /> {/* Increased segments */}
        <meshStandardMaterial color="#43a047" />
      </mesh>
    </group>
  )
}

// Decorative elements for the village - UPDATED FOR SMOOTHER APPEARANCE
function DecorativeElement({ position, type, isDayMode }) {
  switch (type) {
    case 0: // Bench
      return (
        <group position={position} userData={{ isCollider: true }}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[3, 0.1, 1]} />
            <meshStandardMaterial color="#A0522D" />
          </mesh>
          <mesh position={[-1.2, 0.6, -0.4]} castShadow>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <meshStandardMaterial color="#A0522D" />
          </mesh>
          <mesh position={[1.2, 0.6, -0.4]} castShadow>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <meshStandardMaterial color="#A0522D" />
          </mesh>
          <mesh position={[0, 1, -0.4]} castShadow>
            <boxGeometry args={[3, 0.1, 0.2]} />
            <meshStandardMaterial color="#A0522D" />
          </mesh>
        </group>
      )

    case 1: // Fountain - smoother with more segments
      return (
        <group position={position} userData={{ isCollider: true }}>
          <mesh position={[0, 0.5, 0]} receiveShadow>
            <cylinderGeometry args={[2, 2.2, 1, 32]} /> {/* Increased segments */}
            <meshStandardMaterial color="#607D8B" />
          </mesh>
          <mesh position={[0, 0.55, 0]} receiveShadow>
            <cylinderGeometry args={[1.8, 1.8, 0.2, 32]} /> {/* Increased segments */}
            <meshStandardMaterial color="#90CAF9" opacity={0.8} transparent />
          </mesh>
        </group>
      )

    case 2: // Rock formation - smoother with more segments
      return (
        <group position={position} userData={{ isCollider: true }}>
          <mesh position={[0, 0.5, 0]} castShadow rotation={[0, 30, 0]}>
            <dodecahedronGeometry args={[1, 2]} /> {/* Increased subdivision */}
            <meshStandardMaterial color="#808080" />
          </mesh>
        </group>
      )

    default:
      return null
  }
}

// Modern lamp post with enhanced night mode illumination
function LampPost({ position, isDayMode }) {
  return (
    <group position={position} userData={{ isCollider: true }}>
      <mesh position={[0, 3, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 6, 8]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>

      {/* Lamp head */}
      <mesh position={[0, 6, 0]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color={isDayMode ? "#f1c40f" : "#f39c12"}
          emissive={isDayMode ? "#f1c40f" : "#f39c12"}
          emissiveIntensity={isDayMode ? 0.2 : 0.8}
        />
      </mesh>

      {/* Add point light for night mode - only if in night mode */}
      {!isDayMode && (
        <pointLight position={[0, 6, 0]} intensity={0.8} distance={15} color="#ffff80" castShadow={false} />
      )}
    </group>
  )
}

// Proximity label component that appears when player is nearby
function ProximityLabel({ position, name, description }) {
  const { camera } = useThree()
  const [visible, setVisible] = useState(false)
  const labelRef = useRef()

  useFrame(() => {
    if (labelRef.current) {
      // Calculate distance to camera
      const distance = new THREE.Vector3(position[0], position[1], position[2]).distanceTo(camera.position)

      // Show label when within 30 units
      setVisible(distance < 30)

      // Make label face the camera
      labelRef.current.lookAt(camera.position)
    }
  })

  if (!visible) return null

  return (
    <group position={[position[0], position[1] - 2, position[2]]} ref={labelRef}>
      <Html transform distanceFactor={10} position={[0, -5, 0]} className="pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="rounded-lg bg-black/80 px-4 py-2 text-center text-white">
            <h3 className="text-lg font-bold">{name}</h3>
            {description && <p className="text-sm">{description}</p>}
          </div>
          <div className="h-4 w-0.5 bg-white"></div>
        </div>
      </Html>
    </group>
  )
}

// 1. The Summary Hall (Central Castle) - modernized futuristic castle
function SummaryCastle({ position, name, locationId, onClick }) {
  const groupRef = useRef()

  // Simple animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group
      ref={groupRef}
      position={[position[0], 0, position[2]]}
      onClick={() => onClick(locationId)}
      userData={{ isBuilding: true }}
    >
      {/* Floating base platform with glow */}
      <mesh position={[0, 0.2, 0]} receiveShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[12, 10, 0.4, 32]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>

      {/* Glowing ring around the base */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10, 10.5, 32]} />
        <meshStandardMaterial color="#3498db" emissive="#3498db" emissiveIntensity={0.5} />
      </mesh>

      {/* Central structure - modern glass tower */}
      <mesh position={[0, 10, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[4, 8, 20, 16]} />
        <meshStandardMaterial color="#ecf0f1" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glass panels on central structure - reduced count */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.sin(angle) * 6, 10, Math.cos(angle) * 6]}
            rotation={[0, angle + Math.PI / 2, 0]}
            castShadow
            userData={{ isCollider: true }}
          >
            <boxGeometry args={[0.1, 16, 4]} />
            <meshStandardMaterial color="#3498db" transparent opacity={0.6} />
          </mesh>
        )
      })}

      {/* Building name with default font */}
      <Text
        position={[0, 30, 0]}
        fontSize={2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {name}
      </Text>

      {/* Proximity label */}
      <ProximityLabel position={position} name="Summary Hall" description="Ashwin Kumar's Portfolio Overview" />
    </group>
  )
}

// 2. Education Tower - futuristic academic tower
function EducationTower({ position, name, locationId, onClick }) {
  const groupRef = useRef()

  // Simple animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.03
    }
  })

  return (
    <group
      ref={groupRef}
      position={[position[0], 0, position[2]]}
      onClick={() => onClick(locationId)}
      userData={{ isBuilding: true }}
    >
      {/* Base platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[8, 7, 0.4, 8]} />
        <meshStandardMaterial color="#9b59b6" />
      </mesh>

      {/* Multi-layered tower sections - simplified */}
      <mesh position={[0, 5, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[6, 6.5, 10, 8]} />
        <meshStandardMaterial color="#9b59b6" />
      </mesh>

      <mesh position={[0, 12.5, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[5, 5.5, 5, 8]} />
        <meshStandardMaterial color="#8e44ad" />
      </mesh>

      <mesh position={[0, 17.5, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[4, 4.5, 5, 8]} />
        <meshStandardMaterial color="#9b59b6" />
      </mesh>

      {/* Alternating glass sections - reduced to one */}
      <mesh position={[0, 7.5, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[5.5, 5.5, 1, 8]} />
        <meshStandardMaterial color="#ecf0f1" transparent opacity={0.7} />
      </mesh>

      {/* Building name with default font */}
      <Text
        position={[0, 25, 0]}
        fontSize={2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {name}
      </Text>

      {/* Proximity label */}
      <ProximityLabel position={position} name="Education Tower" description="Academic Achievements" />
    </group>
  )
}

// 3. Work Experience Building - modern office tower
function WorkBuilding({ position, name, locationId, onClick, color, modern = false }) {
  // Use different designs based on the modern flag
  if (modern) {
    return (
      <group
        position={[position[0], 0, position[2]]}
        onClick={() => onClick(locationId)}
        userData={{ isBuilding: true }}
      >
        {/* Base platform */}
        <mesh position={[0, 0.2, 0]} receiveShadow userData={{ isCollider: true }}>
          <boxGeometry args={[10, 0.4, 10]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Main building structure - simplified */}
        <mesh position={[0, 8, 0]} castShadow userData={{ isCollider: true }}>
          <boxGeometry args={[8, 16, 8]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
        </mesh>

        {/* Secondary section */}
        <mesh position={[0, 8, 0]} rotation={[0, Math.PI / 6, 0]} castShadow userData={{ isCollider: true }}>
          <boxGeometry args={[6, 14, 6]} />
          <meshStandardMaterial color="#ecf0f1" metalness={0.3} roughness={0.7} />
        </mesh>

        {/* Building name with modern font */}
        <Text
          position={[0, 20, 0]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          outline
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {name}
        </Text>

        {/* Proximity label */}
        <ProximityLabel position={position} name={name} description="Work Experience" />
      </group>
    )
  }

  // Fallback to simpler design if not modern
  return (
    <group position={[position[0], 0, position[2]]} onClick={() => onClick(locationId)} userData={{ isBuilding: true }}>
      <mesh position={[0, 7, 0]} castShadow userData={{ isCollider: true }}>
        <boxGeometry args={[8, 14, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, 15, 0]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {name}
      </Text>

      {/* Proximity label */}
      <ProximityLabel position={position} name={name} description="Work Experience" />
    </group>
  )
}

// 4. Projects Square - futuristic tech hub - simplified
function ProjectsSquare({ position, name, locationId, onClick }) {
  const groupRef = useRef()

  return (
    <group
      ref={groupRef}
      position={[position[0], 0, position[2]]}
      onClick={() => onClick(locationId)}
      userData={{ isBuilding: true }}
    >
      {/* Base platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow userData={{ isCollider: true }}>
        <boxGeometry args={[16, 0.4, 16]} />
        <meshStandardMaterial color="#f39c12" />
      </mesh>

      {/* Central project core */}
      <mesh position={[0, 6, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[3, 4, 12, 8]} />
        <meshStandardMaterial color="#e67e22" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Project modules - reduced count */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const radius = 8
        return (
          <group key={i} position={[Math.sin(angle) * radius, 4, Math.cos(angle) * radius]}>
            <mesh position={[0, 0, 0]} castShadow userData={{ isCollider: true }}>
              <boxGeometry args={[4, 8, 4]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#d35400" : "#e74c3c"} metalness={0.3} roughness={0.7} />
            </mesh>
          </group>
        )
      })}

      {/* Building name with modern font */}
      <Text
        position={[0, 20, 0]}
        fontSize={2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {name}
      </Text>

      {/* Proximity label */}
      <ProximityLabel position={position} name="Projects Square" description="Software Development Projects" />
    </group>
  )
}

// 5. Skill Forge - high-tech workshop area - simplified
function SkillForge({ position, name, locationId, onClick }) {
  return (
    <group position={[position[0], 0, position[2]]} onClick={() => onClick(locationId)} userData={{ isBuilding: true }}>
      {/* Base platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[10, 11, 0.4, 16]} />
        <meshStandardMaterial color="#2ecc71" />
      </mesh>

      {/* Main forge building - industrial high-tech */}
      <mesh position={[0, 6, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[7, 8, 12, 16]} />
        <meshStandardMaterial color="#27ae60" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Upper section */}
      <mesh position={[0, 13, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[5, 7, 2, 16]} />
        <meshStandardMaterial color="#2ecc71" />
      </mesh>

      {/* Reactor core in the center */}
      <mesh position={[0, 6, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[2, 2, 14, 16]} />
        <meshStandardMaterial color="#ecf0f1" emissive="#2ecc71" emissiveIntensity={0.3} />
      </mesh>

      {/* Building name with modern font */}
      <Text
        position={[0, 22, 0]}
        fontSize={2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {name}
      </Text>

      {/* Proximity label */}
      <ProximityLabel position={position} name="Skill Forge" description="Technical Skills & Expertise" />
    </group>
  )
}

// 6. Certification Shrine - modern digital temple - simplified
function CertificationShrine({ position, name, locationId, onClick }) {
  return (
    <group position={[position[0], 0, position[2]]} onClick={() => onClick(locationId)} userData={{ isBuilding: true }}>
      {/* Base platform with steps */}
      <mesh position={[0, 0.2, 0]} receiveShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[10, 12, 0.4, 6]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>

      {/* Steps leading up - simplified to one step */}
      <mesh position={[0, 0.6, 0]} receiveShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[9, 10, 0.4, 6]} />
        <meshStandardMaterial color="#2980b9" />
      </mesh>

      {/* Main shrine structure - hexagonal digital temple */}
      <mesh position={[0, 7, 0]} castShadow userData={{ isCollider: true }}>
        <cylinderGeometry args={[6, 8, 10, 6]} />
        <meshStandardMaterial color="#3498db" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Temple columns - reduced count */}
      {Array.from({ length: 3 }).map((_, i) => {
        const angle = (i / 3) * Math.PI * 2
        const radius = 8
        return (
          <mesh
            key={i}
            position={[Math.sin(angle) * radius, 6, Math.cos(angle) * radius]}
            castShadow
            userData={{ isCollider: true }}
          >
            <cylinderGeometry args={[0.6, 0.6, 12, 8]} />
            <meshStandardMaterial color="#ecf0f1" />
          </mesh>
        )
      })}

      {/* Building name with modern font */}
      <Text
        position={[0, 20, 0]}
        fontSize={1.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {name}
      </Text>

      {/* Proximity label */}
      <ProximityLabel position={position} name="Certification Shrine" description="Professional Certifications" />
    </group>
  )
}
