import React, { useState, useCallback } from 'react';
import { Product } from '../types';
import { searchWithAttachments } from '../services/geminiService';
import ProductCard from './ProductCard';
import { ChevronLeftIcon, PaperclipIcon, XCircleIcon, SearchIcon } from './IconComponents';

interface SearchWithAttachmentsPageProps {
  products: Product[];
  wishlist: string[];
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onBack: () => void;
}

const SearchWithAttachmentsPage: React.FC<SearchWithAttachmentsPageProps> = ({
  products,
  wishlist,
  onProductSelect,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onBack,
}) => {
  const [prompt, setPrompt] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Product[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setAttachments(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files) {
      handleFileChange(event.dataTransfer.files);
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const onDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleSearch = async () => {
    if (attachments.length === 0) {
      setError('Please upload at least one image to search.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);
    setResults([]);

    try {
      const resultIds = await searchWithAttachments(prompt, attachments, products);
      const foundProducts = resultIds
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p));
      setResults(foundProducts);
    } catch (err) {
      setError('An error occurred during the search. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Visual Search</h1>
      </div>

      <div className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg shadow-sm p-8 space-y-6">
        {/* Drop Zone */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          className={`relative p-8 border-2 border-dashed rounded-lg text-center transition-colors ${isDragging ? 'border-arkaenia-primary dark:border-arkaenia-primary-dark bg-arkaenia-primary/10 dark:bg-arkaenia-primary-dark/10' : 'border-arkaenia-card dark:border-arkaenia-card-dark'}`}
        >
          <PaperclipIcon className="w-12 h-12 mx-auto text-arkaenia-subtext dark:text-arkaenia-subtext-dark mb-2" />
          <p className="font-semibold text-arkaenia-text dark:text-arkaenia-text-dark">Drop an image here or click to select</p>
          <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Find similar styles from a picture.</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {attachments.map((file, index) => (
              <div key={index} className="relative group">
                <img src={URL.createObjectURL(file)} alt={`attachment ${index}`} className="w-full h-24 object-cover rounded-md" />
                <button
                  onClick={() => removeAttachment(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove attachment"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Prompt & Search Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Optional: add details (e.g., 'in black', 'more casual')"
            className="flex-1 w-full py-3 px-4 text-arkaenia-text dark:text-arkaenia-text-dark rounded-full bg-arkaenia-bg dark:bg-arkaenia-bg-dark border-2 border-arkaenia-card dark:border-arkaenia-card-dark focus:border-arkaenia-accent dark:focus:border-arkaenia-accent-dark outline-none transition-colors"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || attachments.length === 0}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 font-bold bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark rounded-full hover:scale-105 transition-transform duration-200 disabled:bg-arkaenia-subtext dark:disabled:bg-arkaenia-subtext-dark disabled:scale-100 disabled:cursor-not-allowed"
          >
            <SearchIcon className="w-5 h-5" />
            <span>{isLoading ? 'Searching...' : 'Search'}</span>
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
      
      {/* Results */}
      <div className="mt-8">
        {isLoading && (
            <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arkaenia-accent dark:border-arkaenia-accent-dark mx-auto"></div>
                <p className="mt-4 text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Analyzing your image...</p>
            </div>
        )}
        {!isLoading && searchPerformed && (
            <div>
                <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark mb-4">
                    {results.length > 0 ? `Found ${results.length} matching items:` : 'No matching items found'}
                </h2>
                {results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {results.map(product => (
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
                ) : (
                    <div className="text-center py-10 bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg">
                        <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Try a different image or broaden your search criteria.</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchWithAttachmentsPage;
