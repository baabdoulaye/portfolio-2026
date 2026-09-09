import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * Progression du scroll (0 -> 1), partagée hors de React pour éviter
 * tout re-render de la scène : la caméra la lit dans useFrame.
 */
function NeonObjects() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.12, 0.025);
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pointer.x * 0.55, 0.025);
  });
  return (
    <group ref={ref} position={[1.8, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.2}>
        <mesh rotation={[0.7, 0.3, 0.2]} scale={2.25}>
          <torusKnotGeometry args={[1, 0.24, 192, 24]} />
          <meshStandardMaterial color="#061316" emissive="#00f0ff" emissiveIntensity={5.5} metalness={0.9} roughness={0.15} />
        </mesh>
      </Float>
      <Float speed={1.9} rotationIntensity={1.1} floatIntensity={1.6}>
        <mesh position={[-3.5, 1.6, -1.2]} scale={1.15}>
          <icosahedronGeometry args={[1, 3]} />
          <meshStandardMaterial color="#220018" emissive="#ff1493" emissiveIntensity={4} wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.4}>
        <mesh position={[3.2, -1.7, -1]} scale={0.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="#1b102d" emissive="#7b2cff" emissiveIntensity={3.2} metalness={0.8} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 48 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.18} />
      <pointLight position={[4, 4, 5]} intensity={30} color="#00f0ff" />
      <pointLight position={[-4, -2, 3]} intensity={28} color="#ff1493" />

      <Suspense fallback={null}>
        <NeonObjects />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={1.6} luminanceThreshold={0.18} luminanceSmoothing={0.85} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
