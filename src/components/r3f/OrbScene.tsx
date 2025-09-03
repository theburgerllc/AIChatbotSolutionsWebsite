"use client";
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function Orb({ reduced, dragging }: { reduced?: boolean; dragging: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { invalidate } = useThree();

  // Material memoization
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#a58cff'),
    roughness: 0.25,
    metalness: 0.5,
    emissive: new THREE.Color('#3a2eff'),
    emissiveIntensity: 0.2,
  }), []);
  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const animate = () => {
      if (meshRef.current && !dragging) {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.x += 0.0025;
        invalidate();
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [invalidate, reduced, dragging]);

  return (
    <mesh ref={meshRef} material={material} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 2]} />
    </mesh>
  );
}

function Controls({ setDragging }: { setDragging: (v: boolean) => void }) {
  const { invalidate } = useThree();
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.5}
      onStart={() => setDragging(true)}
      onEnd={() => setDragging(false)}
      onChange={() => invalidate()}
    />
  );
}

export default function OrbScene({ reduced }: { reduced?: boolean }) {
  const [dragging, setDragging] = useState(false);
  return (
    <div className="relative aspect-video">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.75]}
        shadows
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: [0, 0, 3.2], fov: 50 }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} castShadow />
          <directionalLight position={[-3, -2, 1]} intensity={0.4} />
          <Orb reduced={reduced} dragging={dragging} />
          <Controls setDragging={setDragging} />
        </Suspense>
      </Canvas>
    </div>
  );
}

