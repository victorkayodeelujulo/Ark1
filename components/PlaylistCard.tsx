import React from 'react';
import { Playlist, Product } from '../types';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: (playlist: Playlist) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onClick }) => {
  const handleCardClick = () => {
    onClick(playlist);
  };

  return (
    <div 
      className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark p-4 rounded-lg cursor-pointer group hover:bg-arkaenia-card dark:hover:bg-arkaenia-card-dark transition-all duration-300"
      onClick={handleCardClick}
    >
      <div className="relative mb-4">
        <img src={playlist.coverUrl} alt={playlist.title} className="w-full h-auto aspect-square rounded-md shadow-lg" />
      </div>
      <h3 className="font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark truncate">{playlist.title}</h3>
      <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark truncate">{playlist.description}</p>
    </div>
  );
};

export default PlaylistCard;