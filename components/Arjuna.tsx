import React from 'react';

const Arjuna: React.FC = () => {
  return (
    <svg width="150" height="200" viewBox="0 0 150 200" className="transform scale-x-[-1]">
      <defs>
        <linearGradient id="arjunaSkinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f2a65a' }} />
          <stop offset="100%" style={{ stopColor: '#d48c46' }} />
        </linearGradient>
        <linearGradient id="arjunaClothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffc107' }} />
          <stop offset="100%" style={{ stopColor: '#ff8f00' }} />
        </linearGradient>
      </defs>
      
      {/* Body */}
      <path d="M 75 100 C 50 120, 50 180, 60 200 L 90 200 C 100 180, 100 120, 75 100 Z" fill="url(#arjunaClothGradient)" />
      
      {/* Head */}
      <circle cx="75" cy="70" r="30" fill="url(#arjunaSkinGradient)" />
      
      {/* Hair */}
      <path d="M 50 50 C 60 30, 90 30, 100 50 Q 75 60, 50 50 Z" fill="#333" />
      <path d="M 75 40 Q 80 30, 85 40" stroke="#555" strokeWidth="2" fill="none" />

      {/* Arm (listening posture) */}
      <path d="M 90 110 C 110 120, 120 90, 100 75" stroke="#d48c46" strokeWidth="12" fill="none" strokeLinecap="round" />
    </svg>
  );
};

export default Arjuna;