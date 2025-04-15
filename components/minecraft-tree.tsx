"use client"

// Minecraft-style tree component
export default function MinecraftTree({ position = [0, 0, 0], height = 5, leafSize = 3 }) {
  return (
    <group position={position}>
      {/* Trunk */}
      {Array.from({ length: height }).map((_, i) => (
        <mesh key={`trunk-${i}`} position={[0, i, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}

      {/* Leaves */}
      {Array.from({ length: leafSize }).map((_, x) =>
        Array.from({ length: leafSize }).map((_, y) =>
          Array.from({ length: leafSize }).map((_, z) => {
            // Skip some blocks for a more natural look
            if (Math.random() > 0.3) {
              const xPos = x - Math.floor(leafSize / 2)
              const yPos = y + height - 1
              const zPos = z - Math.floor(leafSize / 2)

              // Skip blocks that are too far from center (make it rounder)
              const distance = Math.sqrt(xPos * xPos + zPos * zPos)
              if (distance <= leafSize / 2 + 0.5) {
                return (
                  <mesh key={`leaf-${x}-${y}-${z}`} position={[xPos, yPos, zPos]} castShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="darkgreen" />
                  </mesh>
                )
              }
            }
            return null
          }),
        ),
      )}
    </group>
  )
}
