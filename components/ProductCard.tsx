import React from 'react';
import { Product } from '../types';
import * as Icons from './IconComponents';

interface ProductCardProps {
    product: Product;
    wishlist: string[];
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product) => void;
    onAddToWishlist: (productId: string) => void;
    onRemoveFromWishlist: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, wishlist, onProductSelect, onAddToCart, onAddToWishlist, onRemoveFromWishlist }) => {
  const isWishlisted = wishlist.includes(product.id);
  
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event from firing
    onAddToCart(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      onRemoveFromWishlist(product.id);
    } else {
      onAddToWishlist(product.id);
    }
  };

  return (
    <div className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg group relative cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-arkaenia-accent/20 dark:hover:shadow-arkaenia-accent-dark/20" onClick={() => onProductSelect(product)}>
      <img src={product.imageUrl} alt={product.name} className="w-full h-auto aspect-square object-cover" />

      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={handleWishlistClick} className="bg-arkaenia-card dark:bg-arkaenia-card-dark text-arkaenia-accent dark:text-arkaenia-accent-dark rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform" aria-label="Add to Wishlist">
          <Icons.HeartIcon className="w-5 h-5" isFilled={isWishlisted} />
        </button>
        <button onClick={handleAddToCartClick} className="bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform" aria-label="Add to Bag">
          <Icons.ShoppingBagIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark truncate">{product.brand}</p>
        <h4 className="font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark truncate">{product.name}</h4>
        <p className="font-bold text-arkaenia-text dark:text-arkaenia-text-dark mt-1">₦{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;