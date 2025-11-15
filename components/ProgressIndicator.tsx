import React from 'react';
import { Chapter } from '../types';

interface ProgressIndicatorProps {
  chapter: Chapter;
  currentVerseIndex: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ chapter, currentVerseIndex }) => {
  const progress = ((currentVerseIndex + 1) / chapter.verses_count) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="flex justify-between items-center mb-2 text-sm text-orange-700">
        <span className="font-semibold">Reading Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-orange-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
        <span>Verse {currentVerseIndex + 1}</span>
        <span>of {chapter.verses_count}</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;

