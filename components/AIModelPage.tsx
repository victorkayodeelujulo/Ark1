import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product } from '../types';
import { ChevronLeftIcon, BodyIcon, SparkleIcon, AIStudioIcon } from './IconComponents';
import { GoogleGenAI, Modality } from '@google/genai';

// --- Props Interface ---
interface AIModelPageProps {
  products: Product[];
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

// --- Data Constants ---
const bodyTypes = ['Hourglass', 'Pear', 'Apple', 'Athletic'];
const skinTones = {
    '#F2D0B1': 'a light skin tone',
    '#C68642': 'a tan skin tone',
    '#8D5524': 'a medium brown skin tone',
    '#3E2412': 'a dark brown skin tone',
};
const skinToneHexes = Object.keys(skinTones);

const loadingMessages = [
    "Warming up the AI studio...",
    "Designing your personalized model...",
    "Generating a high-resolution image...",
    "Adding the final touches..."
];

// --- Helper Functions ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


// --- Sub-components ---
const LoadingState: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-arkaenia-accent dark:border-arkaenia-accent-dark mb-6"></div>
        <p className="text-lg font-semibold text-arkaenia-subtext dark:text-arkaenia-subtext-dark">{message}</p>
    </div>
);

const InitialState: React.FC = () => (
     <div className="text-center p-8">
        <BodyIcon className="w-24 h-24 text-arkaenia-subtext/50 dark:text-arkaenia-subtext-dark/50 mb-4 animate-pulseSlow" />
        <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Your Model Awaits</h2>
        <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark mt-2">
            Customize your model on the left and click 'Generate' to see how the outfit looks.
        </p>
    </div>
);

// --- Main Component ---
const AIModelPage: React.FC<AIModelPageProps> = ({ products, onBack, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(products[0]?.id || null);
  const [selectedBodyType, setSelectedBodyType] = useState('Hourglass');
  const [selectedSkinTone, setSelectedSkinTone] = useState(skinToneHexes[0]);

  const loadingIntervalRef = useRef<number | null>(null);
  
  const selectedProduct = useMemo(() => products.find(p => p.id === selectedProductId), [selectedProductId, products]);

  useEffect(() => {
    if (isLoading) {
        loadingIntervalRef.current = window.setInterval(() => {
            setLoadingMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2500);
    } else {
        if (loadingIntervalRef.current) {
            clearInterval(loadingIntervalRef.current);
            loadingIntervalRef.current = null;
        }
    }
    return () => {
        if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
    };
  }, [isLoading]);

  const handleGenerateModel = async () => {
      if (!selectedProduct) return;

      setIsLoading(true);
      setGeneratedImageUrl(null);
      setError(null);
      setLoadingMessage(loadingMessages[0]);
      
      const MAX_RETRIES = 5;
      let lastError: any = null;

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
          const skinToneDescription = skinTones[selectedSkinTone as keyof typeof skinTones];

          const prompt = `A realistic, full-body, front-facing fashion photo of a model.
          - Body Type: ${selectedBodyType}.
          - Skin Tone: ${skinToneDescription}.
          - Outfit: The model is wearing a single clothing item: a ${selectedProduct.name} by ${selectedProduct.brand}.
          - Setting: Clean, minimalist studio with neutral lighting.`;
          
          const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents: {
                  parts: [{ text: prompt }],
              },
              config: {
                  responseModalities: [Modality.IMAGE],
              },
          });

          for (const part of response.candidates?.[0]?.content?.parts || []) {
              if (part.inlineData) {
                  const base64ImageBytes: string = part.inlineData.data;
                  const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                  setGeneratedImageUrl(imageUrl);
                  setIsLoading(false); // Success
                  return; // Exit successfully
              }
          }
          throw new Error("Image generation succeeded but no image data was returned.");

        } catch (err: any) {
          lastError = err;
          console.error(`Error generating AI model image (attempt ${attempt + 1}):`, err.message);

          let isRateLimitError = false;
          let retryDelayMs = 2000 * Math.pow(2, attempt) + Math.random() * 1000; // Exponential backoff as a fallback

          // Gemini API errors often have a message property that is a JSON string.
          if (typeof err.message === 'string') {
              try {
                  const errorJson = JSON.parse(err.message);
                  if (errorJson?.error?.status === 'RESOURCE_EXHAUSTED') {
                      isRateLimitError = true;
                      const retryInfo = errorJson.error.details?.find(
                          (d: any) => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo'
                      );
                      if (retryInfo?.retryDelay) {
                          const seconds = parseInt(retryInfo.retryDelay.replace('s', ''), 10);
                          if (!isNaN(seconds)) {
                              retryDelayMs = seconds * 1000 + Math.random() * 500; // Use suggested delay + jitter
                          }
                      }
                  }
              } catch (e) {
                  // Not a JSON error message, proceed with default backoff.
              }
          }

          if (isRateLimitError && attempt < MAX_RETRIES - 1) {
              const retrySeconds = Math.ceil(retryDelayMs / 1000);
              setLoadingMessage(`AI is busy. Retrying in ${retrySeconds}s... (Attempt ${attempt + 2}/${MAX_RETRIES})`);
              await sleep(retryDelayMs);
              // Continue to the next iteration of the loop
          } else {
              // Not a rate limit error, or it's the last attempt, so fail.
              break;
          }
        }
      }
      
      // If the loop finishes without returning, it means all retries failed.
      console.error("Final error after all retries:", lastError);
      setError("Failed to generate the model after multiple attempts. The AI might be busy. Please try again later.");
      setIsLoading(false);
  };


  const handleAddToCartClick = () => {
    if (selectedProduct) {
        onAddToCart(selectedProduct);
    }
  };

  return (
    <div className="animate-fadeIn h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6 flex-shrink-0">
        <button onClick={onBack} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">AI Model</h1>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
        <div className="lg:col-span-1 bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg p-6 flex flex-col space-y-6 overflow-y-auto">
          {/* Controls */}
          <div>
            <h2 className="text-xl font-bold text-arkaenia-text dark:text-arkaenia-text-dark mb-4">1. Select an Item</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
              {products.map(product => (
                <div key={product.id} onClick={() => setSelectedProductId(product.id)} className={`flex-shrink-0 cursor-pointer p-1 rounded-lg transition-all ${selectedProductId === product.id ? 'bg-arkaenia-primary dark:bg-arkaenia-primary-dark ring-2 ring-arkaenia-primary dark:ring-arkaenia-primary-dark' : 'hover:bg-arkaenia-card dark:hover:bg-arkaenia-card-dark'}`}>
                  <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-arkaenia-text dark:text-arkaenia-text-dark mb-4">2. Customize Model</h2>
            <div className="space-y-4">
              <label className="font-semibold text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Body Type</label>
              <div className="grid grid-cols-2 gap-3">
                {bodyTypes.map(type => (
                  <button key={type} onClick={() => setSelectedBodyType(type)} className={`py-3 font-semibold rounded-lg transition-colors text-center ${selectedBodyType === type ? 'bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark' : 'bg-arkaenia-card dark:bg-arkaenia-card-dark text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:bg-arkaenia-card/80 dark:hover:bg-arkaenia-card-dark/80'}`}>
                    {type}
                  </button>
                ))}
              </div>
              <label className="font-semibold text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Skin Tone</label>
              <div className="flex items-center gap-4">
                {skinToneHexes.map(tone => (
                  <button key={tone} onClick={() => setSelectedSkinTone(tone)} style={{ backgroundColor: tone }} className={`w-10 h-10 rounded-full transition-all ring-offset-2 ring-offset-arkaenia-surface dark:ring-offset-arkaenia-surface-dark ${selectedSkinTone === tone ? 'ring-2 ring-arkaenia-primary dark:ring-arkaenia-primary-dark' : 'hover:scale-110'}`} aria-label={`Select skin tone ${tone}`}></button>
                ))}
              </div>
            </div>
          </div>
           <div className="flex-grow"></div>
           <div>
            <h2 className="text-xl font-bold text-arkaenia-text dark:text-arkaenia-text-dark mb-4">3. Generate</h2>
             <button
                onClick={handleGenerateModel}
                disabled={isLoading || !selectedProduct}
                className="w-full flex items-center justify-center gap-3 py-3 font-bold bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark rounded-full hover:scale-105 transition-transform duration-200 disabled:bg-arkaenia-subtext dark:disabled:bg-arkaenia-subtext-dark disabled:scale-100 disabled:cursor-not-allowed"
            >
                <SparkleIcon className="w-6 h-6" />
                <span>{isLoading ? 'Generating...' : 'Generate Model'}</span>
            </button>
            {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
           </div>
        </div>
        
        <div className="lg:col-span-2 bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg p-4 flex flex-col items-center justify-center relative">
          {isLoading ? (
            <LoadingState message={loadingMessage} />
          ) : generatedImageUrl ? (
            <div className="w-full h-full relative">
              <img src={generatedImageUrl} alt="AI generated model wearing selected product" className="w-full h-full object-contain rounded-md" />
               <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg animate-fadeIn">
                 <h3 className="text-lg font-bold">{selectedProduct?.name}</h3>
                 <p className="text-sm opacity-80">{selectedProduct?.brand}</p>
                 <p className="font-bold mt-2 text-xl">₦{selectedProduct?.price.toFixed(2)}</p>
                 <button onClick={handleAddToCartClick} className="mt-4 w-full py-2 font-bold bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark rounded-lg hover:opacity-90 transition-opacity">
                    Add to Bag
                </button>
               </div>
            </div>
          ) : (
            <InitialState />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModelPage;
