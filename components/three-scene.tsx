"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sky, Stars, Cloud, PerspectiveCamera, Text } from "@react-three/drei"

// Character controller with keyboard input
function CharacterController({ onGateClick, onPlayerReachedGate }) {
  console.log("CharacterController initializing")
  const characterRef = useRef()
  const [position, setPosition] = useState([0, 1, 10])
  const [rotation, setRotation] = useState([0, 0, 0])
  const keysPressed = useRef({})
  const [cameraView, setCameraView] = useState("third-person")
  const speed = 0.1
  const turnSpeed = 0.05

  // Handle keyboard input with improved event handling
  useEffect(() => {
    console.log("CharacterController: Setting up keyboard listeners")
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true
      console.log(`Key pressed: ${e.key.toLowerCase()}`)

      // Toggle camera view with V key
      if (e.key.toLowerCase() === "v") {
        console.log("Toggling camera view")
        setCameraView((prev) => (prev === "third-person" ? "first-person" : "third-person"))
      }
    }

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      console.log("CharacterController: Removing keyboard listeners")
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Update character position and rotation based on keyboard input
  useFrame(() => {
    let moveX = 0
    let moveZ = 0

    // Check keys directly from the ref to avoid stale closures
    if (keysPressed.current["w"]) moveZ -= speed
    if (keysPressed.current["s"]) moveZ += speed
    if (keysPressed.current["a"]) {
      moveX -= speed
      setRotation([0, rotation[1] + turnSpeed, 0])
    }
    if (keysPressed.current["d"]) {
      moveX += speed
      setRotation([0, rotation[1] - turnSpeed, 0])
    }

    if (moveX !== 0 || moveZ !== 0) {
      // Calculate movement direction based on character rotation
      const angle = rotation[1]
      const newX = position[0] + Math.sin(angle) * moveZ + Math.cos(angle) * moveX
      const newZ = position[2] + Math.cos(angle) * moveZ - Math.sin(angle) * moveX

      // Update position
      const newPosition = [newX, position[1], newZ]
      setPosition(newPosition)

      // Check if player is near the gate
      const distanceToGate = Math.sqrt(Math.pow(newX - 0, 2) + Math.pow(newZ - -10, 2))
      if (distanceToGate < 3) {
        console.log("Player reached gate, triggering callback")
        onPlayerReachedGate()
      }
    }
  })

  // Camera setup based on view mode
  const cameraPosition =
    cameraView === "third-person"
      ? [position[0], position[1] + 3, position[2] + 5]
      : [position[0], position[1] + 1.6, position[2]]

  const cameraLookAt =
    cameraView === "third-person"
      ? [position[0], position[1], position[2] - 5]
      : [position[0] + Math.sin(rotation[1]), position[1], position[2] - Math.cos(rotation[1])]

  return (
    <>
      {/* Character */}
      <mesh position={position} rotation={rotation} castShadow ref={characterRef}>
        <boxGeometry args={[0.5, 1.8, 0.5]} />
        <meshStandardMaterial color="orange" />

        {/* Ninja headband */}
        <mesh position={[0, 0.7, 0.26]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.05]} />
          <meshStandardMaterial color="blue" />
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[0.2, 0.15, 0.05]} />
            <meshStandardMaterial color="silver" />
          </mesh>
        </mesh>
      </mesh>

      {/* Camera */}
      <PerspectiveCamera makeDefault position={cameraPosition} fov={75} />
      <group position={cameraLookAt}>
        <mesh visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>
    </>
  )
}

// Ground plane
function Ground() {
  console.log("Ground component rendering")
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}

// Japanese Lantern Component - Properly aligned
function JapaneseLantern({ position, color = "#FF3B30", isDayMode = true }) {
  console.log(`JapaneseLantern rendering at position: ${position}`)
  return (
    <group position={position}>
      {/* Hanging string from the sign board */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.4, 0.2, 12]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Main lantern body */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.6, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDayMode ? 0.3 : 0.7}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Bottom cap */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.5, 0.2, 12]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Decorative rings */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <torusGeometry args={[0.42, 0.03, 8, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      <mesh position={[0, -0.2, 0]} castShadow>
        <torusGeometry args={[0.42, 0.03, 8, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      <mesh position={[0, -0.3, 0]} castShadow>
        <torusGeometry args={[0.42, 0.03, 8, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Light source inside (only visible at night) */}
      {!isDayMode && <pointLight position={[0, -0.2, 0]} intensity={0.8} distance={5} color="#FFCC88" />}
    </group>
  )
}

// Village gate - UPDATED WITH PROPERLY ALIGNED JAPANESE LANTERNS
function VillageGate({ onClick }) {
  console.log("VillageGate component rendering")
  const isDayMode = true // Default to day mode for this component

  return (
    <group position={[0, 0, -15]} onClick={onClick}>
      {/* Left pillar */}
      <mesh position={[-5, 5, 0]} castShadow>
        <boxGeometry args={[2, 10, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Right pillar */}
      <mesh position={[5, 5, 0]} castShadow>
        <boxGeometry args={[2, 10, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Top beam */}
      <mesh position={[0, 10, 0]} castShadow>
        <boxGeometry args={[12, 2, 2]} />
        <meshStandardMaterial color="#A52A2A" />
      </mesh>

      {/* Sign */}
      <mesh position={[0, 8, 0.5]} castShadow>
        <boxGeometry args={[8, 1.5, 0.5]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>

      {/* New Sign Board on top - INCREASED WIDTH */}
      <mesh position={[0, 12, 0]} castShadow>
        <boxGeometry args={[20, 1.2, 0.8]} />
        <meshStandardMaterial color="#FF8C00" /> {/* Orange color for visibility */}
      </mesh>

      {/* Sign Text Board */}
      <mesh position={[0, 12, 0.5]} castShadow>
        <boxGeometry args={[19.5, 0.9, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Sign Text - Using default font */}
      <Text position={[0, 12, 0.7]} fontSize={0.7} color="#000000" anchorX="center" anchorY="middle">
        WALK HERE TO VIEW RESUME
      </Text>

      {/* Japanese Lanterns - properly aligned at the ends of the sign board */}
      <JapaneseLantern position={[-10, 12, 0]} color="#FF3B30" isDayMode={isDayMode} />
      <JapaneseLantern position={[10, 12, 0]} color="#FF3B30" isDayMode={isDayMode} />
    </group>
  )
}

// Minecraft-style trees
function Tree({ position }) {
  console.log(`Tree rendering at position: ${position}`)
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Leaves */}
      <mesh position={[0, 5, 0]} castShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="darkgreen" />
      </mesh>
    </group>
  )
}

// Main scene component
export default function ThreeScene({ onGateClick, isDayMode, onPlayerReachedGate, onError }) {
  console.log("ThreeScene component rendering with props:", { isDayMode })

  // Error handling
  useEffect(() => {
    console.log("ThreeScene: Setting up error handlers")

    // Global error handler
    const handleGlobalError = (event) => {
      console.error("Global error caught:", event.error)
      if (onError) onError(event.error)
    }

    // Unhandled rejection handler
    const handleRejection = (event) => {
      console.error("Unhandled promise rejection:", event.reason)
      if (onError) onError(event.reason)
    }

    // Font loading error handler
    const handleFontError = (event) => {
      if (
        event.target &&
        ((event.target.tagName === "LINK" && event.target.rel === "stylesheet") ||
          event.target.tagName === "STYLE" ||
          (event.message && event.message.includes("font")))
      ) {
        console.warn("Font resource failed to load:", event)
        event.preventDefault() // Prevent the error from propagating
        return true
      }
      return false
    }

    window.addEventListener("error", (event) => {
      if (!handleFontError(event)) {
        handleGlobalError(event)
      }
    })
    window.addEventListener("unhandledrejection", handleRejection)

    return () => {
      console.log("ThreeScene: Removing error handlers")
      window.removeEventListener("error", handleGlobalError)
      window.removeEventListener("unhandledrejection", handleRejection)
    }
  }, [onError])

  // Debug WebGL capabilities
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

      if (!gl) {
        console.error("WebGL is not supported by your browser")
        if (onError) onError(new Error("WebGL not supported"))
        return
      }

      console.log("WebGL Capabilities:")
      console.log("- Vendor:", gl.getParameter(gl.VENDOR))
      console.log("- Renderer:", gl.getParameter(gl.RENDERER))
      console.log("- Version:", gl.getParameter(gl.VERSION))
      console.log("- Shading Language Version:", gl.getParameter(gl.SHADING_LANGUAGE_VERSION))
      console.log("- Max Texture Size:", gl.getParameter(gl.MAX_TEXTURE_SIZE))
      console.log("- Max Viewport Dimensions:", gl.getParameter(gl.MAX_VIEWPORT_DIMS))
    } catch (err) {
      console.error("Error checking WebGL capabilities:", err)
    }
  }, [onError])

  return (
    <Canvas
      shadows
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      onCreated={(state) => {
        console.log("Canvas created, initializing renderer")
        try {
          // Set pixel ratio to a reasonable value for performance
          const pixelRatio = Math.min(window.devicePixelRatio, 1.5)
          console.log(`Setting pixel ratio to: ${pixelRatio}`)
          state.gl.setPixelRatio(pixelRatio)

          // Reduce shadow map size for better performance
          console.log("Configuring shadow maps")
          state.gl.shadowMap.enabled = true
          state.gl.shadowMap.type = 2 // PCFSoftShadowMap

          // Force camera update
          console.log("Updating camera projection matrix")
          state.camera.updateProjectionMatrix()

          console.log("Canvas initialization complete")
        } catch (err) {
          console.error("Error during canvas initialization:", err)
          if (onError) onError(err)
        }
      }}
      onError={(err) => {
        console.error("Canvas error:", err)
        if (onError) onError(err)
      }}
      camera={{ position: [0, 5, 15], fov: 60, near: 0.1, far: 1000 }}
      dpr={[1, 1.5]} // Limit DPR for better performance
    >
      <ambientLight intensity={isDayMode ? 0.5 : 0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={isDayMode ? 1 : 0.2}
        castShadow
        shadow-mapSize={[512, 512]} // Reduced shadow map size
      />

      {/* Sky - simplified */}
      {isDayMode ? <Sky sunPosition={[100, 10, 100]} /> : <Stars radius={100} depth={50} count={1000} factor={4} />}

      {/* Clouds - reduced */}
      {isDayMode && <Cloud position={[0, 15, -20]} speed={0.2} opacity={0.7} />}

      {/* Character */}
      <CharacterController onGateClick={onGateClick} onPlayerReachedGate={onPlayerReachedGate} />

      {/* Environment */}
      <Ground />
      <VillageGate onClick={onGateClick} />

      {/* Trees - reduced count */}
      <Tree position={[-8, 0, -5]} />
      <Tree position={[8, 0, -5]} />
      <Tree position={[-15, 0, -15]} />
      <Tree position={[15, 0, -15]} />
    </Canvas>
  )
}
