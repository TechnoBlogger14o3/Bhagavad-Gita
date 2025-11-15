import React, { useEffect, useState } from 'react';

const FontSizeControl: React.FC = () => {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? parseInt(saved) : 100; // 100% is default
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  const increaseFont = () => {
    setFontSize(prev => Math.min(prev + 10, 150));
  };

  const decreaseFont = () => {
    setFontSize(prev => Math.max(prev - 10, 70));
  };

  const resetFont = () => {
    setFontSize(100);
  };

  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-lg px-2 py-1">
      <button
        onClick={decreaseFont}
        className="p-1 hover:bg-orange-50 rounded transition-colors"
        aria-label="Decrease font size"
        disabled={fontSize <= 70}
      >
        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="text-xs text-gray-600 min-w-[3rem] text-center">
        {fontSize}%
      </span>
      <button
        onClick={increaseFont}
        className="p-1 hover:bg-orange-50 rounded transition-colors"
        aria-label="Increase font size"
        disabled={fontSize >= 150}
      >
        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button
        onClick={resetFont}
        className="p-1 hover:bg-orange-50 rounded transition-colors text-xs text-gray-600"
        aria-label="Reset font size"
      >
        Reset
      </button>
    </div>
  );
};

export default FontSizeControl;

