import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ChevronLeftIcon, ReleaseRadarIcon } from './IconComponents';

interface NewArrivalsPageProps {
  products: Product[];
  wishlist: string[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onBack: () => void;
}

const NewArrivalsPage: React.FC<NewArrivalsPageProps> = ({ products, wishlist, onProductSelect, onAddToCart, onAddToWishlist, onRemoveFromWishlist, onBack }) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
         <div className="flex items-center gap-3">
          <ReleaseRadarIcon className="w-10 h-10 text-arkaenia-accent dark:text-arkaenia-accent-dark" />
          <h1 className="text-4xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">New Arrivals</h1>
        </div>
      </div>
      
      <p className="text-lg text-arkaenia-subtext dark:text-arkaenia-subtext-dark mb-8 max-w-3xl">
        Just in! Be the first to discover the freshest pieces dropping in the store. This is what's hot, right now.
      </p>

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

export default NewArrivalsPage;
