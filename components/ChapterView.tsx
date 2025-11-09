
import React, { useState, useEffect } from 'react';
import { Chapter } from '../types';
import Arjuna from './Arjuna';
import Krishna from './Krishna';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface ChapterViewProps {
  chapter: Chapter;
}

const ChapterView: React.FC<ChapterViewProps> = ({ chapter }) => {
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
    <div className="w-full">
      <div className="relative max-w-4xl mx-auto">
        <div className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-xl shadow-lg p-6 md:p-8 text-center">
                <p className="font-sanskrit text-2xl md:text-3xl text-orange-900 leading-relaxed mb-4">{currentVerse.text}</p>
                <p className="text-lg md:text-xl text-orange-800 italic mb-6">{currentVerse.transliteration}</p>
                <p className="text-gray-700 leading-relaxed">{currentVerse.meaning}</p>
            </div>
        </div>

        <div className="flex justify-between items-center mt-6">
            <button 
              onClick={handlePrev} 
              disabled={currentVerseIndex === 0}
              className="flex items-center px-4 py-2 bg-orange-800 text-white rounded-lg shadow-md hover:bg-orange-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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
              className="flex items-center px-4 py-2 bg-orange-800 text-white rounded-lg shadow-md hover:bg-orange-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <span className="mr-2">Next</span>
              <ChevronRightIcon />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterView;
