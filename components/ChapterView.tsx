
import React, { useState, useEffect, useRef } from 'react';
import { Chapter } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import ProgressIndicator from './ProgressIndicator';
import ShareButton from './ShareButton';

interface ChapterViewProps {
  chapter: Chapter;
  initialVerseIndex?: number | null;
}

const ChapterView: React.FC<ChapterViewProps> = ({ chapter, initialVerseIndex = null }) => {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(initialVerseIndex ?? 0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [nextButtonHover, setNextButtonHover] = useState({ x: 0, y: 0, isHovering: false });
  const [nextButtonPressed, setNextButtonPressed] = useState(false);
  const [iconRotation, setIconRotation] = useState(0);
  const [pulseScale, setPulseScale] = useState(1);
  const [ripplePosition, setRipplePosition] = useState({ x: 50, y: 50 });
  const [shimmerPosition, setShimmerPosition] = useState(-100);
  const cardRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const currentVerse = chapter.verses[currentVerseIndex];

  // Swipe gestures for mobile
  useEffect(() => {
    if (isFlipping) return;

    let touchStartX: number | null = null;
    let touchEndX: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (touchStartX === null || touchEndX === null) return;
      
      const distance = touchStartX - touchEndX;
      const minSwipe = 50;

      if (distance > minSwipe && currentVerseIndex < chapter.verses.length - 1) {
        handleNext();
      } else if (distance < -minSwipe && currentVerseIndex > 0) {
        handlePrev();
      }
      
      touchStartX = null;
      touchEndX = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX = e.touches[0].clientX;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentVerseIndex, chapter.verses.length, isFlipping]);

  useEffect(() => {
    if (initialVerseIndex !== null) {
      setCurrentVerseIndex(initialVerseIndex);
    }
  }, [initialVerseIndex]);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'rotateY(0deg)';
    }
  }, [currentVerseIndex]);

  // Keyboard shortcuts - use actual handler functions
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if ((e.target as HTMLElement).tagName === 'INPUT') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentVerseIndex, chapter.verses.length, isFlipping]);

  // Continuous pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(prev => {
        const newScale = prev === 1 ? 1.05 : 1;
        return newScale;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Shimmer animation
  useEffect(() => {
    if (nextButtonHover.isHovering) {
      const interval = setInterval(() => {
        setShimmerPosition(prev => prev >= 200 ? -100 : prev + 5);
      }, 16);
      return () => clearInterval(interval);
    } else {
      setShimmerPosition(-100);
    }
  }, [nextButtonHover.isHovering]);
  
  const handleNext = () => {
    if (currentVerseIndex < chapter.verses.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setNextButtonPressed(true);
      setIconRotation(iconRotation + 360);
      
      // 3D press effect
      if (nextButtonRef.current) {
        nextButtonRef.current.style.transform = 'translateZ(-10px) scale(0.95)';
      }
      
      if (cardRef.current) {
        cardRef.current.style.transform = 'rotateY(-90deg)';
      }
      
      setTimeout(() => {
        setCurrentVerseIndex(currentVerseIndex + 1);
        if (cardRef.current) {
          cardRef.current.style.transform = 'rotateY(90deg)';
        }
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.transform = 'rotateY(0deg)';
          }
          setIsFlipping(false);
          setNextButtonPressed(false);
          if (nextButtonRef.current) {
            nextButtonRef.current.style.transform = '';
          }
        }, 150);
      }, 300);
    }
  };

  const handleNextMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (nextButtonRef.current && !nextButtonPressed) {
      const rect = nextButtonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 15;
      const rotateY = ((centerX - x) / centerX) * 15;
      
      setNextButtonHover({ x: rotateX, y: rotateY, isHovering: true });
      setRipplePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
      
      if (nextButtonRef.current) {
        nextButtonRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(${pulseScale})`;
      }
    }
  };

  const handleNextMouseLeave = () => {
    setNextButtonHover({ x: 0, y: 0, isHovering: false });
    if (nextButtonRef.current && !nextButtonPressed) {
      nextButtonRef.current.style.transform = '';
    }
  };

  const handlePrev = () => {
    if (currentVerseIndex > 0 && !isFlipping) {
      setIsFlipping(true);
      
      if (cardRef.current) {
        cardRef.current.style.transform = 'rotateY(90deg)';
      }
      
      setTimeout(() => {
        setCurrentVerseIndex(currentVerseIndex - 1);
        if (cardRef.current) {
          cardRef.current.style.transform = 'rotateY(-90deg)';
        }
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.transform = 'rotateY(0deg)';
          }
          setIsFlipping(false);
        }, 150);
      }, 300);
    }
  };

  return (
    <div className="w-full">
      {/* Progress Indicator */}
      <ProgressIndicator chapter={chapter} currentVerseIndex={currentVerseIndex} />
      
      <div className="relative max-w-4xl mx-auto">
        <div 
          style={{
            perspective: '1000px',
            perspectiveOrigin: 'center center',
          }}
          className="relative"
        >
          <div
            ref={cardRef}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/50 rounded-xl shadow-lg p-6 md:p-8 text-center"
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'rotateY(0deg)',
            }}
          >
            <div style={{ backfaceVisibility: 'hidden' }}>
                <p className="font-sanskrit text-2xl md:text-3xl text-orange-900 dark:text-orange-300 leading-relaxed mb-4">{currentVerse.text}</p>
                <p className="text-lg md:text-xl text-orange-800 dark:text-orange-400 italic mb-6">{currentVerse.transliteration}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{currentVerse.meaning}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
            <button 
              onClick={handlePrev} 
              disabled={currentVerseIndex === 0}
              className="flex items-center px-4 py-2 bg-orange-800 text-white rounded-lg shadow-md hover:bg-orange-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous verse"
            >
              <ChevronLeftIcon />
              <span className="ml-2">Previous</span>
            </button>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <span className="text-orange-800 dark:text-orange-300 font-semibold">
                  Verse {currentVerse.verse_number} of {chapter.verses_count}
                </span>
                <ShareButton chapter={chapter} verse={currentVerse} />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Use ← → arrow keys or swipe to navigate
              </span>
            </div>
            <div
              style={{
                perspective: '1000px',
                perspectiveOrigin: 'center center',
              }}
            >
              <button 
                ref={nextButtonRef}
                onClick={handleNext}
                onMouseMove={handleNextMouseMove}
                onMouseLeave={handleNextMouseLeave}
                disabled={currentVerseIndex === chapter.verses.length - 1}
                className="flex items-center px-4 py-2 bg-orange-800 text-white rounded-lg shadow-md hover:bg-orange-900 disabled:bg-gray-400 disabled:cursor-not-allowed relative overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: nextButtonPressed 
                    ? 'transform 0.1s ease-out' 
                    : 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
                  boxShadow: nextButtonHover.isHovering
                    ? '0 20px 40px rgba(251, 146, 60, 0.4), 0 0 20px rgba(251, 146, 60, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                    : '0 10px 20px rgba(0, 0, 0, 0.2)',
                  background: nextButtonHover.isHovering
                    ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 50%, #ea580c 100%)'
                    : 'linear-gradient(135deg, #9a3412 0%, #7c2d12 100%)',
                  backgroundSize: nextButtonHover.isHovering ? '200% 200%' : '100% 100%',
                  animation: nextButtonHover.isHovering ? 'gradientShift 3s ease infinite' : 'none',
                }}
              >
                {/* CSS Animations */}
                <style>{`
                  @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                  }
                  @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                  }
                  @keyframes ripple {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(4); opacity: 0; }
                  }
                  @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-20deg); }
                    100% { transform: translateX(200%) skewX(-20deg); }
                  }
                  @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                  }
                  @keyframes rotateBorder {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>

                {/* Animated gradient border */}
                {nextButtonHover.isHovering && (
                  <div
                    className="absolute -inset-0.5 rounded-lg opacity-75"
                    style={{
                      background: 'linear-gradient(45deg, #ff8c42, #ffb84d, #ff8c42, #ffd700)',
                      backgroundSize: '400% 400%',
                      animation: 'gradientShift 3s ease infinite',
                      pointerEvents: 'none',
                      zIndex: -1,
                      filter: 'blur(1px)',
                    }}
                  />
                )}

                {/* Ripple effect */}
                {nextButtonHover.isHovering && (
                  <div
                    className="absolute rounded-full bg-white/30"
                    style={{
                      left: `${ripplePosition.x}%`,
                      top: `${ripplePosition.y}%`,
                      width: '20px',
                      height: '20px',
                      transform: 'translate(-50%, -50%)',
                      animation: 'ripple 1s ease-out infinite',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Shimmer effect */}
                {nextButtonHover.isHovering && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)`,
                      transform: `translateX(${shimmerPosition}%) skewX(-20deg)`,
                      animation: 'shimmer 2s infinite',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Pulsing glow dots */}
                {nextButtonHover.isHovering && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full bg-white/40"
                        style={{
                          width: '4px',
                          height: '4px',
                          left: `${20 + i * 15}%`,
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          animation: `float 1.5s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`,
                          pointerEvents: 'none',
                        }}
                      />
                    ))}
                  </>
                )}

                {/* 3D Glow effect */}
                {nextButtonHover.isHovering && (
                  <div
                    className="absolute inset-0 rounded-lg opacity-50"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                      transform: 'translateZ(5px)',
                      pointerEvents: 'none',
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  />
                )}
                
                {/* Button content with 3D depth */}
                <span 
                  className="mr-2 font-semibold relative z-10"
                  style={{
                    transform: 'translateZ(10px)',
                    textShadow: nextButtonHover.isHovering ? '0 2px 10px rgba(255, 255, 255, 0.5)' : 'none',
                    animation: nextButtonHover.isHovering ? 'float 2s ease-in-out infinite' : 'none',
                  }}
                >
                  Next
                </span>
                <div
                  style={{
                    transform: `translateZ(10px) rotateZ(${iconRotation}deg)`,
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: nextButtonHover.isHovering ? 'float 2s ease-in-out infinite 0.3s' : 'none',
                  }}
                  className="relative z-10"
                >
                  <ChevronRightIcon />
                </div>
                
                {/* 3D depth layers with animation */}
                <div
                  className="absolute inset-0 rounded-lg border-2 border-white/20"
                  style={{
                    transform: 'translateZ(5px)',
                    pointerEvents: 'none',
                    animation: nextButtonHover.isHovering ? 'pulse 2s ease-in-out infinite' : 'none',
                  }}
                />
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterView;
