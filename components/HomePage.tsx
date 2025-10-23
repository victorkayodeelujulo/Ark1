import React from 'react';
import { Playlist, Product, QuickLink, Reel } from '../types';
import { PLAYLISTS, QUICK_LINKS, STORIES, PRODUCTS } from '../constants';
import PlaylistCard from './PlaylistCard';
import ProductCard from './ProductCard';
import QuickLinkCard from './QuickLinkCard';
import * as Icons from './IconComponents';

interface HomePageProps {
  wishlist: string[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigateToCategory: (link: QuickLink) => void;
  onNavigateToPlaylist: (playlist: Playlist) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onSelectStory: (story: Reel) => void;
}

const PlaylistSection: React.FC<{ title: string; playlists: Playlist[]; onNavigateToPlaylist: (playlist: Playlist) => void; }> = ({ title, playlists, onNavigateToPlaylist }) => (
  <section className="mb-12">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-arkaenia-accent">{title}</h2>
        <a href="#" className="text-sm font-bold text-arkaenia-subtext hover:underline">See all</a>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {playlists.map(playlist => (
        <PlaylistCard key={playlist.id} playlist={playlist} onClick={onNavigateToPlaylist} />
      ))}
    </div>
  </section>
);

const StoryItem: React.FC<{ story: Reel; onSelectStory: (story: Reel) => void; }> = ({ story, onSelectStory }) => (
  <div onClick={() => onSelectStory(story)} className="flex-shrink-0 flex flex-col items-center space-y-2 w-24 cursor-pointer group">
    <div className="p-0.5 rounded-full bg-gradient-to-tr from-purple-400 via-purple-600 to-purple-800 group-hover:scale-105 transition-transform">
        <img 
          src={story.thumbnailUrl} 
          alt={story.userName} 
          className="w-20 h-20 rounded-full object-cover border-2 border-arkaenia-bg"
        />
    </div>
    <p className="text-sm text-arkaenia-subtext truncate w-full text-center">{story.userName}</p>
  </div>
);


const YourStoryItem: React.FC = () => (
    <div className="flex-shrink-0 flex flex-col items-center space-y-2 w-24 cursor-pointer group">
        <div className="w-[82px] h-[82px] flex items-center justify-center rounded-full bg-arkaenia-card group-hover:scale-105 transition-transform">
             <div className="w-20 h-20 flex items-center justify-center rounded-full bg-arkaenia-card/50 border-2 border-dashed border-arkaenia-subtext">
                <Icons.PlusIcon className="w-8 h-8 text-arkaenia-subtext"/>
             </div>
        </div>
        <p className="text-sm text-arkaenia-subtext truncate w-full text-center">Your Story</p>
  </div>
);

const StoriesSection: React.FC<{ onSelectStory: (story: Reel) => void }> = ({ onSelectStory }) => (
  <section className="mb-8 -mx-6 px-6">
    <div className="flex space-x-4 overflow-x-auto pb-4">
        <YourStoryItem />
      {STORIES.map(story => (
        <StoryItem key={story.id} story={story} onSelectStory={onSelectStory} />
      ))}
    </div>
  </section>
);


const GoodAfternoonSection: React.FC<{ onNavigateToCategory: (link: QuickLink) => void; }> = ({ onNavigateToCategory }) => (
    <section className="mb-8">
        <h2 className="text-3xl font-bold text-arkaenia-accent mb-4">Amazing outfits, from ₦3,000</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_LINKS.map(link => (
                <QuickLinkCard key={link.id} link={link} onClick={() => onNavigateToCategory(link)} />
            ))}
        </div>
    </section>
);

const DiscoverSection: React.FC<{ 
    wishlist: string[];
    onProductSelect: (product: Product) => void; 
    onAddToCart: (product: Product) => void; 
    onAddToWishlist: (productId: string) => void;
    onRemoveFromWishlist: (productId: string) => void;
}> = ({ wishlist, onProductSelect, onAddToCart, onAddToWishlist, onRemoveFromWishlist }) => (
  <section>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-arkaenia-accent">Discover!</h2>
      <a href="#" className="text-sm font-bold text-arkaenia-subtext hover:underline">See all</a>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {PRODUCTS.map(product => (
        <ProductCard 
            key={product.id} 
            product={product} 
            wishlist={wishlist}
            onProductSelect={onProductSelect} 
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
            onRemoveFromWishlist={onRemoveFromWishlist}
        />
      ))}
    </div>
  </section>
);


const HomePage: React.FC<HomePageProps> = ({ 
    wishlist,
    onProductSelect, 
    onAddToCart, 
    onNavigateToCategory, 
    onNavigateToPlaylist,
    onAddToWishlist,
    onRemoveFromWishlist,
    onSelectStory,
}) => {
  const madeForYou = PLAYLISTS.slice(0, 5);
  
  return (
    <div className="space-y-16 animate-fadeIn">
        <StoriesSection onSelectStory={onSelectStory} />
        <GoodAfternoonSection onNavigateToCategory={onNavigateToCategory} />
        <PlaylistSection title="Styles That Match Your Taste!" playlists={madeForYou} onNavigateToPlaylist={onNavigateToPlaylist} />
        <DiscoverSection 
            wishlist={wishlist}
            onProductSelect={onProductSelect} 
            onAddToCart={onAddToCart} 
            onAddToWishlist={onAddToWishlist}
            onRemoveFromWishlist={onRemoveFromWishlist}
        />
    </div>
  );
};

export default HomePage;