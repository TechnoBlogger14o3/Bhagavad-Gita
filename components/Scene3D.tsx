import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating Sanskrit characters
function FloatingCharacter({ position, char }: { position: [number, number, number]; char: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial color="#ff8c42" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

// Simple 3D representation of Krishna
function Krishna3D() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[-2.5, -0.5, 0]}>
      {/* Halo */}
      <mesh position={[0, 1.5, 0]}>
        <ringGeometry args={[1.2, 1.5, 32]} />
        <meshBasicMaterial color="#ffb84d" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#87ceeb" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 1, 32]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      
      {/* Peacock feather */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshStandardMaterial color="#2962ff" />
      </mesh>
    </group>
  );
}

// Simple 3D representation of Arjuna
function Arjuna3D() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + Math.PI) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + Math.PI) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#f2a65a" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 1, 32]} />
        <meshStandardMaterial color="#ffc107" />
      </mesh>
    </group>
  );
}

// Main 3D Scene Component
const Scene3D: React.FC<{ showCharacters?: boolean }> = ({ showCharacters = true }) => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" style={{ opacity: 0.6 }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0.5, 6]} fov={60} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff8c42" />
        <pointLight position={[5, 5, -5]} intensity={0.4} color="#ffb84d" />
        
        {showCharacters && (
          <>
            <Krishna3D />
            <Arjuna3D />
          </>
        )}
        
        {/* Floating Sanskrit characters */}
        <FloatingCharacter position={[-3, 2, -1]} char="ॐ" />
        <FloatingCharacter position={[3, -1, -1]} char="क" />
        <FloatingCharacter position={[0, 3, -2]} char="श" />
        <FloatingCharacter position={[-2, -2, -1]} char="र" />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;

