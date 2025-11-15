
import React, { useState } from 'react';
import { Chapter } from './types';
import { gitaChapters } from './data/gita';
import { hanumanChalisa } from './data/hanumanChalisa';
import { sunderkandChapters } from './data/sunderkand';
import { bajrangBaan } from './data/bajrangBaan';
import { yakshaPrashna } from './data/yakshaPrashn';
import ChapterList from './components/ChapterList';
import ChapterView from './components/ChapterView';
import Scene3D from './components/Scene3D';
import SearchBar from './components/SearchBar';
import FontSizeControl from './components/FontSizeControl';
import BackgroundSelector, { useBackgroundTheme } from './components/BackgroundSelector';
import ArrowLeftIcon from './components/icons/ArrowLeftIcon';
import GitaChatbot from './components/GitaChatbot';

type TextType = 'gita' | 'hanumanChalisa' | 'sunderkand' | 'bajrangBaan' | 'yakshaPrashna';

interface TextConfig {
  chapters: Chapter[];
  title: string;
  subtitle: string;
  footer: string;
}

const textConfigs: Record<TextType, TextConfig> = {
  gita: {
    chapters: gitaChapters,
    title: 'श्रीमद्भगवद्गीता',
    subtitle: 'The Divine Song of God',
    footer: 'Inspired by the timeless wisdom of the Bhagavad Gita.'
  },
  hanumanChalisa: {
    chapters: hanumanChalisa,
    title: 'हनुमान चालीसा',
    subtitle: 'Hanuman Chalisa',
    footer: 'Inspired by the devotion of Lord Hanuman.'
  },
  sunderkand: {
    chapters: sunderkandChapters,
    title: 'सुन्दरकाण्ड',
    subtitle: 'Sunderkand - The Beautiful Chapter',
    footer: 'Inspired by the journey of Hanuman to Lanka.'
  },
  bajrangBaan: {
    chapters: bajrangBaan,
    title: 'बजरंग बाण',
    subtitle: 'Bajrang Baan - The Thunderbolt Arrow',
    footer: 'Inspired by the power of Lord Hanuman.'
  },
  yakshaPrashna: {
    chapters: yakshaPrashna,
    title: 'यक्ष प्रश्न',
    subtitle: 'Yaksha Prashna - The Questions of the Yaksha',
    footer: 'Inspired by the wisdom of Yudhishthira and the Yaksha.'
  }
};

const App: React.FC = () => {
  const [selectedTextType, setSelectedTextType] = useState<TextType>('gita');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState<number | null>(null);
  const { gradient } = useBackgroundTheme();
  
  const currentTextConfig = textConfigs[selectedTextType];
  const currentChapters = currentTextConfig.chapters;

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

  const handleTextTypeChange = (textType: TextType) => {
    setSelectedTextType(textType);
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
    <div className={`min-h-screen ${gradient} text-gray-800 relative overflow-hidden transition-colors duration-500`}>
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
                    className="flex items-center text-orange-800 hover:text-orange-900 transition-colors z-20 relative"
                    aria-label="Back to Chapters"
                  >
                    <ArrowLeftIcon />
                    <span className="ml-2 font-semibold hidden md:inline">Back to Chapters</span>
                  </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <BackgroundSelector />
              <FontSizeControl />
            </div>
          </div>

          {/* Text Type Selector - only show on home page */}
          {!selectedChapter && (
            <div className="mb-6 flex justify-center">
              <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-lg p-2">
                <button
                  onClick={() => handleTextTypeChange('gita')}
                  className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                    selectedTextType === 'gita'
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                  }`}
                >
                  भगवद्गीता
                </button>
                <button
                  onClick={() => handleTextTypeChange('hanumanChalisa')}
                  className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                    selectedTextType === 'hanumanChalisa'
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                  }`}
                >
                  हनुमान चालीसा
                </button>
                <button
                  onClick={() => handleTextTypeChange('sunderkand')}
                  className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                    selectedTextType === 'sunderkand'
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                  }`}
                >
                  सुन्दरकाण्ड
                </button>
                <button
                  onClick={() => handleTextTypeChange('bajrangBaan')}
                  className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                    selectedTextType === 'bajrangBaan'
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                  }`}
                >
                  बजरंग बाण
                </button>
                <button
                  onClick={() => handleTextTypeChange('yakshaPrashna')}
                  className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                    selectedTextType === 'yakshaPrashna'
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                  }`}
                >
                  यक्ष प्रश्न
                </button>
              </div>
            </div>
          )}

          {/* Title and Search */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-orange-900 font-sanskrit drop-shadow-lg mb-2">
              {currentTextConfig.title}
            </h1>
            <p className="text-xl md:text-2xl text-orange-700 mt-2 drop-shadow-md">
              {currentTextConfig.subtitle}
            </p>
          </div>

          {/* Search Bar - only show on home page */}
          {!selectedChapter && (
            <div className="mb-8">
              <SearchBar 
                chapters={currentChapters} 
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
          <ChapterList chapters={currentChapters} onSelectChapter={handleSelectChapter} />
        )}
      </main>
      <footer className="text-center py-6 text-orange-700/60 text-sm relative z-10">
        <p>{currentTextConfig.footer}</p>
      </footer>
      
      {/* Gita Chatbot - only show when Gita is selected */}
      {selectedTextType === 'gita' && (
        <GitaChatbot onSelectVerse={handleSelectVerse} />
      )}
    </div>
  );
};

export default App;
