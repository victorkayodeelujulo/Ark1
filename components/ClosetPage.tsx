import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ChevronLeftIcon, ClosetIcon } from './IconComponents';

interface ClosetPageProps {
  products: Product[];
  wishlist: string[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onBack: () => void;
}

const ClosetPage: React.FC<ClosetPageProps> = ({ products, wishlist, onProductSelect, onAddToCart, onAddToWishlist, onRemoveFromWishlist, onBack }) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">My Closet</h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg">
            <ClosetIcon className="w-24 h-24 mx-auto text-arkaenia-subtext dark:text-arkaenia-subtext-dark mb-4" />
            <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Your Closet is Empty</h2>
            <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark mt-2">Items you purchase will appear here.</p>
            <button onClick={onBack} className="mt-6 px-6 py-3 font-bold text-white dark:text-arkaenia-bg-dark transition-transform duration-200 bg-arkaenia-primary dark:bg-arkaenia-primary-dark rounded-full hover:scale-105">
                Start Shopping
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

export default ClosetPage;