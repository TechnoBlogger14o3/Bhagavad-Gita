import React, { useRef, useState } from 'react';
import { Chapter } from '../types';

interface ChapterCard3DProps {
  chapter: Chapter;
  onSelectChapter: (chapter: Chapter) => void;
}

const ChapterCard3D: React.FC<ChapterCard3DProps> = ({ chapter, onSelectChapter }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onSelectChapter(chapter)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="bg-white/50 border border-orange-200/50 rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl relative"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
      }}
    >
      <div className="flex items-center mb-4" style={{ transform: 'translateZ(20px)' }}>
        <span 
          className="bg-orange-800 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4"
          style={{ transform: 'translateZ(30px)' }}
        >
          {chapter.chapter_number}
        </span>
        <div style={{ transform: 'translateZ(20px)' }}>
          <h2 className="text-2xl font-bold text-orange-900 font-sanskrit">{chapter.name}</h2>
          <p className="text-orange-700">{chapter.name_meaning}</p>
        </div>
      </div>
      <p 
        className="text-gray-600 leading-relaxed"
        style={{ transform: 'translateZ(10px)' }}
      >
        {chapter.summary}
      </p>
      
      {/* 3D glow effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.4) 0%, transparent 70%)',
            transform: 'translateZ(-10px)',
          }}
        />
      )}
    </div>
  );
};

export default ChapterCard3D;

