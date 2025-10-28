import React from 'react';
import { HomeIcon, SearchIcon, BookmarkIcon, ChevronLeftIcon, GridIcon, ReleaseRadarIcon, DiscoverWeeklyIcon, ChatIcon, WrappedIcon, DownloadIcon, ClosetIcon, AIStudioIcon, PaperclipIcon } from './IconComponents';
import { ARKAENIA_LOGO } from '../constants';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isCollapsed, active, onClick }) => {
  const commonProps = {
    className: `flex items-center gap-4 py-2 rounded-md transition-colors w-full ${isCollapsed ? 'px-3 justify-center' : 'px-4'} ${active ? 'text-arkaenia-accent dark:text-arkaenia-accent-dark bg-arkaenia-card dark:bg-arkaenia-card-dark' : 'text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark'}`,
  };
  
  if (onClick) {
    return (
      <button onClick={onClick} {...commonProps}>
        {icon}
        {!isCollapsed && <span className="font-bold whitespace-nowrap">{label}</span>}
      </button>
    );
  }

  return (
    <a href="#" {...commonProps}>
      {icon}
      {!isCollapsed && <span className="font-bold whitespace-nowrap">{label}</span>}
    </a>
  );
};


const SectionTitle: React.FC<{ isCollapsed: boolean; children: React.ReactNode }> = ({ isCollapsed, children }) => {
    if (isCollapsed) return <div className="p-4"><div className="w-full h-px bg-arkaenia-card dark:bg-arkaenia-card-dark" /></div>;
    return <h2 className="px-4 pt-4 pb-2 text-sm font-bold text-arkaenia-subtext dark:text-arkaenia-subtext-dark uppercase tracking-wider">{children}</h2>;
}

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    currentView: string;
    onNavigateHome: () => void;
    onNavigateToWishlist: () => void;
    onNavigateToChat: () => void;
    onNavigateToSearch: () => void;
    onNavigateToSearchWithAttachments: () => void;
    onNavigateToWrapped: () => void;
    onNavigateToCloset: () => void;
    onNavigateToAIStudio: () => void;
    onNavigateToWhatsNew: () => void;
    onNavigateToNewArrivals: () => void;
    onNavigateToWeeklyGems: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    isCollapsed, 
    onToggle, 
    currentView, 
    onNavigateHome, 
    onNavigateToWishlist, 
    onNavigateToChat, 
    onNavigateToSearch,
    onNavigateToSearchWithAttachments, 
    onNavigateToWrapped, 
    onNavigateToCloset, 
    onNavigateToAIStudio,
    onNavigateToWhatsNew,
    onNavigateToNewArrivals,
    onNavigateToWeeklyGems,
}) => {
  return (
    <nav className={`bg-arkaenia-surface dark:bg-arkaenia-surface-dark flex-shrink-0 flex flex-col p-2 space-y-2 transition-all duration-300 ${isCollapsed ? 'w-[88px]' : 'w-64'}`}>
      <div className={`bg-arkaenia-bg dark:bg-arkaenia-bg-dark rounded-lg p-2 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
             <div className="flex items-center gap-2">
                <img src={ARKAENIA_LOGO} alt="Arkaenia Logo" className="w-6 h-6"/>
                <span className="font-bold text-lg text-arkaenia-text dark:text-arkaenia-text-dark">ARKAENIA</span>
            </div>
        )}
        <button onClick={onToggle} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          {isCollapsed ? (
            <img src={ARKAENIA_LOGO} alt="Arkaenia Logo" className="w-6 h-6"/>
          ) : (
            <ChevronLeftIcon className="w-6 h-6 transition-transform duration-300" />
          )}
        </button>
      </div>

      <div className="bg-arkaenia-bg dark:bg-arkaenia-bg-dark rounded-lg p-2 space-y-1">
        <NavItem icon={<HomeIcon className="w-6 h-6" />} label="Home" isCollapsed={isCollapsed} active={currentView === 'home'} onClick={onNavigateHome} />
        <NavItem icon={<SearchIcon className="w-6 h-6" />} label="Search" isCollapsed={isCollapsed} active={currentView === 'search'} onClick={onNavigateToSearch} />
        <NavItem 
            icon={<PaperclipIcon className="w-6 h-6" />} 
            label="Visual Search" 
            isCollapsed={isCollapsed} 
            active={currentView === 'search-with-attachments'} 
            onClick={onNavigateToSearchWithAttachments} 
        />
        <NavItem 
            icon={<BookmarkIcon className="w-6 h-6" />} 
            label="Your Bookmarks" 
            isCollapsed={isCollapsed} 
            active={currentView === 'wishlist'} 
            onClick={onNavigateToWishlist} 
        />
        <NavItem icon={<ChatIcon className="w-6 h-6" />} label="Chat" isCollapsed={isCollapsed} active={currentView === 'chat'} onClick={onNavigateToChat} />
        <NavItem 
            icon={<WrappedIcon className="w-6 h-6" />} 
            label="Arkaenia Wrapped" 
            isCollapsed={isCollapsed} 
            active={currentView === 'wrapped'} 
            onClick={onNavigateToWrapped} 
        />
        <NavItem 
            icon={<AIStudioIcon className="w-6 h-6" />} 
            label="AI Dress Up Studio" 
            isCollapsed={isCollapsed} 
            active={currentView === 'ai-studio'} 
            onClick={onNavigateToAIStudio} 
        />
      </div>

      <div className="bg-arkaenia-bg dark:bg-arkaenia-bg-dark rounded-lg flex-1 flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
            <SectionTitle isCollapsed={isCollapsed}>Made For You</SectionTitle>
            <div className="p-2 space-y-1">
                <NavItem icon={<ClosetIcon className="w-6 h-6" />} label="My Closet" isCollapsed={isCollapsed} active={currentView === 'closet'} onClick={onNavigateToCloset} />
                <NavItem icon={<GridIcon className="w-6 h-6" />} label="What's new?" isCollapsed={isCollapsed} active={currentView === 'whats-new'} onClick={onNavigateToWhatsNew} />
                <NavItem icon={<ReleaseRadarIcon className="w-6 h-6" />} label="New arrivals" isCollapsed={isCollapsed} active={currentView === 'new-arrivals'} onClick={onNavigateToNewArrivals} />
                <NavItem icon={<DiscoverWeeklyIcon className="w-6 h-6" />} label="Weekly gems" isCollapsed={isCollapsed} active={currentView === 'weekly-gems'} onClick={onNavigateToWeeklyGems} />
            </div>
            
            {!isCollapsed && (
                <div className="px-4 py-2 mt-4 overflow-y-auto space-y-2 border-t border-arkaenia-card dark:border-arkaenia-card-dark">
                  {['Beach Vacation', 'Harmattan airy', 'Wedding Guest', 'Bougee Lagos Vibes'].map(playlist => (
                    <div key={playlist} className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors cursor-pointer">
                      <p className="font-semibold text-sm whitespace-nowrap">{playlist}</p>
                    </div>
                  ))}
                </div>
            )}
        </div>
        
        {/* Bottom, non-scrolling button */}
        <div className="flex-shrink-0 p-2 border-t border-arkaenia-card dark:border-arkaenia-card-dark">
             <NavItem 
                icon={<DownloadIcon className="w-6 h-6" />} 
                label="Download App" 
                isCollapsed={isCollapsed} 
                onClick={() => alert('App download would start here!')} 
            />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;