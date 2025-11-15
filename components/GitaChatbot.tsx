import React, { useState, useRef, useEffect } from 'react';
import { Chapter, Verse } from '../types';
import { gitaChapters } from '../data/gita';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  verses?: Verse[];
}

interface GitaChatbotProps {
  onSelectVerse?: (chapter: Chapter, verseNumber: number) => void;
}

// Keyword mapping for common life questions
const keywordMapping: Record<string, string[]> = {
  'stress': ['stress', 'anxiety', 'worry', 'fear', 'trouble', 'difficulty', 'sorrow', 'grief'],
  'duty': ['duty', 'dharma', 'responsibility', 'obligation', 'work', 'action', 'karma'],
  'happiness': ['happiness', 'joy', 'peace', 'bliss', 'contentment', 'satisfaction', 'sukha'],
  'suffering': ['suffering', 'pain', 'sorrow', 'grief', 'distress', 'misery', 'duhkha'],
  'death': ['death', 'mortal', 'immortal', 'soul', 'atman', 'eternal', 'perish'],
  'attachment': ['attachment', 'desire', 'greed', 'lust', 'craving', 'possess', 'detachment'],
  'karma': ['karma', 'action', 'deed', 'work', 'duty', 'fruit', 'result', 'consequence'],
  'meditation': ['meditation', 'yoga', 'dhyana', 'contemplation', 'mind', 'concentration'],
  'self': ['self', 'soul', 'atman', 'consciousness', 'spirit', 'inner', 'true nature'],
  'god': ['god', 'krishna', 'lord', 'divine', 'supreme', 'brahman', 'absolute'],
  'wisdom': ['wisdom', 'knowledge', 'understanding', 'realization', 'enlightenment', 'jnana'],
  'devotion': ['devotion', 'bhakti', 'worship', 'prayer', 'faith', 'love', 'surrender'],
  'ego': ['ego', 'pride', 'arrogance', 'selfish', 'selfless', 'humility', 'modesty'],
  'anger': ['anger', 'wrath', 'rage', 'fury', 'calm', 'patience', 'forgiveness'],
  'fear': ['fear', 'afraid', 'coward', 'courage', 'brave', 'fearless', 'anxiety']
};

// Simple keyword-based search with relevance scoring
const searchRelevantVerses = (query: string, chapters: Chapter[]): { verse: Verse; chapter: Chapter; score: number }[] => {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
  
  // Expand query with related keywords
  const expandedKeywords = new Set<string>(queryWords);
  queryWords.forEach(word => {
    Object.entries(keywordMapping).forEach(([key, synonyms]) => {
      if (synonyms.some(syn => word.includes(syn) || syn.includes(word))) {
        synonyms.forEach(syn => expandedKeywords.add(syn));
      }
    });
  });
  
  const results: { verse: Verse; chapter: Chapter; score: number }[] = [];
  
  chapters.forEach(chapter => {
    chapter.verses.forEach(verse => {
      let score = 0;
      const searchText = `${verse.meaning} ${verse.hindi_meaning || ''} ${chapter.name_meaning} ${chapter.summary || ''}`.toLowerCase();
      
      // Exact phrase match (highest priority)
      if (searchText.includes(queryLower)) {
        score += 20;
      }
      
      // Expanded keyword matches
      expandedKeywords.forEach(keyword => {
        const wordCount = (searchText.match(new RegExp(keyword, 'g')) || []).length;
        score += wordCount * 3;
      });
      
      // Original word matches
      queryWords.forEach(word => {
        const wordCount = (searchText.match(new RegExp(word, 'g')) || []).length;
        score += wordCount * 2;
      });
      
      // Boost score for meaning field matches
      if (verse.meaning.toLowerCase().includes(queryLower)) {
        score += 8;
      }
      
      if (verse.hindi_meaning && verse.hindi_meaning.toLowerCase().includes(queryLower)) {
        score += 8;
      }
      
      // Boost for chapter summary relevance
      if (chapter.summary && chapter.summary.toLowerCase().includes(queryLower)) {
        score += 5;
      }
      
      if (score > 0) {
        results.push({ verse, chapter, score });
      }
    });
  });
  
  // Sort by score and return top 5
  return results.sort((a, b) => b.score - a.score).slice(0, 5);
};

// Generate response based on relevant verses
const generateResponse = (query: string, relevantVerses: { verse: Verse; chapter: Chapter; score: number }[]): string => {
  if (relevantVerses.length === 0) {
    return "I couldn't find a specific verse that directly addresses your question. The Bhagavad Gita teaches us about dharma (duty), karma (action), and the path to self-realization. Perhaps you could rephrase your question or explore the chapters to find wisdom that resonates with you.";
  }
  
  let response = "Based on the teachings of the Bhagavad Gita, here are some relevant verses that may help answer your question:\n\n";
  
  relevantVerses.forEach((item, index) => {
    response += `${index + 1}. Chapter ${item.chapter.chapter_number}: ${item.chapter.name_meaning}\n`;
    response += `   Verse ${item.verse.verse_number}: ${item.verse.meaning}\n\n`;
  });
  
  response += "These teachings from Lord Krishna guide us on the path of righteousness and self-realization. Click on any verse above to read it in detail.";
  
  return response;
};

const GitaChatbot: React.FC<GitaChatbotProps> = ({ onSelectVerse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! 🙏 I am here to help you find wisdom from the Bhagavad Gita. Ask me any question about life, duty, karma, dharma, or spirituality, and I will guide you to relevant verses.',
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate thinking time and search
    setTimeout(() => {
      const relevantVerses = searchRelevantVerses(inputValue.trim(), gitaChapters);
      const responseText = generateResponse(inputValue.trim(), relevantVerses);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        verses: relevantVerses.map(item => item.verse)
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVerseClick = (verse: Verse) => {
    const chapter = gitaChapters.find(c => c.chapter_number === verse.chapter_number);
    if (chapter && onSelectVerse) {
      onSelectVerse(chapter, verse.verse_number);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open Chatbot"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white/95 backdrop-blur-sm border border-orange-200 rounded-xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-orange-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Gita Guide</h3>
              <p className="text-sm text-orange-100">Ask me about life's questions</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-orange-200 transition-colors"
              aria-label="Close Chat"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-900 border border-orange-200'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                  
                  {/* Show verse links if available */}
                  {!message.isUser && message.verses && message.verses.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-orange-200">
                      <p className="text-xs font-semibold mb-2 text-orange-700">Relevant Verses:</p>
                      {message.verses.map((verse, idx) => {
                        const chapter = gitaChapters.find(c => c.chapter_number === verse.chapter_number);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleVerseClick(verse)}
                            className="block w-full text-left text-xs bg-white/50 hover:bg-white/80 rounded px-2 py-1 mb-1 transition-colors text-orange-800"
                          >
                            Chapter {verse.chapter_number}, Verse {verse.verse_number}
                            {chapter && ` - ${chapter.name_meaning}`}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-orange-50 text-orange-900 border border-orange-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-orange-200 p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your question..."
                className="flex-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Try: "How to deal with stress?" or "What is my duty?"
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default GitaChatbot;

