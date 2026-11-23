"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

/* ── WebGL Capability Check ── */
function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* ── Error Boundary for WebGL/Canvas crashes ── */
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL/Three.js render fallback engaged:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/* ── Elegant Fallback when WebGL is unavailable ── */
function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Ambient gradient glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, #7B2FF7 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, #BDF2D5 0%, transparent 70%)" }}
      />
      {/* Floating animated wireframe-like SVG shapes */}
      <motion.div
        animate={{ rotate: 360, y: [0, -15, 0] }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-[20%] left-[12%] w-20 h-20 border-2 border-purple/30 rounded-2xl pointer-events-none hidden sm:block"
        style={{ transform: "rotate(45deg)" }}
      />
      <motion.div
        animate={{ rotate: -360, y: [0, 15, 0] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-[25%] right-[12%] w-24 h-24 border-2 border-mint/40 rounded-full pointer-events-none hidden sm:block"
      />
    </div>
  );
}

/* ── Deterministic random (no Math.random — ESLint purity rule) ── */
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/* ── Floating Particles ── */
function Particles({ count = 300 }) {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const purple = new THREE.Color("#7B2FF7");
    const mint = new THREE.Color("#BDF2D5");
    const lavender = new THREE.Color("#A66DFA");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      p[i3] = (seededRandom(i * 3 + 1) - 0.5) * 20;
      p[i3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 18;
      p[i3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 12;

      const mix = seededRandom(i * 3 + 4);
      const color =
        mix < 0.4
          ? purple.clone().lerp(lavender, mix / 0.4)
          : purple.clone().lerp(mint, (mix - 0.4) / 0.6);
      c[i3] = color.r;
      c[i3 + 1] = color.g;
      c[i3 + 2] = color.b;
    }
    return { positions: p, colors: c };
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
      ref.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Floating Wireframe Geometries ── */
function FloatingGeometry() {
  const mesh1 = useRef<THREE.Mesh>(null!);
  const mesh2 = useRef<THREE.Mesh>(null!);
  const mesh3 = useRef<THREE.Mesh>(null!);
  const mesh4 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (mesh1.current) {
      mesh1.current.rotation.x += delta * 0.3;
      mesh1.current.rotation.z += delta * 0.2;
    }
    if (mesh2.current) {
      mesh2.current.rotation.y += delta * 0.4;
      mesh2.current.rotation.x += delta * 0.15;
    }
    if (mesh3.current) {
      mesh3.current.rotation.y += delta * 0.25;
      mesh3.current.rotation.z += delta * 0.3;
    }
    if (mesh4.current) {
      mesh4.current.rotation.x += delta * 0.2;
      mesh4.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <>
      {/* Purple octahedron */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
        <mesh ref={mesh1} position={[-3.5, 1.5, -2]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#7B2FF7"
            emissive="#7B2FF7"
            emissiveIntensity={0.5}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Mint torus */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
        <mesh ref={mesh2} position={[3.5, -1, -3]}>
          <torusGeometry args={[0.6, 0.18, 16, 32]} />
          <meshStandardMaterial
            color="#BDF2D5"
            emissive="#BDF2D5"
            emissiveIntensity={0.4}
            transparent
            opacity={0.45}
            wireframe
          />
        </mesh>
      </Float>

      {/* Lavender icosahedron */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh ref={mesh3} position={[2, 2.5, -4]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#A66DFA"
            emissive="#A66DFA"
            emissiveIntensity={0.4}
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>
      </Float>

      {/* Purple dodecahedron */}
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={1.3}>
        <mesh ref={mesh4} position={[-2, -2, -3.5]}>
          <dodecahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#7B2FF7"
            emissive="#7B2FF7"
            emissiveIntensity={0.35}
            transparent
            opacity={0.35}
            wireframe
          />
        </mesh>
      </Float>

      {/* Torus knot — central accent */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[0, -3, -5]}>
          <torusKnotGeometry args={[0.4, 0.12, 64, 16]} />
          <meshStandardMaterial
            color="#A66DFA"
            emissive="#A66DFA"
            emissiveIntensity={0.3}
            transparent
            opacity={0.25}
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
}

/* ── Scene Lights ── */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#7B2FF7" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#BDF2D5" />
      <pointLight position={[0, 3, -4]} intensity={0.3} color="#A66DFA" />
    </>
  );
}

/* ── Mouse-responsive camera ── */
function CameraRig() {
  useFrame(({ mouse, camera }) => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Main exported scene with WebGL Check & Fallback ── */
export default function HeroScene() {
  const [webglSupported] = useState<boolean>(() => isWebGLAvailable());

  if (!webglSupported) {
    return <HeroSceneFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<HeroSceneFallback />}>
      <div className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <SceneLights />
          <Particles count={300} />
          <FloatingGeometry />
          <CameraRig />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
