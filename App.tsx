
import React, { useState } from 'react';
import { Chapter } from './types';
import { gitaChapters } from './data/gita';
import ChapterList from './components/ChapterList';
import ChapterView from './components/ChapterView';
import Scene3D from './components/Scene3D';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import FontSizeControl from './components/FontSizeControl';
import ArrowLeftIcon from './components/icons/ArrowLeftIcon';

const App: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState<number | null>(null);

  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setSelectedVerseIndex(null);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedChapter(null);
    setSelectedVerseIndex(null);
    window.scrollTo(0, 0);
  };

  const handleSelectVerse = (chapter: Chapter, verseNumber: number) => {
    const verseIndex = chapter.verses.findIndex(v => v.verse_number === verseNumber);
    if (verseIndex !== -1) {
      setSelectedChapter(chapter);
      setSelectedVerseIndex(verseIndex);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-orange-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 relative overflow-hidden transition-colors duration-300">
      {/* 3D Background Scene */}
      <Scene3D showCharacters={!selectedChapter} />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-8">
          {/* Top bar with controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 flex justify-start">
              {selectedChapter && (
                  <button
                    onClick={handleBackToList}
                    className="flex items-center text-orange-800 dark:text-orange-300 hover:text-orange-900 dark:hover:text-orange-200 transition-colors z-20 relative"
                    aria-label="Back to Chapters"
                  >
                    <ArrowLeftIcon />
                    <span className="ml-2 font-semibold hidden md:inline">Back to Chapters</span>
                  </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <FontSizeControl />
              <ThemeToggle />
            </div>
          </div>

          {/* Title and Search */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-orange-900 dark:text-orange-300 font-sanskrit drop-shadow-lg mb-2">
              श्रीमद्भगवद्गीता
            </h1>
            <p className="text-xl md:text-2xl text-orange-700 dark:text-orange-400 mt-2 drop-shadow-md">
              The Divine Song of God
            </p>
          </div>

          {/* Search Bar - only show on home page */}
          {!selectedChapter && (
            <div className="mb-8">
              <SearchBar 
                chapters={gitaChapters} 
                onSelectChapter={handleSelectChapter}
                onSelectVerse={handleSelectVerse}
              />
            </div>
          )}
        </header>

        {selectedChapter ? (
          <ChapterView 
            key={selectedChapter.id} 
            chapter={selectedChapter}
            initialVerseIndex={selectedVerseIndex}
          />
        ) : (
          <ChapterList chapters={gitaChapters} onSelectChapter={handleSelectChapter} />
        )}
      </main>
      <footer className="text-center py-6 text-orange-700/60 dark:text-orange-400/60 text-sm relative z-10">
        <p>Inspired by the timeless wisdom of the Bhagavad Gita.</p>
      </footer>
    </div>
  );
};

export default App;
