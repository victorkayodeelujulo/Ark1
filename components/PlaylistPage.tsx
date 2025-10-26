import React from 'react';
import { Product, Playlist } from '../types';
import ProductCard from './ProductCard';
import { ChevronLeftIcon } from './IconComponents';

interface PlaylistPageProps {
  playlist: Playlist;
  products: Product[];
  wishlist: string[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onBack: () => void;
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ playlist, products, wishlist, onProductSelect, onAddToCart, onAddToWishlist, onRemoveFromWishlist, onBack }) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <div>
            <h1 className="text-4xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark capitalize">{playlist.title}</h1>
            <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark mt-1">{playlist.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map(product => (
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
  );
};

export default PlaylistPage;