import React, { useState, useRef, useEffect } from 'react';
import { Chapter } from '../types';

interface SearchBarProps {
  chapters: Chapter[];
  onSelectChapter: (chapter: Chapter) => void;
  onSelectVerse?: (chapter: Chapter, verseNumber: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ chapters, onSelectChapter, onSelectVerse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Array<{ chapter: Chapter; verse?: { number: number; text: string } }>>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const searchResults: Array<{ chapter: Chapter; verse?: { number: number; text: string } }> = [];

      chapters.forEach(chapter => {
        // Search in chapter name and summary
        const nameMatch = chapter.name.toLowerCase().includes(query) ||
                         chapter.name_meaning.toLowerCase().includes(query) ||
                         chapter.summary.toLowerCase().includes(query);

        if (nameMatch) {
          searchResults.push({ chapter });
        }

        // Search in verses
        chapter.verses.forEach(verse => {
          if (verse.text.toLowerCase().includes(query) ||
              verse.transliteration.toLowerCase().includes(query) ||
              (verse.hindi_meaning && verse.hindi_meaning.toLowerCase().includes(query)) ||
              verse.meaning.toLowerCase().includes(query)) {
            const existing = searchResults.find(r => r.chapter.id === chapter.id);
            if (!existing) {
              searchResults.push({
                chapter,
                verse: { number: verse.verse_number, text: verse.text.substring(0, 50) + '...' }
              });
            }
          }
        });
      });

      setResults(searchResults.slice(0, 10));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery, chapters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (chapter: Chapter, verseNumber?: number) => {
    onSelectChapter(chapter);
    setSearchQuery('');
    setIsOpen(false);
    if (verseNumber && onSelectVerse) {
      setTimeout(() => onSelectVerse(chapter, verseNumber), 100);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setIsOpen(true)}
          placeholder="Search chapters or verses..."
          className="w-full px-4 py-2 pl-10 pr-4 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-500"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-orange-200 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={`${result.chapter.id}-${index}`}
              onClick={() => handleSelect(result.chapter, result.verse?.number)}
              className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors border-b border-orange-100 last:border-0"
            >
              <div className="flex items-start">
                <span className="bg-orange-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                  {result.chapter.chapter_number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-orange-900 font-sanskrit text-sm">
                    {result.chapter.name}
                  </p>
                  {result.verse && (
                    <p className="text-xs text-gray-600 mt-1 font-sanskrit">
                      Verse {result.verse.number}: {result.verse.text}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {result.chapter.name_meaning}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

