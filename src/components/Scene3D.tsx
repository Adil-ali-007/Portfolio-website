import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { ScrollTrigger } from '../utils/animations';

interface Scene3DProps {
  explodeAmount?: number;
  wireframe?: boolean;
  lightIntensity?: number;
  autoRotate?: boolean;
  reducedMotion?: boolean;
}

// Global scroll progress tracker without triggering React re-renders
let globalScrollProgress = 0;
if (typeof window !== 'undefined') {
  window.addEventListener(
    'scroll',
    () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      globalScrollProgress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    },
    { passive: true }
  );
}

// Subcomponent: Central Composite Monolith Sculpture
function MonolithSculpture({
  explodeAmount = 0,
  wireframe = false,
  lightIntensity = 1,
  autoRotate = true,
  reducedMotion = false,
}: {
  explodeAmount: number;
  wireframe: boolean;
  lightIntensity: number;
  autoRotate: boolean;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Materials
  const metallicMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#141416'),
        metalness: 0.92,
        roughness: 0.2,
        wireframe,
      }),
    [wireframe]
  );

  const obsidianMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0a0a0c'),
        metalness: 0.8,
        roughness: 0.32,
        wireframe,
      }),
    [wireframe]
  );

  const neonEmissiveMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FF4500'),
        emissive: new THREE.Color('#FF6B35'),
        emissiveIntensity: 2.8 * lightIntensity,
        roughness: 0.1,
        metalness: 0.1,
      }),
    [lightIntensity]
  );

  // Modular blocks around the core
  const blocks = useMemo(() => {
    return [
      { id: 1, pos: [-0.45, 0, 0.45] as [number, number, number], size: [0.38, 1.9, 0.38] as [number, number, number], dir: [-1, 0.2, 1] },
      { id: 2, pos: [0.45, 0, 0.45] as [number, number, number], size: [0.38, 2.2, 0.38] as [number, number, number], dir: [1, 0.4, 1] },
      { id: 3, pos: [-0.45, 0, -0.45] as [number, number, number], size: [0.38, 2.4, 0.38] as [number, number, number], dir: [-1, 0.3, -1] },
      { id: 4, pos: [0.45, 0, -0.45] as [number, number, number], size: [0.38, 1.7, 0.38] as [number, number, number], dir: [1, -0.2, -1] },
      { id: 5, pos: [0, 0.2, 0.85] as [number, number, number], size: [0.65, 1.2, 0.25] as [number, number, number], dir: [0, 0.5, 1.2] },
      { id: 6, pos: [0, -0.2, -0.85] as [number, number, number], size: [0.65, 1.4, 0.25] as [number, number, number], dir: [0, -0.4, -1.2] },
      { id: 7, pos: [-0.85, 0.1, 0] as [number, number, number], size: [0.25, 1.5, 0.65] as [number, number, number], dir: [-1.2, 0.2, 0] },
      { id: 8, pos: [0.85, -0.1, 0] as [number, number, number], size: [0.25, 1.8, 0.65] as [number, number, number], dir: [1.2, -0.2, 0] },
      { id: 9, pos: [-0.65, 1.2, -0.65] as [number, number, number], size: [0.22, 0.6, 0.22] as [number, number, number], dir: [-1, 1.5, -1] },
      { id: 10, pos: [0.65, 1.3, 0.65] as [number, number, number], size: [0.22, 0.7, 0.22] as [number, number, number], dir: [1, 1.5, 1] },
    ];
  }, []);

  // Frame tick: smooth rotation and subtle scroll responsiveness
  useFrame((state, delta) => {
    if (groupRef.current && !reducedMotion) {
      const scrollRotation = globalScrollProgress * Math.PI * 2.5;
      if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.25;
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.damp(
          groupRef.current.rotation.y,
          scrollRotation,
          3,
          delta
        );
      }
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        globalScrollProgress * 0.4,
        2.5,
        delta
      );
    }

    if (coreRef.current && !reducedMotion) {
      const t = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 2.5) * 0.05 + globalScrollProgress * 0.15;
      coreRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef.current && !reducedMotion) {
      const t = state.clock.getElapsedTime();
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.2 + globalScrollProgress * 0.6;
      ringRef.current.rotation.z = Math.cos(t * 0.4) * 0.2;
    }
  });

  const effectiveExplode = Math.min(1, explodeAmount + globalScrollProgress * 0.25);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Radiant molten core */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.32, 2.6, 0.32]} />
        <primitive object={neonEmissiveMaterial} attach="material" />
      </mesh>

      {/* Point light localized at core */}
      <pointLight
        position={[0, 0, 0]}
        color="#FF6B35"
        intensity={(6 + globalScrollProgress * 4) * lightIntensity}
        distance={9}
        decay={2}
      />

      {/* Outer floating geometric blocks with explode interpolation */}
      {blocks.map((block, idx) => {
        const targetX = block.pos[0] + block.dir[0] * effectiveExplode * 1.5;
        const targetY = block.pos[1] + block.dir[1] * effectiveExplode * 1.5;
        const targetZ = block.pos[2] + block.dir[2] * effectiveExplode * 1.5;

        return (
          <mesh
            key={block.id}
            position={[targetX, targetY, targetZ]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={block.size} />
            <primitive
              object={idx % 2 === 0 ? metallicMaterial : obsidianMaterial}
              attach="material"
            />
          </mesh>
        );
      })}

      {/* Orbiting thin technological halo ring */}
      <group ref={ringRef} position={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5 + effectiveExplode * 0.5, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#FF6B35"
            emissiveIntensity={(1.8 + globalScrollProgress * 1.2) * lightIntensity}
            roughness={0.2}
            metalness={0.8}
            wireframe={wireframe}
          />
        </mesh>
      </group>
    </group>
  );
}

// Subcomponent: Atmospheric Floor Grid of Metallic Cubes & Fissure
function MonolithicFloorGrid({
  lightIntensity = 1,
  wireframe = false,
  reducedMotion = false,
}: {
  lightIntensity: number;
  wireframe: boolean;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const fissureMeshRef = useRef<THREE.Mesh>(null);

  const gridSize = 16;
  const count = gridSize * gridSize;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    let idx = 0;
    const spacing = 0.55;
    const half = (gridSize * spacing) / 2;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = i * spacing - half;
        const z = j * spacing - half;

        const distFromCenter = Math.sqrt(x * x + z * z);
        const heightVariation = Math.sin(x * 1.5) * Math.cos(z * 1.5);
        const height = Math.max(0.1, 0.35 + heightVariation * 0.25 - distFromCenter * 0.04);

        dummy.position.set(x, -1.8 + height / 2, z);
        dummy.scale.set(0.5, height, 0.5);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.computeBoundingSphere();
  }, [dummy, gridSize]);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime() * 0.8 + globalScrollProgress * 2;
    const spacing = 0.55;
    const half = (gridSize * spacing) / 2;
    let idx = 0;

    for (let i = 0; i < gridSize; i += 2) {
      for (let j = 0; j < gridSize; j += 2) {
        idx = i * gridSize + j;
        const x = i * spacing - half;
        const z = j * spacing - half;
        const dist = Math.sqrt(x * x + z * z);
        const wave = Math.sin(t + dist * 1.2) * 0.08;
        const baseH = 0.35;

        dummy.position.set(x, -1.8 + (baseH + wave) / 2, z);
        dummy.scale.set(0.5, baseH + wave, 0.5);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#0f0f12"
          metalness={0.85}
          roughness={0.28}
          wireframe={wireframe}
        />
      </instancedMesh>

      <mesh
        ref={fissureMeshRef}
        position={[0, -1.65, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
      >
        <planeGeometry args={[12, 0.35 + globalScrollProgress * 0.25]} />
        <meshStandardMaterial
          color="#FF3D00"
          emissive="#FF6B35"
          emissiveIntensity={(3.2 + globalScrollProgress * 2) * lightIntensity}
          roughness={0.1}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Subcomponent: Ambient Floating Ember Particles
function FloatingEmbers({ count = 70, reducedMotion = false }: { count?: number; reducedMotion?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return [pos];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * (0.45 + globalScrollProgress * 0.4);
      if (arr[i * 3 + 1] > 3.5) {
        arr[i * 3 + 1] = -2.5;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF7A45"
        size={0.06}
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Camera controller with mouse parallax and scroll position interpolation
function CameraRig({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const targetX = pointer.x * 0.8 + Math.sin(globalScrollProgress * Math.PI) * 0.5;
    const targetY = 0.8 + pointer.y * 0.4 - globalScrollProgress * 0.6;
    const targetZ = 5.2 - globalScrollProgress * 0.8;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.5, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Scene3D({
  explodeAmount = 0,
  wireframe = false,
  lightIntensity = 1,
  autoRotate = true,
  reducedMotion = false,
}: Scene3DProps) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#080808] text-center p-6 border border-[#222]">
        <div>
          <div className="w-16 h-16 mx-auto mb-4 border border-[#FF6B35]/40 rounded-lg flex items-center justify-center text-[#FF6B35] font-mono text-sm">
            3D
          </div>
          <p className="text-sm font-medium text-white mb-1">WebGL Acceleration Required</p>
          <p className="text-xs text-neutral-400">Falling back to high-resolution graphic render</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0.8, 5.2], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <ambientLight intensity={0.25 * lightIntensity} />
        
        <hemisphereLight
          args={['#1c1c24', '#080808', 0.5 * lightIntensity]}
        />

        <directionalLight
          position={[4, 5, 4]}
          intensity={(2.2 + globalScrollProgress * 0.8) * lightIntensity}
          color="#FFE0B2"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0005}
        />

        <directionalLight
          position={[-4, 3, -4]}
          intensity={(1.8 + globalScrollProgress * 1.2) * lightIntensity}
          color="#FF6B35"
        />

        <Float
          speed={reducedMotion ? 0 : 1.2}
          rotationIntensity={reducedMotion ? 0 : 0.4}
          floatIntensity={reducedMotion ? 0 : 0.5}
        >
          <MonolithSculpture
            explodeAmount={explodeAmount}
            wireframe={wireframe}
            lightIntensity={lightIntensity}
            autoRotate={autoRotate}
            reducedMotion={reducedMotion}
          />
        </Float>

        <MonolithicFloorGrid
          lightIntensity={lightIntensity}
          wireframe={wireframe}
          reducedMotion={reducedMotion}
        />

        <FloatingEmbers count={60} reducedMotion={reducedMotion} />

        <CameraRig reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
export default Scene3D;
