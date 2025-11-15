import React, { useState, useEffect } from 'react';

type BackgroundTheme = 'orange' | 'saffron' | 'golden' | 'peaceful' | 'divine' | 'sunset' | 'lotus' | 'temple';

interface BackgroundConfig {
  gradient: string;
  name: string;
  description: string;
}

const backgrounds: Record<BackgroundTheme, BackgroundConfig> = {
  orange: {
    gradient: 'bg-gradient-to-b from-orange-100 via-orange-50 to-white',
    name: 'Orange Sunrise',
    description: 'Warm and welcoming'
  },
  saffron: {
    gradient: 'bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-50',
    name: 'Saffron',
    description: 'Traditional and sacred'
  },
  golden: {
    gradient: 'bg-gradient-to-b from-yellow-100 via-amber-50 to-orange-100',
    name: 'Golden',
    description: 'Radiant and divine'
  },
  peaceful: {
    gradient: 'bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50',
    name: 'Peaceful',
    description: 'Calm and serene'
  },
  divine: {
    gradient: 'bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50',
    name: 'Divine',
    description: 'Spiritual and mystical'
  },
  sunset: {
    gradient: 'bg-gradient-to-b from-orange-200 via-pink-100 to-purple-100',
    name: 'Sunset',
    description: 'Beautiful and inspiring'
  },
  lotus: {
    gradient: 'bg-gradient-to-b from-pink-100 via-rose-50 to-white',
    name: 'Lotus',
    description: 'Pure and elegant'
  },
  temple: {
    gradient: 'bg-gradient-to-b from-stone-100 via-amber-50 to-orange-50',
    name: 'Temple',
    description: 'Ancient and sacred'
  }
};

// Export hook to get current background
export const useBackgroundTheme = () => {
  const [theme, setTheme] = useState<BackgroundTheme>(() => {
    const saved = localStorage.getItem('backgroundTheme');
    return (saved as BackgroundTheme) || 'orange';
  });

  useEffect(() => {
    const handleChange = (e: CustomEvent<BackgroundTheme>) => {
      setTheme(e.detail);
    };
    
    window.addEventListener('backgroundChanged', handleChange as EventListener);
    return () => {
      window.removeEventListener('backgroundChanged', handleChange as EventListener);
    };
  }, []);

  return { theme, gradient: backgrounds[theme].gradient };
};

const BackgroundSelector: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<BackgroundTheme>(() => {
    const saved = localStorage.getItem('backgroundTheme');
    return (saved as BackgroundTheme) || 'orange';
  });

  useEffect(() => {
    localStorage.setItem('backgroundTheme', selectedTheme);
    window.dispatchEvent(new CustomEvent('backgroundChanged', { detail: selectedTheme }));
  }, [selectedTheme]);

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-orange-200 hover:bg-orange-50 transition-colors"
        aria-label="Change background"
        title="Change background theme"
      >
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>
      
      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-orange-200 rounded-lg shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="text-xs font-semibold text-gray-600 mb-2 px-2">Background Themes</div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(backgrounds).map(([key, bg]) => (
            <button
              key={key}
              onClick={() => setSelectedTheme(key as BackgroundTheme)}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                selectedTheme === key
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              <div className={`w-full h-8 rounded mb-2 ${bg.gradient}`}></div>
              <div className="text-xs font-semibold text-gray-800">{bg.name}</div>
              <div className="text-xs text-gray-500">{bg.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelector;

