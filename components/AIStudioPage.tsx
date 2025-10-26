import React, { useState, useMemo, useEffect } from 'react';
import { Product, AIOutfit } from '../types';
import { generateAIOutfit } from '../services/geminiService';
import ProductCard from './ProductCard';
import { ChevronLeftIcon, AIStudioIcon } from './IconComponents';

interface AIStudioPageProps {
  closetProducts: Product[];
  wishlistProducts: Product[];
  wishlist: string[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onBack: () => void;
}

const VibeSuggestion: React.FC<{ vibe: string; onClick: (vibe: string) => void }> = ({ vibe, onClick }) => (
    <button
        onClick={() => onClick(vibe)}
        className="px-4 py-2 text-sm border border-arkaenia-card dark:border-arkaenia-card-dark rounded-full text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:bg-arkaenia-card dark:hover:bg-arkaenia-card-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors"
    >
        {vibe}
    </button>
);

const LoadingStudio: React.FC<{ products: Product[] }> = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (products.length === 0) return;
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % products.length);
        }, 150);
        return () => clearInterval(intervalId);
    }, [products]);

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-arkaenia-accent dark:border-arkaenia-accent-dark"></div>
                <p className="mt-4 text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Checking your collection...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {products.map((product, index) => (
                     <img
                        key={product.id}
                        src={product.imageUrl}
                        alt="Loading product"
                        className={`absolute w-full h-full object-cover rounded-lg transition-opacity duration-300 ease-in-out ${index === currentIndex ? 'opacity-50' : 'opacity-0'}`}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-arkaenia-surface dark:from-arkaenia-surface-dark to-transparent"></div>
                <AIStudioIcon className="relative w-24 h-24 text-arkaenia-primary dark:text-arkaenia-primary-dark drop-shadow-lg" />
            </div>
            <p className="mt-4 text-lg font-semibold text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Scanning your closet for the perfect vibe...</p>
            <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">This might take a moment.</p>
        </div>
    );
};


const AIStudioPage: React.FC<AIStudioPageProps> = ({
  closetProducts,
  wishlistProducts,
  wishlist,
  onProductSelect,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onBack,
}) => {
  const [vibe, setVibe] = useState('');
  const [generatedOutfit, setGeneratedOutfit] = useState<AIOutfit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableProducts = useMemo(() => {
    const allProducts = [...closetProducts, ...wishlistProducts];
    return [...new Map(allProducts.map(item => [item.id, item])).values()];
  }, [closetProducts, wishlistProducts]);
  
  const outfitProducts = useMemo(() => {
    if (!generatedOutfit) return [];
    return generatedOutfit.productIds
      .map(id => availableProducts.find(p => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [generatedOutfit, availableProducts]);

  const handleGenerateOutfit = async (currentVibe: string) => {
    if (!currentVibe.trim() || availableProducts.length === 0) return;

    setIsLoading(true);
    setError(null);
    setGeneratedOutfit(null);

    try {
      const result = await generateAIOutfit(currentVibe, availableProducts);
      if (!result.productIds || result.productIds.length === 0) {
          setError("I couldn't find a matching outfit in your collection. Try a different vibe or add more items to your closet and wishlist!");
      } else {
        setGeneratedOutfit(result);
      }
    } catch (err) {
      setError("Sorry, my circuits are a bit fuzzy. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleGenerateOutfit(vibe);
  }
  
  const handleVibeSuggestionClick = (suggestedVibe: string) => {
      setVibe(suggestedVibe);
      handleGenerateOutfit(suggestedVibe);
  }

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">AI Dress Up Studio</h1>
      </div>
      
      <div className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg shadow-sm p-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark mb-4">
            Welcome to your personal styling studio! Describe an occasion, a mood, or a vibe below.
            I'll assemble an outfit for you using items from your Closet and Bookmarks.
          </p>

          <form onSubmit={handleFormSubmit} className="flex items-center gap-2 sm:gap-4 mx-auto mb-4">
            <input
              type="text"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              placeholder="e.g., 'a casual brunch with friends'"
              className="flex-1 text-base py-3 px-6 text-arkaenia-text dark:text-arkaenia-text-dark rounded-full bg-arkaenia-bg dark:bg-arkaenia-bg-dark border-2 border-arkaenia-card dark:border-arkaenia-card-dark focus:border-arkaenia-accent dark:focus:border-arkaenia-accent-dark outline-none transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !vibe.trim()}
              className="px-6 sm:px-8 py-3 font-bold bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark rounded-full hover:scale-105 transition-transform duration-200 disabled:bg-arkaenia-subtext dark:disabled:bg-arkaenia-subtext-dark disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? '...' : 'Generate'}
            </button>
          </form>
          <div className="flex justify-center gap-2 flex-wrap">
              <VibeSuggestion vibe="Coffee run" onClick={handleVibeSuggestionClick} />
              <VibeSuggestion vibe="Date night" onClick={handleVibeSuggestionClick} />
              <VibeSuggestion vibe="Work meeting" onClick={handleVibeSuggestionClick} />
          </div>
        </div>

        <div className="mt-12">
          {isLoading && <LoadingStudio products={availableProducts} />}

          {error && (
            <div className="text-center py-20 bg-red-500/10 rounded-lg">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}
          
          {!isLoading && !error && generatedOutfit && (
            <div>
                <div className="bg-arkaenia-bg dark:bg-arkaenia-bg-dark p-6 rounded-lg mb-8 border border-arkaenia-card dark:border-arkaenia-card-dark animate-flyIn" style={{opacity: 0}}>
                    <h2 className="text-xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark mb-2">Stylist's Advice:</h2>
                    <p className="text-arkaenia-text dark:text-arkaenia-text-dark italic">"{generatedOutfit.advice}"</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {outfitProducts.map((product, index) => (
                      <div className="animate-flyIn" style={{ animationDelay: `${100 + index * 100}ms`, opacity: 0 }} key={product.id}>
                        <ProductCard
                          product={product}
                          wishlist={wishlist}
                          onProductSelect={onProductSelect}
                          onAddToCart={onAddToCart}
                          onAddToWishlist={onAddToWishlist}
                          onRemoveFromWishlist={onRemoveFromWishlist}
                        />
                      </div>
                    ))}
                </div>
            </div>
          )}

          {!isLoading && !error && !generatedOutfit && (
             <div className="text-center py-20 border-2 border-dashed border-arkaenia-card dark:border-arkaenia-card-dark rounded-lg">
                <AIStudioIcon className="w-24 h-24 mx-auto text-arkaenia-subtext/50 dark:text-arkaenia-subtext-dark/50 mb-4 animate-pulseSlow" />
                <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Your Outfit Awaits</h2>
                <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark mt-2">Describe a vibe above to get started!</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIStudioPage;