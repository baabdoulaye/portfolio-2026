import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * Progression du scroll (0 -> 1), partagée hors de React pour éviter
 * tout re-render de la scène : la caméra la lit dans useFrame.
 */
export const scrollProgress = { current: 0 };

/* ------------------------------------------------------------------
 * MODELES .glb — décommenter une fois /personnage.glb et /chambre.glb
 * déposés dans le dossier `public`.
 * ------------------------------------------------------------------
 * import { useGLTF } from "@react-three/drei";
 *
 * function Personnage(props: JSX.IntrinsicElements["group"]) {
 *   const { scene } = useGLTF("/personnage.glb");
 *   return <primitive object={scene} {...props} />;
 * }
 * useGLTF.preload("/personnage.glb");
 *
 * function Chambre(props: JSX.IntrinsicElements["group"]) {
 *   const { scene } = useGLTF("/chambre.glb");
 *   return <primitive object={scene} {...props} />;
 * }
 * useGLTF.preload("/chambre.glb");
 */

/** Placeholders temporaires en attendant les modèles .glb */
function PlaceholderPersonnage() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25;
  });
  return (
    <group ref={ref} position={[0, 0.1, 0]}>
      <mesh castShadow position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.32, 0.7, 8, 24]} />
        <meshStandardMaterial color="#0d1117" roughness={0.25} metalness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 1.75, 0]}>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshStandardMaterial
          color="#0b0f14"
          roughness={0.15}
          metalness={0.9}
          emissive="#22d3ee"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

function PlaceholderChambre() {
  return (
    <group>
      {/* sol */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#07080d" roughness={0.6} metalness={0.35} />
      </mesh>
      {/* murs */}
      <mesh position={[0, 3, -5]} receiveShadow>
        <boxGeometry args={[16, 6, 0.2]} />
        <meshStandardMaterial color="#0a0c14" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[-6, 3, 0]} receiveShadow>
        <boxGeometry args={[0.2, 6, 12]} />
        <meshStandardMaterial color="#0a0c14" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* mobilier abstrait */}
      {([
        [-3.2, 0.5, -2.4],
        [3.4, 0.35, -1.6],
        [2.2, 0.8, -3.6],
      ] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p} castShadow receiveShadow>
          <boxGeometry args={[1.4, p[1] * 2, 1.1]} />
          <meshStandardMaterial color="#101522" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

      {/* néons décoratifs */}
      <Float speed={2} floatIntensity={0.6}>
        <mesh position={[-4.2, 3.2, -4.6]}>
          <boxGeometry args={[3.4, 0.06, 0.06]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      </Float>
      <Float speed={1.4} floatIntensity={0.5}>
        <mesh position={[3.6, 4.1, -4.6]}>
          <boxGeometry args={[0.06, 2.2, 0.06]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </Float>
    </group>
  );
}

/** Caméra pilotée par la progression du scroll horizontal */
function CameraRig() {
  const target = new THREE.Vector3(0, 1.1, 0);
  useFrame(({ camera }, delta) => {
    const p = scrollProgress.current;
    const angle = -0.55 + p * 1.9; // rotation douce autour du personnage
    const radius = 7.2 - p * 1.6;
    const height = 2.4 - p * 0.7;
    const desired = new THREE.Vector3(
      Math.sin(angle) * radius,
      height,
      Math.cos(angle) * radius,
    );
    // amortissement indépendant du framerate
    const k = 1 - Math.exp(-3 * Math.min(delta, 0.05));
    camera.position.lerp(desired, k);
    camera.lookAt(target);
  });
  return null;
}

export default function Scene3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [-3.8, 2.4, 6, ], fov: 45 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#04050a"]} />
      <fog attach="fog" args={["#04050a", 9, 22]} />

      <ambientLight intensity={0.35} />
      <spotLight
        position={[4, 7, 3]}
        angle={0.45}
        penumbra={0.9}
        intensity={90}
        color="#22d3ee"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        position={[-5, 5, -2]}
        angle={0.6}
        penumbra={1}
        intensity={70}
        color="#a855f7"
      />
      <pointLight position={[0, 1.6, 2.4]} intensity={8} color="#22d3ee" />

      <Suspense fallback={null}>
        <PlaceholderChambre />
        <PlaceholderPersonnage />
        {/* <Chambre /> */}
        {/* <Personnage position={[0, 0, 0]} scale={1} /> */}
        <ContactShadows position={[0, 0.01, 0]} opacity={0.55} scale={16} blur={2.6} far={6} />
        <Environment>
          <Lightformer intensity={1.2} position={[0, 6, 0]} scale={[8, 8, 1]} />
          <Lightformer
            intensity={0.8}
            color="#22d3ee"
            position={[-6, 2, 1]}
            rotation-y={Math.PI / 2}
            scale={[14, 2, 1]}
          />
          <Lightformer
            intensity={0.6}
            color="#a855f7"
            position={[6, 3, -1]}
            rotation-y={-Math.PI / 2}
            scale={[14, 2, 1]}
          />
        </Environment>
      </Suspense>

      <CameraRig />
    </Canvas>
  );
}
