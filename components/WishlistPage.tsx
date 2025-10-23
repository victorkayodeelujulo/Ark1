import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ChevronLeftIcon, HeartIcon } from './IconComponents';

interface WishlistPageProps {
  products: Product[];
  wishlist: string[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onBack: () => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ products, wishlist, onProductSelect, onAddToCart, onAddToWishlist, onRemoveFromWishlist, onBack }) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 text-arkaenia-subtext hover:text-arkaenia-accent transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-bold text-arkaenia-accent">My Wishlist</h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-arkaenia-surface rounded-lg">
            <HeartIcon className="w-24 h-24 mx-auto text-arkaenia-subtext mb-4" isFilled={false} />
            <h2 className="text-2xl font-bold text-arkaenia-accent">Your wishlist is empty</h2>
            <p className="text-arkaenia-subtext mt-2">Click the heart on any item to save it for later.</p>
            <button onClick={onBack} className="mt-6 px-6 py-3 font-bold text-white transition-transform duration-200 bg-arkaenia-primary rounded-full hover:scale-105">
                Discover Items
            </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default WishlistPage;