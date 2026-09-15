import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vHeight;

  float waves(vec2 point) {
    float broad = sin(point.x * 0.72 + uTime * 0.48) * 0.42;
    float crossing = sin(point.y * 0.9 - uTime * 0.34 + point.x * 0.24) * 0.3;
    float detail = sin((point.x + point.y) * 1.35 + uTime * 0.22) * 0.12;
    return broad + crossing + detail;
  }

  void main() {
    vUv = uv;
    vec3 displaced = position;
    float edgeSoftness = sin(uv.x * 3.14159265) * sin(uv.y * 3.14159265);
    vHeight = waves(position.xy);
    displaced.z += vHeight * (0.7 + edgeSoftness * 0.3);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vHeight;

  void main() {
    vec3 midnight = vec3(0.005, 0.018, 0.075);
    vec3 navy = vec3(0.012, 0.075, 0.19);
    vec3 azure = vec3(0.02, 0.35, 0.58);
    vec3 cyan = vec3(0.0, 0.86, 0.95);

    float heightMix = smoothstep(-0.72, 0.76, vHeight);
    float crest = smoothstep(0.48, 0.79, vHeight);
    float softBand = 0.5 + 0.5 * sin(vUv.y * 18.0 + vUv.x * 8.0 - uTime * 0.36);
    float horizon = smoothstep(0.0, 0.72, vUv.y) * (1.0 - smoothstep(0.72, 1.0, vUv.y));

    vec3 color = mix(midnight, navy, heightMix);
    color = mix(color, azure, crest * 0.55);
    color += cyan * crest * (0.12 + softBand * 0.16);
    color += azure * horizon * 0.08;
    color *= 0.72 + 0.28 * smoothstep(0.0, 0.35, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function DeepBlueWaves() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, rawDelta) => {
    const material = materialRef.current;
    if (!material) return;
    const delta = Math.min(rawDelta, 0.05);
    const timeUniform = material.uniforms["uTime"];
    if (timeUniform) timeUniform.value += delta * 0.16;
  });

  return (
    <mesh scale={[1.2, 1.2, 1]}>
      <planeGeometry args={[18, 11, 96, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 7.4], fov: 50 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#020716"]} />

      <Suspense fallback={null}>
        <DeepBlueWaves />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.34} radius={0.36} luminanceThreshold={0.34} luminanceSmoothing={0.72} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
