import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Chapter } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import * as THREE from 'three';

// 3D Verse Display
function Verse3D({ text, transliteration, meaning }: { text: string; transliteration: string; meaning: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Card background */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[4, 3, 0.2]} />
        <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      </mesh>
      
      {/* Glow effect */}
      <mesh position={[0, 0, -0.15]}>
        <boxGeometry args={[4.2, 3.2, 0.1]} />
        <meshStandardMaterial color="#ff8c42" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Enhanced 3D Scene for Chapter View
function ChapterScene3D() {
  const krishnaRef = useRef<THREE.Group>(null);
  const arjunaRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (krishnaRef.current) {
      krishnaRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      krishnaRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (arjunaRef.current) {
      arjunaRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + Math.PI) * 0.2;
      arjunaRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + Math.PI) * 0.3;
    }
  });

  return (
    <>
      {/* Krishna */}
      <group ref={krishnaRef} position={[-3.5, -0.5, 0]}>
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

      {/* Arjuna */}
      <group ref={arjunaRef} position={[3.5, -0.5, 0]}>
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

      {/* Connection line between them */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 7, 8]} />
        <meshStandardMaterial color="#ff8c42" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

interface ChapterView3DProps {
  chapter: Chapter;
}

const ChapterView3D: React.FC<ChapterView3DProps> = ({ chapter }) => {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const currentVerse = chapter.verses[currentVerseIndex];

  useEffect(() => {
    setFade(true);
  }, [currentVerseIndex]);
  
  const handleNext = () => {
    if (currentVerseIndex < chapter.verses.length - 1) {
      setFade(false);
      setTimeout(() => setCurrentVerseIndex(currentVerseIndex + 1), 300);
    }
  };

  const handlePrev = () => {
    if (currentVerseIndex > 0) {
      setFade(false);
      setTimeout(() => setCurrentVerseIndex(currentVerseIndex - 1), 300);
    }
  };

  return (
    <div className="w-full relative">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 -z-10 h-full w-full" style={{ opacity: 0.7 }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0.5, 8]} fov={60} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ff8c42" />
          <pointLight position={[5, 5, -5]} intensity={0.3} color="#ffb84d" />
          
          <ChapterScene3D />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </div>

      {/* Verse Content */}
      <div className="relative max-w-4xl mx-auto z-10">
        <div className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            className="bg-white/70 backdrop-blur-md border border-orange-200/50 rounded-xl shadow-2xl p-6 md:p-8 text-center"
            style={{
              transform: 'perspective(1000px) rotateX(2deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <p className="font-sanskrit text-2xl md:text-3xl text-orange-900 leading-relaxed mb-4">{currentVerse.text}</p>
            <p className="text-lg md:text-xl text-orange-800 italic mb-6">{currentVerse.transliteration}</p>
            <p className="text-gray-700 leading-relaxed">{currentVerse.meaning}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button 
            onClick={handlePrev} 
            disabled={currentVerseIndex === 0}
            className="flex items-center px-4 py-2 bg-orange-800 text-white rounded-lg shadow-md hover:bg-orange-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover:scale-105"
          >
            <ChevronLeftIcon />
            <span className="ml-2">Previous</span>
          </button>
          <span className="text-orange-800 font-semibold">
            Verse {currentVerse.verse_number} of {chapter.verses_count}
          </span>
          <button 
            onClick={handleNext}
            disabled={currentVerseIndex === chapter.verses.length - 1}
            className="flex items-center px-4 py-2 bg-orange-800 text-white rounded-lg shadow-md hover:bg-orange-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover:scale-105"
          >
            <span className="mr-2">Next</span>
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterView3D;

