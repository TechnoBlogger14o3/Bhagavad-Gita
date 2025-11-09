
import React from 'react';
import { Chapter } from '../types';
import ChapterCard3D from './ChapterCard3D';

interface ChapterListProps {
  chapters: Chapter[];
  onSelectChapter: (chapter: Chapter) => void;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, onSelectChapter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {chapters.map((chapter) => (
        <ChapterCard3D
          key={chapter.id}
          chapter={chapter}
          onSelectChapter={onSelectChapter}
        />
      ))}
    </div>
  );
};

export default ChapterList;
