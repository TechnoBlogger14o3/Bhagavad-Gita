
import React, { useState } from 'react';
import { Chapter } from './types';
import { gitaChapters } from './data/gita';
import ChapterList from './components/ChapterList';
import ChapterView from './components/ChapterView';
import Scene3D from './components/Scene3D';
import ArrowLeftIcon from './components/icons/ArrowLeftIcon';

const App: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedChapter(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-orange-50 to-white text-gray-800 relative overflow-hidden">
      {/* 3D Background Scene */}
      <Scene3D showCharacters={!selectedChapter} />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <header className="flex justify-between items-center mb-12">
            <div className="flex-1 flex justify-start">
              {selectedChapter && (
                  <button
                    onClick={handleBackToList}
                    className="flex items-center text-orange-800 hover:text-orange-900 transition-colors z-20 relative"
                    aria-label="Back to Chapters"
                  >
                    <ArrowLeftIcon />
                    <span className="ml-2 font-semibold hidden md:inline">Back to Chapters</span>
                  </button>
              )}
            </div>
            <div className="text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-orange-900 font-sanskrit drop-shadow-lg">श्रीमद्भगवद्गीता</h1>
              <p className="text-xl md:text-2xl text-orange-700 mt-2 drop-shadow-md">The Divine Song of God</p>
            </div>
            <div className="flex-1"></div>
        </header>

        {selectedChapter ? (
          <ChapterView key={selectedChapter.id} chapter={selectedChapter} />
        ) : (
          <ChapterList chapters={gitaChapters} onSelectChapter={handleSelectChapter} />
        )}
      </main>
      <footer className="text-center py-6 text-orange-700/60 text-sm relative z-10">
        <p>Inspired by the timeless wisdom of the Bhagavad Gita.</p>
      </footer>
    </div>
  );
};

export default App;
