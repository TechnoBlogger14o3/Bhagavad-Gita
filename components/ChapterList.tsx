
import React from 'react';
import { Chapter } from '../types';

interface ChapterListProps {
  chapters: Chapter[];
  onSelectChapter: (chapter: Chapter) => void;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, onSelectChapter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          onClick={() => onSelectChapter(chapter)}
          className="bg-white/50 border border-orange-200/50 rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-orange-300 hover:scale-105"
        >
          <div className="flex items-center mb-4">
            <span className="bg-orange-800 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">
              {chapter.chapter_number}
            </span>
            <div>
              <h2 className="text-2xl font-bold text-orange-900 font-sanskrit">{chapter.name}</h2>
              <p className="text-orange-700">{chapter.name_meaning}</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">{chapter.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default ChapterList;
