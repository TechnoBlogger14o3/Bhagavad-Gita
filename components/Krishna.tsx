import React from 'react';

const Krishna: React.FC = () => {
  return (
    <div className="relative">
      <svg width="180" height="220" viewBox="0 0 180 220">
        <defs>
          <linearGradient id="krishnaSkinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#87ceeb' }} />
            <stop offset="100%" style={{ stopColor: '#4682b4' }} />
          </linearGradient>
          <linearGradient id="krishnaClothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffd700' }} />
            <stop offset="100%" style={{ stopColor: '#ffb300' }} />
          </linearGradient>
          <radialGradient id="haloGradient">
            <stop offset="50%" stopColor="rgba(251, 191, 36, 0.8)" />
            <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
          </radialGradient>
        </defs>
        
        {/* Animated Halo */}
        <circle cx="90" cy="80" r="70" fill="url(#haloGradient)" className="krishna-glow" />

        {/* Body */}
        <path d="M 90 120 C 60 140, 60 200, 70 220 L 110 220 C 120 200, 120 140, 90 120 Z" fill="url(#krishnaClothGradient)" />
        
        {/* Head */}
        <circle cx="90" cy="80" r="35" fill="url(#krishnaSkinGradient)" />
        
        {/* Hair */}
        <path d="M 60 60 C 70 40, 110 40, 120 60 Q 90 70, 60 60 Z" fill="#222" />
        
        {/* Peacock Feather */}
        <path d="M 90 45 C 80 20, 100 20, 90 45" fill="#2962ff" />
        <circle cx="90" cy="32" r="5" fill="#4dd0e1" />
        <circle cx="90" cy="32" r="2" fill="#004d40" />

         {/* Arm (Gesture) */}
        <path d="M 110 130 C 130 140, 140 110, 120 85" stroke="#4682b4" strokeWidth="14" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Krishna;