import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, BellIcon, SearchIcon, ShoppingBagIcon } from './IconComponents';
import { generateVibeDescription } from '../services/geminiService';
import { User } from '../types';

interface HeaderProps {
    cartCount: number;
    isLoggedIn: boolean;
    user: User;
    onLogin: () => void;
    onLogout: () => void;
    onNavigateHome: () => void;
    onNavigateToCheckout: () => void;
    onNavigateToProfile: () => void;
}

const VibeModal: React.FC<{ vibe: string; content: string; isLoading: boolean; onClose: () => void }> = ({ vibe, content, isLoading, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
        <div className="bg-arkaenia-surface rounded-lg shadow-2xl p-8 max-w-2xl w-full mx-4 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-2 text-arkaenia-accent">Your Vibe: <span className="text-arkaenia-text font-semibold">{vibe}</span></h2>
            <div className="h-px bg-arkaenia-card my-4"></div>
            {isLoading ? (
                <div className="flex items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-arkaenia-accent"></div>
                </div>
            ) : (
                <div className="text-arkaenia-text space-y-4 max-h-[60vh] overflow-y-auto" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}>
                </div>
            )}
            <button onClick={onClose} className="mt-6 w-full py-2 font-bold bg-arkaenia-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                Close
            </button>
        </div>
    </div>
);


const Header: React.FC<HeaderProps> = ({ cartCount, isLoggedIn, user, onLogin, onLogout, onNavigateHome, onNavigateToCheckout, onNavigateToProfile }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vibeQuery, setVibeQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [vibeResult, setVibeResult] = useState('');

    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!vibeQuery.trim()) return;

        setIsModalOpen(true);
        setIsLoading(true);
        setVibeResult('');

        try {
            const result = await generateVibeDescription(vibeQuery);
            setVibeResult(result);
        } catch (error) {
            setVibeResult('Sorry, my circuits are a bit fuzzy right now. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setVibeQuery('');
    };

  return (
    <>
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-arkaenia-bg/80 backdrop-blur-md">
      {/* Navigation */}
      <div className="flex items-center gap-2">
        <button onClick={onNavigateHome} className="p-2 rounded-full bg-black/30 text-arkaenia-subtext hover:text-arkaenia-accent">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-full bg-black/30 text-arkaenia-subtext hover:text-arkaenia-accent">
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-lg ml-8">
        <form onSubmit={handleSearchSubmit}>
            <div className="relative">
            <SearchIcon className="absolute w-5 h-5 text-arkaenia-subtext top-1/2 left-4 -translate-y-1/2" />
            <input
                type="text"
                value={vibeQuery}
                onChange={(e) => setVibeQuery(e.target.value)}
                placeholder="Search for a vibe..."
                className="w-full py-2 pl-12 pr-4 text-arkaenia-text rounded-full bg-arkaenia-surface border border-transparent focus:bg-arkaenia-card focus:border-arkaenia-accent outline-none transition-colors"
            />
            </div>
        </form>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <button onClick={onNavigateToCheckout} className="relative p-2 rounded-full bg-black/30 text-arkaenia-subtext hover:text-arkaenia-accent hover:bg-arkaenia-card transition-colors">
          <ShoppingBagIcon className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 rounded-full bg-arkaenia-primary text-white text-xs font-bold ring-2 ring-arkaenia-bg">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>
        {isLoggedIn ? (
          <button onClick={onLogout} className="px-4 h-10 flex items-center justify-center font-bold text-sm rounded-full text-arkaenia-text bg-arkaenia-surface hover:bg-arkaenia-card transition-colors">
              Log Out
          </button>
        ) : (
          <button onClick={onLogin} className="px-4 h-10 flex items-center justify-center font-bold text-sm rounded-full text-arkaenia-text bg-arkaenia-surface hover:bg-arkaenia-card transition-colors">
              Log In
          </button>
        )}
        <button className="p-2 rounded-full bg-black/30 text-arkaenia-subtext hover:text-arkaenia-accent hover:bg-arkaenia-card transition-colors">
          <BellIcon className="w-6 h-6" />
        </button>
        {isLoggedIn ? (
            <button 
                onClick={onNavigateToProfile} 
                className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-offset-arkaenia-bg ring-arkaenia-accent focus:outline-none focus:ring-4 transition-shadow"
                aria-label="View Profile"
            >
                <img 
                    src={user.avatarUrl}
                    alt="User" 
                    className="w-full h-full rounded-full object-cover"
                />
            </button>
        ) : (
            <div className="w-10 h-10 rounded-full bg-arkaenia-card flex items-center justify-center">
                <svg className="w-6 h-6 text-arkaenia-subtext" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div>
        )}
      </div>
    </header>
    {isModalOpen && (
        <VibeModal
            vibe={vibeQuery}
            content={vibeResult}
            isLoading={isLoading}
            onClose={closeModal}
        />
    )}
    </>
  );
};

export default Header;