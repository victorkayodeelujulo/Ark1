import React from 'react';
import { Reel } from '../types';
import { CloseIcon } from './IconComponents';

interface StoryModalProps {
  story: Reel;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-black rounded-lg shadow-2xl w-full max-w-sm h-[90vh] animate-scaleIn flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-3">
            <img src={story.thumbnailUrl} alt={story.userName} className="w-10 h-10 rounded-full object-cover" />
            <span className="text-white font-bold">{story.userName}</span>
          </div>
        </div>
        
        <img src={story.fullImageUrl} alt={`Story by ${story.userName}`} className="w-full h-full object-cover" />

        <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10">
          <CloseIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default StoryModal;