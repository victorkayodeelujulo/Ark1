import React, { useState, useMemo } from 'react';
import { Product, Genre } from '../types';
import { GENRES } from '../constants';
import ProductCard from './ProductCard';
import { SearchIcon, ChevronLeftIcon } from './IconComponents';

interface SearchPageProps {
  products: Product[];
  wishlist: string[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onNavigateToGenre: (genre: Genre) => void;
  onBack: () => void;
}

const GenreCard: React.FC<{ genre: Genre; onClick: () => void; }> = ({ genre, onClick }) => (
  <button onClick={onClick} className={`relative rounded-lg overflow-hidden h-32 p-4 flex flex-col justify-end text-left w-full transition-transform hover:scale-105 ${genre.color}`}>
    <img src={genre.imageUrl} alt={genre.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
    <h3 className="relative text-white font-bold text-xl drop-shadow-md">{genre.name}</h3>
  </button>
);

const SearchPage: React.FC<SearchPageProps> = ({ products, wishlist, onProductSelect, onAddToCart, onAddToWishlist, onRemoveFromWishlist, onNavigateToGenre, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercasedTerm) ||
      product.brand.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, products]);
  
  const hasResults = searchTerm.trim() !== '' && filteredProducts.length > 0;
  const noResults = searchTerm.trim() !== '' && filteredProducts.length === 0;

  return (
    <div className="animate-fadeIn">
      {/* Search Bar Header */}
      <div className="flex items-center gap-4 mb-8">
         <button onClick={onBack} className="p-2 -ml-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <div className="relative flex-1">
          <SearchIcon className="absolute w-5 h-5 text-arkaenia-subtext dark:text-arkaenia-subtext-dark top-1/2 left-4 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for clothes, brands, and more"
            className="w-full text-lg py-3 pl-12 pr-4 text-arkaenia-text dark:text-arkaenia-text-dark rounded-lg bg-arkaenia-surface dark:bg-arkaenia-surface-dark border-2 border-transparent focus:bg-arkaenia-bg dark:focus:bg-arkaenia-bg-dark focus:border-arkaenia-accent dark:focus:border-arkaenia-accent-dark outline-none transition-colors"
            autoFocus
          />
        </div>
      </div>
      
      {/* Initial State: Browse Genres */}
      {!searchTerm.trim() && (
        <div>
          <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark mb-4">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {GENRES.map(genre => <GenreCard key={genre.id} genre={genre} onClick={() => onNavigateToGenre(genre)} />)}
          </div>
        </div>
      )}
      
      {/* Search Results */}
      {hasResults && (
        <div>
          <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark mb-4">Results for "{searchTerm}"</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map(product => (
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
        </div>
      )}
      
      {/* No Results */}
      {noResults && (
        <div className="text-center py-20">
          <SearchIcon className="w-24 h-24 mx-auto text-arkaenia-subtext dark:text-arkaenia-subtext-dark mb-4" />
          <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">No results found for "{searchTerm}"</h2>
          <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark mt-2">Please try a different search term.</p>
        </div>
      )}

    </div>
  );
};

export default SearchPage;