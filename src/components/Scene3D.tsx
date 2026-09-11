import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function NeonObjects() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.1;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.1, 0.02);
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pointer.x * 0.4, 0.02);
  });
  return (
    <group ref={ref} position={[2.2, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1}>
        <mesh rotation={[0.7, 0.3, 0.2]} scale={2.1}>
          <torusKnotGeometry args={[1, 0.24, 96, 12]} />
          <meshStandardMaterial
            color="#061316"
            emissive="#00c8dd"
            emissiveIntensity={1.4}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0.9} floatIntensity={1.2}>
        <mesh position={[-3.4, 1.6, -1.2]} scale={1.1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#220018" emissive="#c01673" emissiveIntensity={1.1} wireframe />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.1}>
        <mesh position={[3.2, -1.7, -1]} scale={0.8}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial
            color="#1b102d"
            emissive="#5b2ccc"
            emissiveIntensity={0.9}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 8], fov: 48 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#05070c"]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 5]} intensity={14} color="#00d5e8" />
      <pointLight position={[-4, -2, 3]} intensity={12} color="#d61a7f" />

      <Suspense fallback={null}>
        <NeonObjects />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.35} radius={0.4} luminanceThreshold={0.6} luminanceSmoothing={0.4} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
