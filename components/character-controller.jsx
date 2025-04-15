"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { MobileControls } from "@/components/mobile-controls"

// Character controller with mouse look controls and collision detection
export default function CharacterController({
  onLocationEnter,
  isDayMode = true,
  collisionObjects = [],
  onPlayerPositionUpdate,
}) {
  const characterRef = useRef()
  const leftSpotlightRef = useRef()
  const rightSpotlightRef = useRef()
  const leftTargetRef = useRef()
  const rightTargetRef = useRef()
  const [position, setPosition] = useState([0, 1, 10])
  const [rotation, setRotation] = useState([0, 0, 0])
  const keysPressed = useRef({})
  const lastLocationCheck = useRef(0)
  const lastLocationId = useRef(null)
  const { camera, scene } = useThree()
  const mouseDown = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const cameraVerticalAngle = useRef(0)
  const mouseSensitivity = 0.003
  const [mobileDirections, setMobileDirections] = useState({})

  // Character dimensions for collision detection
  const characterRadius = 0.4
  const characterHeight = 1.8

  // Raycaster for collision detection
  const raycaster = new THREE.Raycaster()

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true
    }

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    // Mouse controls for looking around
    const handleMouseDown = (e) => {
      if (e.button === 0) {
        // Left mouse button
        mouseDown.current = true
        lastMousePosition.current = { x: e.clientX, y: e.clientY }

        // Add a class to the body to indicate dragging (prevents text selection)
        document.body.classList.add("dragging")
      }
    }

    const handleMouseUp = (e) => {
      if (e.button === 0) {
        // Left mouse button
        mouseDown.current = false

        // Remove the dragging class
        document.body.classList.remove("dragging")
      }
    }

    const handleMouseMove = (e) => {
      if (mouseDown.current) {
        const deltaX = e.clientX - lastMousePosition.current.x
        const deltaY = e.clientY - lastMousePosition.current.y

        // Update horizontal rotation (left/right)
        setRotation([0, rotation[1] - deltaX * mouseSensitivity, 0])

        // Update vertical angle (up/down) with limits to prevent over-rotation
        cameraVerticalAngle.current -= deltaY * mouseSensitivity
        cameraVerticalAngle.current = Math.max(
          -Math.PI / 3, // Look up limit
          Math.min(Math.PI / 3, cameraVerticalAngle.current), // Look down limit
        )

        lastMousePosition.current = { x: e.clientX, y: e.clientY }
      }
    }

    // Add a global mouse up handler to handle cases where mouse is released outside the canvas
    const handleGlobalMouseUp = () => {
      mouseDown.current = false
      document.body.classList.remove("dragging")
    }

    // Touch controls for looking around on mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        // Single touch - movement is handled by MobileControls
        return
      }

      // Second touch for camera rotation
      if (e.touches.length === 2) {
        mouseDown.current = true
        lastMousePosition.current = { x: e.touches[1].clientX, y: e.touches[1].clientY }
        document.body.classList.add("dragging")
      }
    }

    const handleTouchMove = (e) => {
      if (!mouseDown.current || e.touches.length < 2) return

      const touch = e.touches[1] // Use the second touch point for camera rotation
      const deltaX = touch.clientX - lastMousePosition.current.x
      const deltaY = touch.clientY - lastMousePosition.current.y

      // Update horizontal rotation (left/right)
      setRotation([0, rotation[1] - deltaX * mouseSensitivity, 0])

      // Update vertical angle (up/down) with limits to prevent over-rotation
      cameraVerticalAngle.current -= deltaY * mouseSensitivity
      cameraVerticalAngle.current = Math.max(
        -Math.PI / 3, // Look up limit
        Math.min(Math.PI / 3, cameraVerticalAngle.current), // Look down limit
      )

      lastMousePosition.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = (e) => {
      if (e.touches.length < 2) {
        mouseDown.current = false
        document.body.classList.remove("dragging")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleGlobalMouseUp)
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("touchcancel", handleTouchEnd)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleGlobalMouseUp)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("touchcancel", handleTouchEnd)
    }
  }, [rotation])

  // Handle mobile controls
  const handleMobileDirectionChange = useCallback((directions) => {
    // Update the keysPressed ref with mobile input
    Object.keys(directions).forEach((key) => {
      keysPressed.current[key] = directions[key]
    })
  }, [])

  // Check if a position would cause a collision
  const checkCollision = (newPosition) => {
    // Get all meshes in the scene for collision detection
    const colliders = []
    scene.traverse((object) => {
      // Only check meshes that are marked as colliders or are buildings
      if (
        object.isMesh &&
        (object.userData.isCollider || (object.parent && object.parent.userData && object.parent.userData.isBuilding))
      ) {
        colliders.push(object)
      }
    })

    // No colliders found
    if (colliders.length === 0) return false

    // Check for collisions in all directions
    const directions = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(1, 0, 1).normalize(),
      new THREE.Vector3(1, 0, -1).normalize(),
      new THREE.Vector3(-1, 0, 1).normalize(),
      new THREE.Vector3(-1, 0, -1).normalize(),
    ]

    // Character position as Vector3
    const charPos = new THREE.Vector3(newPosition[0], newPosition[1], newPosition[2])

    // Check each direction for collisions
    for (const dir of directions) {
      raycaster.set(charPos, dir)
      const intersects = raycaster.intersectObjects(colliders)

      // If we hit something within our character radius, it's a collision
      if (intersects.length > 0 && intersects[0].distance < characterRadius + 0.1) {
        return true
      }
    }

    return false
  }

  // Update character position and rotation based on keyboard input
  useFrame((state) => {
    // Significantly increased speed
    const speed = 0.5
    const turnSpeed = 0.08

    let moveX = 0
    let moveZ = 0

    // Check keys directly from the ref
    if (keysPressed.current["w"]) moveZ += speed // Backward movement
    if (keysPressed.current["s"]) moveZ -= speed // Forward movement
    if (keysPressed.current["a"]) {
      moveX -= speed
      if (!mouseDown.current) {
        setRotation([0, rotation[1] + turnSpeed, 0]) // Turn left if not using mouse
      }
    }
    if (keysPressed.current["d"]) {
      moveX += speed
      if (!mouseDown.current) {
        setRotation([0, rotation[1] - turnSpeed, 0]) // Turn right if not using mouse
      }
    }

    if (moveX !== 0 || moveZ !== 0) {
      // Calculate movement direction based on character rotation
      const angle = rotation[1]
      const newX = position[0] + Math.sin(angle) * moveZ + Math.cos(angle) * moveX
      const newZ = position[2] + Math.cos(angle) * moveZ - Math.sin(angle) * moveX

      // Check for collisions before updating position
      const newPosition = [newX, position[1], newZ]
      if (!checkCollision(newPosition)) {
        // No collision, update position
        setPosition(newPosition)
      } else {
        // Collision detected, try to slide along walls
        // Try X movement only
        const newPositionX = [newX, position[1], position[2]]
        if (!checkCollision(newPositionX)) {
          setPosition(newPositionX)
        }
        // Try Z movement only
        else {
          const newPositionZ = [position[0], position[1], newZ]
          if (!checkCollision(newPositionZ)) {
            setPosition(newPositionZ)
          }
          // Both directions blocked, don't move
        }
      }

      // Check if player is near any location markers
      // Only check every 500ms to improve performance
      if (state.clock.elapsedTime - lastLocationCheck.current > 0.5) {
        lastLocationCheck.current = state.clock.elapsedTime

        // Updated locations for the new village layout
        const locations = [
          { id: "konohaVillage", x: 0, z: 0, radius: 12 }, // Center - Summary Hall
          { id: "education", x: -50, z: -50, radius: 10 }, // Northwest - Education Tower
          { id: "oregonState", x: 50, z: -50, radius: 10 }, // Northeast - Oregon State
          { id: "agrosperity", x: 50, z: 50, radius: 10 }, // Southeast - Agrosperity
          { id: "hakatours", x: -50, z: 50, radius: 10 }, // Southwest - Hakatours
          { id: "projects", x: 0, z: 50, radius: 10 }, // South - Projects Square
          { id: "skills", x: 0, z: -50, radius: 10 }, // North - Skill Forge
          { id: "certifications", x: -50, z: 0, radius: 10 }, // West - Certification Shrine
        ]

        for (const loc of locations) {
          const distance = Math.sqrt(Math.pow(position[0] - loc.x, 2) + Math.pow(position[2] - loc.z, 2))
          if (distance < loc.radius && lastLocationId.current !== loc.id) {
            lastLocationId.current = loc.id
            onLocationEnter(loc.id)
            // Don't break here - continue movement even after entering a location
          } else if (distance >= loc.radius && lastLocationId.current === loc.id) {
            // Reset location ID when leaving the area
            lastLocationId.current = null
          }
        }
      }
    }

    // Send position and rotation updates for the mini-map
    if (onPlayerPositionUpdate) {
      onPlayerPositionUpdate(position, rotation[1])
    }

    // FIXED CAMERA ATTACHMENT: Directly set camera position and rotation
    if (camera) {
      // Calculate camera position based on character position and rotation
      const cameraDistance = 7 // Distance behind character
      const cameraHeight = 4 // Height above character

      // Calculate camera offset based on character rotation
      const offsetX = Math.sin(rotation[1]) * cameraDistance
      const offsetZ = Math.cos(rotation[1]) * cameraDistance

      // Set camera position directly behind character
      camera.position.set(position[0] - offsetX, position[1] + cameraHeight, position[2] - offsetZ)

      // Calculate look target with vertical angle applied
      const verticalOffset = Math.sin(cameraVerticalAngle.current) * 10
      const horizontalOffset = Math.cos(cameraVerticalAngle.current) * 10

      // Look target is in front of the character based on character's rotation
      const targetX = position[0] + Math.sin(rotation[1]) * horizontalOffset
      const targetY = position[1] + 1.2 + verticalOffset
      const targetZ = position[2] + Math.cos(rotation[1]) * horizontalOffset

      // Make camera look at the target point
      camera.lookAt(targetX, targetY, targetZ)
    }

    // Update spotlight targets for headlights
    if (!isDayMode && leftTargetRef.current && rightTargetRef.current) {
      // Calculate forward direction based on character rotation
      const forwardX = Math.sin(rotation[1]) * 30 // Increased distance for longer throw
      const forwardZ = Math.cos(rotation[1]) * 30 // Increased distance for longer throw

      // Position the targets in front of the character
      leftTargetRef.current.position.set(
        position[0] + forwardX - 2, // Wider offset for better spread
        position[1] - 1, // Aim slightly downward to illuminate the ground
        position[2] + forwardZ,
      )

      rightTargetRef.current.position.set(
        position[0] + forwardX + 2, // Wider offset for better spread
        position[1] - 1, // Aim slightly downward to illuminate the ground
        position[2] + forwardZ,
      )
    }
  })

  return (
    <group position={position} rotation={rotation} ref={characterRef}>
      {/* Character body */}
      <mesh castShadow>
        <boxGeometry args={[0.6, 1.8, 0.6]} />
        <meshStandardMaterial color="#FF9800" />
      </mesh>

      {/* Character head */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#FFB74D" />
      </mesh>

      {/* Ninja headband */}
      <mesh position={[0, 1.2, 0.2]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.7, 0.2, 0.05]} />
        <meshStandardMaterial color="#2196F3" />
      </mesh>
      <mesh position={[0, 1.2, 0.25]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshStandardMaterial color="#B0BEC5" />
      </mesh>

      {/* Headlights - only visible in night mode */}
      {!isDayMode && (
        <>
          {/* Left headlight */}
          <mesh position={[-0.25, 1.1, 0.3]} castShadow>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={1} />
          </mesh>

          {/* Right headlight */}
          <mesh position={[0.25, 1.1, 0.3]} castShadow>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={1} />
          </mesh>

          {/* Light beam cones - visual representation of light beams */}
          <mesh position={[-0.25, 1.1, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.5, 4, 8, 1, true]} />
            <meshBasicMaterial color="#FFFF80" transparent opacity={0.15} side={2} />
          </mesh>

          <mesh position={[0.25, 1.1, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.5, 4, 8, 1, true]} />
            <meshBasicMaterial color="#FFFF80" transparent opacity={0.15} side={2} />
          </mesh>

          {/* Spotlight targets */}
          <object3D ref={leftTargetRef} position={[0, 0, -10]} />
          <object3D ref={rightTargetRef} position={[0, 0, -10]} />

          {/* Left headlight beam - using spotlight for directed beam */}
          <spotLight
            ref={leftSpotlightRef}
            position={[-0.25, 1.1, 0.3]}
            angle={0.2}
            penumbra={0.2}
            intensity={3}
            color="#FFFFCC"
            distance={40}
            decay={1}
            target={leftTargetRef.current}
            castShadow
          />

          {/* Right headlight beam - using spotlight for directed beam */}
          <spotLight
            ref={rightSpotlightRef}
            position={[0.25, 1.1, 0.3]}
            angle={0.2}
            penumbra={0.2}
            intensity={3}
            color="#FFFFCC"
            distance={40}
            decay={1}
            target={rightTargetRef.current}
            castShadow
          />

          {/* High beam center light - for extra long throw */}
          <spotLight
            position={[0, 1.2, 0.4]}
            angle={0.3}
            penumbra={0.2}
            intensity={5}
            color="#FFFFFF"
            distance={60}
            decay={1}
            target={leftTargetRef.current}
          />

          {/* Additional ambient light around character in night mode */}
          <pointLight position={[0, 1, 0]} intensity={1} color="#FFFFFF" distance={8} decay={2} />
        </>
      )}
      {/* Mobile Controls - will only render on mobile devices */}
      <MobileControls onDirectionChange={handleMobileDirectionChange} />
    </group>
  )
}
