import React, { useState } from 'react';
import { Chapter, Verse } from '../types';

interface ShareButtonProps {
  chapter: Chapter;
  verse: Verse;
}

const ShareButton: React.FC<ShareButtonProps> = ({ chapter, verse }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `${chapter.name} - Verse ${verse.verse_number}\n\n${verse.text}\n\n${verse.transliteration}\n${verse.hindi_meaning ? `\n${verse.hindi_meaning}\n` : ''}${verse.meaning}\n\n— Bhagavad Gita`;

  const handleShare = async () => {
    const shareData = {
      title: `${chapter.name} - Verse ${verse.verse_number}`,
      text: shareText,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to copy
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // Fallback to copy if share fails
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to share:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-orange-200 hover:bg-orange-50 transition-colors"
      aria-label="Share verse"
      title="Share this verse"
    >
      {copied ? (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )}
    </button>
  );
};

export default ShareButton;

