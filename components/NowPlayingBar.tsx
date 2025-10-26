import React from 'react';
import { Product } from '../types';
import { HeartIcon, ShareIcon, PlusIcon } from './IconComponents';

interface NowPlayingBarProps {
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

const NowPlayingBar: React.FC<NowPlayingBarProps> = ({ product, onAddToCart }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  if (!product) {
    return (
      <footer className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark border-t border-arkaenia-card dark:border-arkaenia-card-dark h-[90px] flex items-center justify-center px-4">
        <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Select an item to see details</p>
      </footer>
    );
  }

  const handleAddToCartClick = () => {
    onAddToCart(product);
  };

  return (
    <footer className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark border-t border-arkaenia-card dark:border-arkaenia-card-dark h-[90px] flex items-center justify-between px-6 animate-slideInUp">
      <div className="flex items-center gap-4">
        <img src={product.imageUrl} alt={product.name} className="w-14 h-14 rounded-md object-cover" />
        <div>
          <h4 className="font-bold text-arkaenia-text dark:text-arkaenia-text-dark">{product.name}</h4>
          {(product.color || product.size) && (
             <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">
                {product.color && `Color: ${product.color}`}
                {product.color && product.size && ' | '}
                {product.size && `Size: ${product.size}`}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-arkaenia-subtext dark:text-arkaenia-subtext-dark">
            <button onClick={() => setIsLiked(!isLiked)} className="hover:text-arkaenia-text dark:hover:text-arkaenia-text-dark transition-colors" aria-label="Like item">
                <HeartIcon className="w-5 h-5" isFilled={isLiked} />
            </button>
            <button className="hover:text-arkaenia-text dark:hover:text-arkaenia-text-dark transition-colors" aria-label="Add to playlist">
                <PlusIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-arkaenia-text dark:hover:text-arkaenia-text-dark transition-colors" aria-label="Share item">
                <ShareIcon className="w-5 h-5" />
            </button>
        </div>
        <button 
          onClick={handleAddToCartClick}
          className="px-6 py-3 font-bold text-white dark:text-arkaenia-bg-dark transition-transform duration-200 bg-arkaenia-teal dark:bg-arkaenia-primary-dark rounded-full hover:scale-105"
        >
            <span>Add to Bag - ₦{product.price.toFixed(2)}</span>
        </button>
      </div>
    </footer>
  );
};

export default NowPlayingBar;